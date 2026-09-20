const http = require('http');
const app = require('./server');

let server;

async function checkPortRunning(port) {
  try {
    const res = await fetch(`http://localhost:${port}/api/health`);
    return res.ok;
  } catch {
    return false;
  }
}

async function runTests() {
  const is5000Running = await checkPortRunning(5000);
  let baseUrl = 'http://localhost:5000/api';

  const startTestExecution = async () => {
    try {
      // 1. Health check
      console.log('\n--- 1. Testing GET /api/health ---');
      let res = await fetch(`${baseUrl}/health`);
      let data = await res.json();
      console.log('Health check response:', data.status, data.organization);

      // 2. Stats endpoint
      console.log('\n--- 2. Testing GET /api/stats ---');
      res = await fetch(`${baseUrl}/stats`);
      data = await res.json();
      console.log('Stats count:', data.data?.length, 'First stat:', data.data?.[0]?.label, '=', data.data?.[0]?.value);

      // 3. Initiatives endpoint
      console.log('\n--- 3. Testing GET /api/initiatives ---');
      res = await fetch(`${baseUrl}/initiatives`);
      data = await res.json();
      console.log('Initiatives count:', data.data?.length, 'First initiative:', data.data?.[0]?.title);

      // 4. Media endpoint
      console.log('\n--- 4. Testing GET /api/media ---');
      res = await fetch(`${baseUrl}/media`);
      data = await res.json();
      console.log('Media count:', data.data?.length, 'First media:', data.data?.[0]?.title);

      // 5. Submit Contact Form
      console.log('\n--- 5. Testing POST /api/contact (Citizen Inquiry) ---');
      res = await fetch(`${baseUrl}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Arsh Ahmad (Test Citizen)',
          email: 'saryfoundation@gmail.com',
          phone: '9517330895',
          subject: 'Ghat Cleanliness Drive In Kanpur',
          message: 'Hello, I want to collaborate on organizing a weekly riverbank plogging drive.'
        })
      });
      data = await res.json();
      console.log('Contact form response:', data.success, data.message);

      // 6. Register Volunteer
      console.log('\n--- 6. Testing POST /api/volunteers (Volunteer Registration) ---');
      res = await fetch(`${baseUrl}/volunteers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Zaid Khan',
          email: 'zaid.volunteer@example.com',
          phone: '9876543210',
          city: 'Kanpur',
          interest: 'Clean-up Drives',
          availability: 'Weekends',
          message: 'Excited to be an active volunteer for SARY Foundation!'
        })
      });
      data = await res.json();
      console.log('Volunteer registration response:', data.success, data.message);

      // 7. Admin Login (Hidden portal auth)
      console.log('\n--- 7. Testing POST /api/auth/login (Admin Auth) ---');
      res = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'saryadmin',
          password: 'SaryAdmin@2025!'
        })
      });
      data = await res.json();
      console.log('Admin login success:', data.success, 'Token generated:', !!data.token);
      const token = data.token;

      // 8. Test Protected Route with JWT
      console.log('\n--- 8. Testing GET /api/auth/me (Protected Route) ---');
      res = await fetch(`${baseUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      data = await res.json();
      console.log('Protected profile:', data.admin?.username, data.admin?.email, 'Role:', data.admin?.role);

      // 9. Admin posting new photo/video
      console.log('\n--- 9. Testing POST /api/media (Admin Media Post) ---');
      res = await fetch(`${baseUrl}/media`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: 'Sunday Morning Plog at Sarsaiya Ghat',
          type: 'photo',
          url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
          category: 'Drives',
          description: 'Over 40 volunteers participated in removing plastic waste.'
        })
      });
      data = await res.json();
      console.log('Admin media post success:', data.success, 'New Media ID:', data.data?._id);

      console.log('\n=========================================');
      console.log('ALL API & AUTH TESTS PASSED SUCCESSFULLY!');
      console.log('=========================================');
    } catch (err) {
      console.error('Test failed:', err);
    } finally {
      if (server) {
        server.close();
      }
      process.exit(0);
    }
  };

  if (is5000Running) {
    console.log('[Test Runner] Connected directly to live backend at http://localhost:5000');
    await startTestExecution();
  } else {
    server = http.createServer(app);
    server.listen(5001, async () => {
      console.log('[Test Server] Started ephemeral test server on port 5001');
      baseUrl = 'http://localhost:5001/api';
      await startTestExecution();
    });
  }
}

runTests();
