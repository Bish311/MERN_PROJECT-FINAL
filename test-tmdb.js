const http = require('http');

// Simple HTTP request function
function makeRequest(path, method = 'GET') {
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
        resolve({ 
          status: res.statusCode, 
          data: JSON.parse(body),
          path: path 
        });
      });
    });

    req.on('error', (err) => {
      reject({ path, error: err.message });
    });

    req.end();
  });
}

async function testTMDBEndpoints() {
  console.log('🐱 Testing TMDB API Integration...\n');
  console.log('============================================================');

  const tests = [
    {
      name: '🔎 Search Movies',
      path: '/api/movies/search?query=batman',
      expectedKeys: ['results', 'total_results', 'page']
    },
    {
      name: '🔥 Popular Movies',
      path: '/api/movies/popular',
      expectedKeys: ['results', 'total_results', 'page']
    },
    {
      name: '📈 Trending Movies',
      path: '/api/movies/trending',
      expectedKeys: ['results', 'total_results', 'page']
    },
    {
      name: '🎬 Movie Details',
      path: '/api/movies/550', // Fight Club
      expectedKeys: ['id', 'title', 'overview', 'release_date']
    },
    {
      name: '🎭 Movie Credits',
      path: '/api/movies/550/credits', // Fight Club credits
      expectedKeys: ['cast', 'crew', 'id']
    }
  ];

  let passedTests = 0;
  let totalTests = tests.length;

  for (const test of tests) {
    try {
      console.log(`\n${test.name}`);
      console.log(`Testing: GET ${test.path}`);
      
      const result = await makeRequest(test.path);
      
      if (result.status === 200) {
        // Check if expected keys exist
        const hasRequiredKeys = test.expectedKeys.every(key => 
          result.data.hasOwnProperty(key)
        );
        
        if (hasRequiredKeys) {
          console.log(`✅ SUCCESS - Status: ${result.status}`);
          
          // Show sample data
          if (result.data.results && result.data.results.length > 0) {
            const firstResult = result.data.results[0];
            console.log(`📊 Sample: "${firstResult.title || firstResult.name}" (${firstResult.release_date || firstResult.first_air_date || 'N/A'})`);
            console.log(`📈 Total Results: ${result.data.total_results}`);
          } else if (result.data.title) {
            console.log(`📊 Movie: "${result.data.title}" (${result.data.release_date})`);
            console.log(`🎬 Runtime: ${result.data.runtime} minutes`);
          } else if (result.data.cast) {
            console.log(`📊 Cast Members: ${result.data.cast.length}`);
            console.log(`🎭 Crew Members: ${result.data.crew.length}`);
          }
          
          passedTests++;
        } else {
          console.log(`❌ FAILED - Missing required keys: ${test.expectedKeys.join(', ')}`);
          console.log(`📦 Available keys: ${Object.keys(result.data).join(', ')}`);
        }
      } else {
        console.log(`❌ FAILED - Status: ${result.status}`);
        console.log(`📦 Response: ${JSON.stringify(result.data, null, 2)}`);
      }
      
    } catch (error) {
      console.log(`❌ ERROR - ${error.error || error.message}`);
    }
  }

  console.log('\n============================================================');
  console.log(`🎯 Test Results: ${passedTests}/${totalTests} passed`);
  
  if (passedTests === totalTests) {
    console.log('🎉 ALL TMDB ENDPOINTS WORKING PERFECTLY!');
    console.log('🚀 Ready for frontend integration!');
  } else {
    console.log('⚠️  Some endpoints need attention');
    console.log('💡 Check TMDB_API_KEY in .env file');
  }
  
  console.log('============================================================\n');
}

// Run tests
console.log('ℹ️  Make sure your server is running...');
console.log('ℹ️  Waiting 2 seconds before testing...\n');

setTimeout(() => {
  testTMDBEndpoints();
}, 2000);