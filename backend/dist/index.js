"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const students_1 = __importDefault(require("./routes/students"));
const teachers_1 = __importDefault(require("./routes/teachers"));
const courses_1 = __importDefault(require("./routes/courses"));
const attendance_1 = __importDefault(require("./routes/attendance"));
const reports_1 = __importDefault(require("./routes/reports"));
const auth_1 = require("./middleware/auth");
const database_1 = require("./config/database");
const Student_1 = require("./models/Student");
const Teacher_1 = require("./models/Teacher");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Attendance Tracking API is running',
        timestamp: new Date().toISOString()
    });
});
app.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                success: false,
                error: 'Email and password are required'
            });
            return;
        }
        let user = await Student_1.Student.findOne({ email });
        let userType = 'student';
        if (!user) {
            user = await Teacher_1.Teacher.findOne({ email });
            userType = 'teacher';
        }
        if (!user) {
            res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
            return;
        }
        const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
            role: userType
        }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });
        res.json({
            success: true,
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: userType,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                },
                token
            }
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Login failed',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
        return;
    }
});
app.use('/api/students', auth_1.authenticateToken, students_1.default);
app.use('/api/teachers', auth_1.authenticateToken, teachers_1.default);
app.use('/api/courses', auth_1.authenticateToken, courses_1.default);
app.use('/api/attendance', auth_1.authenticateToken, attendance_1.default);
app.use('/api/reports', auth_1.authenticateToken, reports_1.default);
app.use('/api/admin', auth_1.authenticateToken, (0, auth_1.authorizeRoles)('admin'));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});
const startServer = async () => {
    try {
        await (0, database_1.connectDatabase)();
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🔗 API Base URL: http://localhost:${PORT}`);
            console.log(`🔑 Health Check: http://localhost:${PORT}/health`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
exports.default = app;
//# sourceMappingURL=index.js.map