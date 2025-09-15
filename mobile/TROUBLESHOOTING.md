# Mobile Login Troubleshooting Guide

## 🔧 Common Login Issues & Solutions

### 1. Network Connection Issues

**Problem**: "Network Error" or "Failed to connect to server"

**Solutions**:

#### For Android Emulator:
```javascript
// In services/api.ts, change to:
export const API_BASE_URL = 'http://10.0.2.2:5000';
```

#### For iOS Simulator:
```javascript
// In services/api.ts, keep:
export const API_BASE_URL = 'http://localhost:5000';
```

#### For Real Device:
1. Find your machine's IP address:
   ```bash
   # On macOS
   ifconfig | grep inet
   
   # On Windows
   ipconfig
   ```

2. Update the API URL:
   ```javascript
   export const API_BASE_URL = 'http://192.168.1.100:5000'; // Replace with your IP
   ```

3. Ensure backend is accessible:
   ```bash
   # Test from your phone's browser:
   http://[YOUR-IP]:5000/health
   ```

### 2. Backend Not Running

**Check if backend is running:**
```bash
curl http://localhost:5000/health
```

**Start backend if needed:**
```bash
cd backend
npm run dev
```

### 3. CORS Issues

**Problem**: "Network Error" even when backend is running

**Solution**: Backend already has CORS configured, but ensure:
- Backend is running on the same network
- No firewall blocking port 5000

### 4. Test Connection

**Test from mobile app:**
```javascript
// Add this debug button to login screen
const testConnection = async () => {
  try {
    const response = await fetch('http://localhost:5000/health');
    const data = await response.json();
    console.log('Connection test:', data);
  } catch (error) {
    console.error('Connection failed:', error);
  }
};
```

### 5. Quick Fix Commands

```bash
# 1. Check backend status
curl http://localhost:5000/health

# 2. Test login
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "alice@example.com", "password": "student123"}'

# 3. Check your IP
ifconfig | grep inet

# 4. Ensure backend is accessible from network
# On macOS, allow firewall:
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /usr/local/bin/node
```

### 6. Common Fixes

#### Android Emulator:
```bash
# Use special IP for Android emulator
export const API_BASE_URL = 'http://10.0.2.2:5000';
```

#### iOS Simulator:
```bash
# Use localhost for iOS simulator
export const API_BASE_URL = 'http://localhost:5000';
```

#### Real Device:
```bash
# Use your machine's IP
export const API_BASE_URL = 'http://192.168.1.100:5000';
```

### 7. Debug Steps

1. **Check console logs** in your mobile app
2. **Test backend directly** with curl
3. **Verify network connectivity** between device and backend
4. **Check firewall settings**
5. **Ensure backend is bound to 0.0.0.0** (not just localhost)

### 8. Environment Variables

Create a `.env` file in mobile root:
```
API_URL=http://localhost:5000
```

Then use:
```javascript
export const API_BASE_URL = process.env.API_URL || 'http://localhost:5000';
```
