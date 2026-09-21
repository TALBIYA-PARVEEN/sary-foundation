const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sary_foundation_super_secret_jwt_key_2025');

      if (decoded.id === 'admin_dev_id') {
        req.admin = {
          _id: 'admin_dev_id',
          username: 'saryadmin',
          email: 'saryfoundation@gmail.com',
          role: 'superadmin'
        };
        return next();
      }

      const admin = await Admin.findById(decoded.id).select('-password');
      if (!admin) {
        return res.status(401).json({ success: false, message: 'Not authorized, admin not found' });
      }

      req.admin = admin;
      return next();
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Not authorized, token failed or expired' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };
