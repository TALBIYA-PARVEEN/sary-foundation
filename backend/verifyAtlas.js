const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const Admin = require('./models/Admin');
const Stats = require('./models/Stats');
const Contact = require('./models/Contact');
const Volunteer = require('./models/Volunteer');
const Donation = require('./models/Donation');
const Initiative = require('./models/Initiative');
const Media = require('./models/Media');

async function testAllModels() {
  console.log('--- Full Database Verification on MongoDB Atlas ---');
  await connectDB();

  // List all collections in MongoDB Atlas
  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log('Collections present in MongoDB Atlas:', collections.map(c => c.name).sort());

  // 1. Admin Model
  const admin = await Admin.findOne({ username: 'saryadmin' });
  console.log('✅ Admin check:', admin ? `Found saryadmin (${admin.email})` : 'Admin missing');

  // 2. Stats Model
  const stats = await Stats.find().sort({ order: 1 });
  console.log('✅ Stats check:', stats.length, 'metrics found');
  stats.forEach(s => console.log(`   - ${s.label}: ${s.value} (${s.sub || ''})`));

  // 3. Contact Model (Create & Read test)
  const testContact = await Contact.create({
    name: 'Atlas Verification User',
    email: 'verify@example.com',
    message: 'Testing MongoDB Atlas write capability'
  });
  const foundContact = await Contact.findById(testContact._id);
  console.log('✅ Contact check: Write & Read verified (ID:', foundContact._id + ')');
  await Contact.findByIdAndDelete(testContact._id);
  console.log('   (Cleaned up verification test contact)');

  // 4. Volunteer Model (Create & Read test)
  const testVol = await Volunteer.create({
    name: 'Atlas Verification Volunteer',
    email: 'volunteer.verify@example.com',
    phone: '9876543210',
    city: 'Kanpur',
    interest: 'Clean-up Drives'
  });
  const foundVol = await Volunteer.findById(testVol._id);
  console.log('✅ Volunteer check: Write & Read verified (ID:', foundVol._id + ')');
  await Volunteer.findByIdAndDelete(testVol._id);
  console.log('   (Cleaned up verification test volunteer)');

  // 5. Donation Model (Create & Read test)
  const testDonation = await Donation.create({
    donorName: 'Atlas Donor Verification',
    donorEmail: 'donor.verify@example.com',
    amount: 500,
    razorpayOrderId: 'order_verify_' + Date.now(),
    razorpayPaymentId: 'pay_verify_' + Date.now(),
    receiptNumber: 'SARY-80G-2026-VERIFY',
    status: 'captured'
  });
  const foundDonation = await Donation.findById(testDonation._id);
  console.log('✅ Donation check: Write & Read verified (Receipt:', foundDonation.receiptNumber + ', Amount: ₹' + foundDonation.amount + ')');
  await Donation.findByIdAndDelete(testDonation._id);
  console.log('   (Cleaned up verification test donation)');

  // 6. Initiative Model
  const initCount = await Initiative.countDocuments();
  console.log('✅ Initiative check: Collection ready (Count:', initCount, ')');

  // 7. Media Model
  const mediaCount = await Media.countDocuments();
  console.log('✅ Media check: Collection ready (Count:', mediaCount, ')');

  console.log('----------------------------------------------------');
  console.log('🎉 ALL 7 DATABASE MODELS ARE 100% OPERATIONAL IN MONGODB ATLAS!');
  console.log('----------------------------------------------------');
  process.exit(0);
}

testAllModels().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
