import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Student } from '../models/Student';
import { CreateStudentDto, StudentQuery, ApiResponse } from '../types';

interface LoginCredentials {
  studentId: string;
  password: string;
}

export class StudentController {
  // GET /students - List all students with pagination and filtering
  async getAllStudents(req: Request<{}, {}, {}, StudentQuery>, res: Response<ApiResponse>) {
    try {
      const {
        page = 1,
        limit = 10,
        sort = 'createdAt',
        order = 'desc',
        courseId,
        search
      } = req.query;

      const filter: any = {};
      
      if (courseId) {
        filter.courseIds = { $in: [courseId] };
      }
      
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { studentId: { $regex: search, $options: 'i' } }
        ];
      }

      const students = await Student.find(filter)
        .sort({ [sort]: order === 'desc' ? -1 : 1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      const total = await Student.countDocuments(filter);

      res.json({
        success: true,
        data: {
          students,
          pagination: {
            page: Number(page),
            limit: Number(limit),
            total,
            pages: Math.ceil(total / limit)
          }
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch students',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // GET /students/:id - Get single student details
  async getStudentById(req: Request<{ id: string }>, res: Response<ApiResponse>) {
    try {
      const student = await Student.findById(req.params.id);
      
      if (!student) {
        return res.status(404).json({
          success: false,
          error: 'Student not found'
        });
      }

      return res.json({
        success: true,
        data: student
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch student',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // POST /students - Create new student
  async createStudent(req: Request<{}, {}, CreateStudentDto>, res: Response<ApiResponse>) {
    try {
      const existingStudent = await Student.findOne({
        $or: [
          { email: req.body.email },
          { studentId: req.body.studentId }
        ]
      });

      if (existingStudent) {
        return res.status(409).json({
          success: false,
          error: 'Student with this email or ID already exists'
        });
      }

      const student = new Student(req.body);
      await student.save();

      return res.status(201).json({
        success: true,
        data: student,
        message: 'Student created successfully'
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: 'Failed to create student',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // PUT /students/:id - Update student details
  async updateStudent(req: Request<{ id: string }, {}, Partial<CreateStudentDto>>, res: Response<ApiResponse>) {
    try {
      const student = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!student) {
        return res.status(404).json({
          success: false,
          error: 'Student not found'
        });
      }

      return res.json({
        success: true,
        data: student,
        message: 'Student updated successfully'
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: 'Failed to update student',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // DELETE /students/:id - Remove student
  async deleteStudent(req: Request<{ id: string }>, res: Response<ApiResponse>) {
    try {
      const student = await Student.findByIdAndDelete(req.params.id);

      if (!student) {
        return res.status(404).json({
          success: false,
          error: 'Student not found'
        });
      }

      return res.json({
        success: true,
        message: 'Student deleted successfully'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to delete student',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // POST /students/login - Authenticate student
  async login(req: Request<{}, {}, LoginCredentials>, res: Response<ApiResponse>) {
    try {
      const { studentId, password } = req.body;

      if (!studentId || !password) {
        return res.status(400).json({
          success: false,
          error: 'Student ID and password are required'
        });
      }

      // Find student by studentId
      const student = await Student.findOne({ studentId }).select('+password');
      
      if (!student) {
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials'
        });
      }

      if (!student.password) {
        return res.status(500).json({
          success: false,
          error: 'Account error: No password set for this account'
        });
      }

      // Check password using the model's comparePassword method
      const isMatch = await student.comparePassword(password);
      
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials'
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          id: student.id,
          email: student.email,
          role: 'student',
          studentId: student.studentId
        },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '8h' }
      );

      // Remove password from response
      const user = student.toObject();
      if ('password' in user) {
        const { password, ...userWithoutPassword } = user;
        return res.json({
          success: true,
          data: {
            user: userWithoutPassword,
            token
          }
        });
      }

      return res.json({
        success: true,
        data: {
          user,
          token
        }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Login failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}

export const studentController = new StudentController();
