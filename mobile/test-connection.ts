// Test script to verify mobile app backend connection
import { authAPI } from './services/api';

const testBackendConnection = async () => {
  console.log('🔄 Testing backend connection...');
  
  try {
    // Test login with demo credentials
    const response = await authAPI.login('alice@example.com', 'student123');
    
    if (response.success) {
      console.log('✅ Backend connection successful!');
      console.log('🎉 Login successful for:', response.data.user.name);
      console.log('🎫 Token received:', response.data.token.substring(0, 20) + '...');
      
      // Store token for testing
      await authAPI.setToken(response.data.token);
      
      // Test token storage
      const storedToken = await authAPI.getToken();
      console.log('🔐 Token stored successfully:', storedToken ? 'Yes' : 'No');
      
    } else {
      console.log('❌ Login failed:', response.error);
    }
  } catch (error) {
    console.error('❌ Connection error:', error);
  }
};

// Run the test
testBackendConnection();
