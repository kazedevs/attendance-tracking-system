import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

// Import routes
import studentRoutes from "./routes/students";
import teacherRoutes from "./routes/teachers";
import courseRoutes from "./routes/courses";
import attendanceRoutes from "./routes/attendance";
import reportRoutes from "./routes/reports";

// Import middleware
import { authenticateToken, authorizeRoles } from "./middleware/auth";

// Import database connection
import { connectDatabase } from "./config/database";

// Import controllers for auth
import { Student } from "./models/Student";
import { Teacher } from "./models/Teacher";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginDto, AuthResponse, ApiResponse, StudentLoginDto } from "./types";

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Attendance Tracking API is running",
    timestamp: new Date().toISOString(),
  });
});

// Authentication routes
app.post(
  "/auth/login",
  async (req, res: Response<ApiResponse<AuthResponse>>) => {
    try {
      const { email, password }: LoginDto = req.body;

      if (!email || !password) {
        res.status(400).json({
          success: false,
          error: "Email and password are required",
        });
        return;
      }

      // Check student first
      let user = await Student.findOne({ email });
      let userType = "student";

      // If not found, check teacher
      if (!user) {
        user = await Teacher.findOne({ email });
        userType = "teacher";
      }

      if (!user) {
        res.status(401).json({
          success: false,
          error: "Invalid credentials",
        });
        return;
      }

      const isValidPassword = await bcrypt.compare(
        password,
        (user as any).password
      );
      if (!isValidPassword) {
        res.status(401).json({
          success: false,
          error: "Invalid credentials",
        });
        return;
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: userType,
        },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "7d" }
      );

      res.json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: userType as any,
            createdAt: (user as any).createdAt,
            updatedAt: (user as any).updatedAt,
          },
          token,
        },
      });
      return;
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Login failed",
        message: error instanceof Error ? error.message : "Unknown error",
      });
      return;
    }
  }
);

app.get("/", (req, res) => {
  res.json("Attendly Backend");
});

// Student authentication routes
app.post(
  "/auth/student/login",
  async (req: Request<{}, {}, StudentLoginDto>, res: Response<ApiResponse<AuthResponse>>) => {
    try {
      const { studentId, password, platform } = req.body;

      if (!studentId || !password) {
        return res.status(400).json({
          success: false,
          error: "Student ID and password are required",
        });
      }

      // Find student by studentId
      const student = await Student.findOne({ studentId });

      if (!student) {
        return res.status(401).json({
          success: false,
          error: "Invalid credentials",
        });
      }

      // Check password
      const isValidPassword = await bcrypt.compare(password, student.password);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          error: "Invalid credentials",
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          id: student._id,
          email: student.email,
          role: 'student',
        },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "7d" }
      );

      // Return user data without password
      const userData = student.toObject();
      if ('password' in userData) {
        delete (userData as any).password;
      }

      return res.json({
        success: true,
        data: {
          user: {
id: userData._id.toString(),
            email: userData.email,
            name: userData.name,
            role: 'student' as const,
            studentId: userData.studentId,
            courseIds: userData.courseIds || [],
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt,
          } as const,
          token,
        },
      });
    } catch (error) {
      console.error('Student login error:', error);
      return res.status(500).json({
        success: false,
        error: "Login failed",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
);

// Student registration
app.post(
  "/auth/student/register",
  async (req: Request<{}, {}, StudentLoginDto & { email: string; name: string }>, res: Response<ApiResponse<AuthResponse>>) => {
    try {
      const { studentId, email, name, password, platform } = req.body;

      // Validate required fields
      if (!studentId || !email || !name || !password) {
        return res.status(400).json({
          success: false,
          error: "Student ID, email, name, and password are required",
        });
      }

      // Check if student already exists
      const existingStudent = await Student.findOne({
        $or: [{ studentId }, { email }],
      });

      if (existingStudent) {
        return res.status(409).json({
          success: false,
          error: "Student with this ID or email already exists",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new student
      const student = new Student({
        studentId,
        email,
        name,
        password: hashedPassword,
        role: 'student',
      });

      await student.save();

      // Generate JWT token
      const token = jwt.sign(
        {
          id: student._id,
          email: student.email,
          role: 'student',
        },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "7d" }
      );

      // Return user data without password
      const userData = student.toObject();
      if ('password' in userData) {
        delete (userData as any).password;
      }

      return res.status(201).json({
        success: true,
        data: {
          user: {
id: userData._id.toString(),
            email: userData.email,
            name: userData.name,
            role: 'student' as const,
            studentId: userData.studentId,
            courseIds: userData.courseIds || [],
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt,
          } as const,
          token,
        },
        message: "Student registered successfully",
      });
    } catch (error) {
      console.error('Student registration error:', error);
      return res.status(500).json({
        success: false,
        error: "Registration failed",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
);
// Protected routes with authentication
app.use("/api/students", authenticateToken, studentRoutes);
app.use("/api/teachers", authenticateToken, teacherRoutes);
app.use("/api/courses", authenticateToken, courseRoutes);
app.use("/api/attendance", authenticateToken, attendanceRoutes);
app.use("/api/reports", authenticateToken, reportRoutes);

// Admin-only routes
app.use("/api/admin", authenticateToken, authorizeRoles("admin"));

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: Response<ApiResponse>,
    next: NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Something went wrong",
    });
  }
);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

// Start server
const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`🔗 API Base URL: http://localhost:${PORT}`);
      console.log(`🔑 Health Check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
