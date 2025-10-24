// Simple test script using Node.js built-in modules
const http = require('http');

function testEndpoint(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (data) {
      options.headers['Content-Length'] = Buffer.byteLength(data);
    }

    const req = http.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          data: responseData,
          headers: res.headers
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(data);
    }
    
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Testing API endpoints...\n');
  
  try {
    // Test 1: Root endpoint
    console.log('Testing GET /');
    const rootTest = await testEndpoint('/');
    console.log(`Status: ${rootTest.statusCode}`);
    console.log(`Response: ${rootTest.data}\n`);
    
    // Test 2: Test endpoint
    console.log('Testing GET /test');
    const testTest = await testEndpoint('/test');
    console.log(`Status: ${testTest.statusCode}`);
    console.log(`Response: ${testTest.data}\n`);
    
    // Test 3: Auth register endpoint
    console.log('Testing POST /api/auth/register');
    const registerData = JSON.stringify({
      username: 'testuser' + Date.now(),
      email: 'test' + Date.now() + '@test.com',
      password: 'password123'
    });
    const registerTest = await testEndpoint('/api/auth/register', 'POST', registerData);
    console.log(`Status: ${registerTest.statusCode}`);
    console.log(`Response: ${registerTest.data}\n`);
    
  } catch (error) {
    console.error('❌ Error testing endpoints:', error.message);
  }
}

runTests();