# Backend Deployment Configuration

## CORS Setup for Production

Your backend needs to be configured to accept requests from your Vercel frontend. Add the CORS middleware to your Express app:

### 1. Install CORS package (if not already installed)
```bash
npm install cors @types/cors
```

### 2. Update your main server file (app.js or server.js)
```javascript
import express from 'express';
import corsMiddleware from './src/middleware/cors.js';

const app = express();

// Apply CORS middleware BEFORE other middleware
app.use(corsMiddleware);

// Your other middleware and routes...
app.use(express.json());
// ... rest of your app configuration
```

### 3. Environment Variables for Backend
Make sure your Render backend has these environment variables:
```
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://attendance-tracking-system-orcin.vercel.app
```

### 4. API Routes Structure
Ensure your backend has these routes matching the frontend expectations:
- `POST /api/auth/login`
- `GET /api/teachers`
- `POST /api/teachers`
- `PUT /api/teachers`
- `DELETE /api/teachers`

## Frontend Configuration

The frontend is configured to use your backend URL: `https://attendance-tracking-system-54qq.onrender.com`

### Vercel Environment Variables
Set this in your Vercel dashboard:
```
NEXT_PUBLIC_API_URL=https://attendance-tracking-system-54qq.onrender.com
```

## Testing the Connection

1. Deploy both frontend and backend
2. Test login with admin credentials: `admin001` / `admin123`
3. Try creating a teacher account
4. Test teacher login with generated credentials

## Troubleshooting

If you get CORS errors:
1. Check that the CORS middleware is applied before other middleware
2. Verify the frontend URL is in the allowedOrigins array
3. Ensure the backend is responding to OPTIONS requests

If API calls fail:
1. Check network tab in browser dev tools
2. Verify the API endpoints exist on your backend
3. Check backend logs on Render dashboard
