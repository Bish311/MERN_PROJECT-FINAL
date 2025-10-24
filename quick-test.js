// Quick test script to verify all endpoints
const testEndpoints = async () => {
  const baseURL = 'http://localhost:5000';
  
  console.log('🧪 Testing API endpoints...\n');
  
  // Test 1: Root endpoint
  try {
    const response = await fetch(`${baseURL}/`);
    const data = await response.json();
    console.log('✅ GET / - Status:', response.status);
    console.log('   Response:', data);
  } catch (error) {
    console.log('❌ GET / - Error:', error.message);
  }
  
  // Test 2: Test endpoint
  try {
    const response = await fetch(`${baseURL}/test`);
    const data = await response.text();
    console.log('✅ GET /test - Status:', response.status);
    console.log('   Response:', data);
  } catch (error) {
    console.log('❌ GET /test - Error:', error.message);
  }
  
  // Test 3: Auth register endpoint (with dummy data)
  try {
    const response = await fetch(`${baseURL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'testuser',
        email: 'test@test.com',
        password: 'password123'
      })
    });
    const data = await response.json();
    console.log('📝 POST /api/auth/register - Status:', response.status);
    console.log('   Response:', data);
  } catch (error) {
    console.log('❌ POST /api/auth/register - Error:', error.message);
  }
};

testEndpoints();