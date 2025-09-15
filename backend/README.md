# Attendance Tracking System - Backend API

A comprehensive TypeScript-based backend API for an attendance tracking system built with Express.js and MongoDB.

## 🏗️ Architecture

The backend is organized into clean, modular folders:

```
backend/
├── src/
│   ├── config/          # Database and app configuration
│   ├── controllers/     # Business logic for each route
│   ├── middleware/      # Authentication and validation middleware
│   ├── models/          # MongoDB schemas and interfaces
│   ├── routes/          # API route definitions
│   ├── types/           # TypeScript interfaces and types
│   └── index.ts         # Main server file
├── dist/                # Compiled JavaScript (after build)
├── package.json
├── tsconfig.json
└── .env.example
```

## 🚀 Features

- **Complete CRUD operations** for Students, Teachers, Courses
- **Attendance management** with QR code sessions
- **Real-time attendance tracking**
- **Comprehensive reporting** with analytics
- **Role-based access control** (Admin, Teacher, Student)
- **Authentication & Authorization** with JWT
- **Data validation** with express-validator
- **Pagination & filtering** for all list endpoints
- **Export functionality** (JSON, CSV, Excel)

## 📋 API Endpoints

### Authentication
- `POST /auth/login` - User login

### Students
- `GET /api/students` - List all students (with pagination)
- `POST /api/students` - Create new student
- `GET /api/students/:id` - Get student details
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Teachers
- `GET /api/teachers` - List all teachers (with pagination)
- `POST /api/teachers` - Create new teacher
- `GET /api/teachers/:id` - Get teacher details
- `PUT /api/teachers/:id` - Update teacher
- `DELETE /api/teachers/:id` - Delete teacher

### Courses
- `GET /api/courses` - List all courses (with pagination)
- `POST /api/courses` - Create new course
- `GET /api/courses/:id` - Get course details
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Attendance
- `GET /api/attendance/sessions` - List all sessions
- `POST /api/attendance/sessions` - Create new session
- `GET /api/attendance/sessions/:id` - Get session details
- `PUT /api/attendance/sessions/:id` - Update session
- `POST /api/attendance/mark/:sessionId` - Mark attendance
- `GET /api/attendance/records` - Get attendance records
- `POST /api/attendance/records` - Save manual attendance

### Reports
- `GET /api/reports/attendance` - Attendance summary
- `GET /api/reports/performance` - Performance analytics
- `GET /api/reports/export` - Export reports

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Environment setup:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start MongoDB** (if running locally):
   ```bash
   mongod
   ```

4. **Development mode:**
   ```bash
   npm run dev
   ```

5. **Production build:**
   ```bash
   npm run build
   npm start
   ```

## 📊 Database Schema

### Collections
- **Students** - Student information and enrollment
- **Teachers** - Teacher information and departments
- **Courses** - Course details and relationships
- **AttendanceSessions** - QR code sessions
- **AttendanceRecords** - Individual attendance entries

## 🔐 Authentication

### Login Credentials (Demo)
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

### JWT Token
All protected endpoints require a Bearer token:
```
Authorization: Bearer <your-jwt-token>
```

## 🧪 Testing

### Using curl
```bash
# Login
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'

# Get students
curl -X GET http://localhost:5000/api/students \
  -H "Authorization: Bearer <token>"
```

### Using Postman
Import the following collection structure:
- Base URL: `http://localhost:5000`
- Headers: `Authorization: Bearer {{token}}`

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/attendance-tracking` |
| `JWT_SECRET` | JWT signing secret | `your-super-secret-jwt-key` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |

## 🔄 API Response Format

All API responses follow this structure:

```typescript
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
```

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error description",
  "message": "Detailed error message"
}
```

## 🚀 Deployment

### Docker (Coming Soon)
```bash
docker-compose up
```

### Production
1. Set `NODE_ENV=production`
2. Use environment variables for sensitive data
3. Enable HTTPS
4. Set up MongoDB replica set
5. Configure reverse proxy (nginx)

## 📱 Frontend Integration

This backend is designed to work with:
- **Web Frontend**: Next.js/React application
- **Mobile App**: React Native/Expo application

Both frontends should use the same API endpoints and authentication flow.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.
