// Simple test script for the contact API
const testContactAPI = async () => {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '+91 9876543210',
    subject: 'Test Message',
    message: 'This is a test message to verify the API is working.'
  };

  try {
    console.log('Testing contact API...');
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    console.log('API Response:', result);
    
    if (result.success) {
      console.log('✅ Contact API is working!');
      console.log('Message ID:', result.data.messageId);
      console.log('SMS Sent:', result.data.smsSent);
      console.log('Email Sent:', result.data.emailSent);
    } else {
      console.log('❌ Contact API failed:', result.error);
    }
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

// Test store API
const testStoreAPI = async () => {
  try {
    console.log('\nTesting store API...');
    const response = await fetch('http://localhost:3000/api/contact/stores');
    const result = await response.json();
    
    if (Array.isArray(result)) {
      console.log('✅ Store API is working!');
      console.log('Stores found:', result.length);
    } else {
      console.log('❌ Store API failed:', result.error);
    }
  } catch (error) {
    console.error('❌ Store test failed:', error.message);
  }
};

// Run tests
const runTests = async () => {
  console.log('🚀 Starting API tests...\n');
  await testContactAPI();
  await testStoreAPI();
  console.log('\n✨ Tests completed!');
};

// Run if this file is executed directly
if (typeof window === 'undefined') {
  runTests();
} 