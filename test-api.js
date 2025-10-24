const http = require('http');

// Simple HTTP request function
function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: '127.0.0.1',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        console.log(`\n${method} ${path}`);
        console.log(`Status: ${res.statusCode}`);
        console.log(`Response: ${body}`);
        resolve({ status: res.statusCode, body });
      });
    });

    req.on('error', (err) => {
      console.log(`\n❌ ${method} ${path}`);
      console.log(`Error: ${err.message}`);
      reject(err);
    });

    if (data) {
      req.write(data);
    }
    req.end();
  });
}

async function testEndpoints() {
  console.log('🧪 Testing API endpoints on http://127.0.0.1:5000...\n');
  
  try {
    // Test 1: Root
    await makeRequest('/');
    
    // Test 2: Test endpoint
    await makeRequest('/test');
    
    // Test 3: Register
    const registerData = JSON.stringify({
      username: 'testuser' + Date.now(),
      email: 'test' + Date.now() + '@example.com',
      password: 'password123'
    });
    await makeRequest('/api/auth/register', 'POST', registerData);
    
    console.log('\n✅ All tests completed!');
  } catch (error) {
    console.log('\n❌ Test failed:', error.message);
  }
}

testEndpoints();