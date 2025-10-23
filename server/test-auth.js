// Test Authentication API
// Run this file with: node server/test-auth.js

const axios = require('axios');

const API_URL = 'http://localhost:5000/api/auth';

const testAuth = async () => {
  try {
    console.log('🧪 Testing Authentication API...\n');

    // Test 1: Register a new user
    console.log('1️⃣ Testing Register...');
    const registerData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      bio: 'I love movies!'
    };

    const registerResponse = await axios.post(`${API_URL}/register`, registerData);
    console.log('✅ Register Success:', registerResponse.data);
    const token = registerResponse.data.token;
    console.log('🔑 Token received:', token.substring(0, 20) + '...\n');

    // Test 2: Login with the same user
    console.log('2️⃣ Testing Login...');
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };

    const loginResponse = await axios.post(`${API_URL}/login`, loginData);
    console.log('✅ Login Success:', loginResponse.data);
    console.log('🔑 Token received:', loginResponse.data.token.substring(0, 20) + '...\n');

    // Test 3: Verify token
    console.log('3️⃣ Testing Token Verification...');
    const verifyResponse = await axios.get(`${API_URL}/verify`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('✅ Verify Success:', verifyResponse.data);

    console.log('\n✅ All authentication tests passed! 🎉');

  } catch (error) {
    if (error.response) {
      console.error('❌ Error:', error.response.data);
    } else {
      console.error('❌ Error:', error.message);
    }
  }
};

// Run the test
testAuth();
