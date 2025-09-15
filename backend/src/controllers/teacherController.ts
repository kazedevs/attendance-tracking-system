import { Request, Response } from 'express';
import { Teacher } from '../models/Teacher';
import { CreateTeacherDto, TeacherQuery, ApiResponse } from '../types';

export class TeacherController {
  // GET /teachers - List all teachers with pagination and filtering
  async getAllTeachers(req: Request<{}, {}, {}, TeacherQuery>, res: Response<ApiResponse>) {
    try {
      const {
        page = 1,
        limit = 10,
        sort = 'createdAt',
        order = 'desc',
        department,
        search
      } = req.query;

      const filter: any = {};
      
      if (department) {
        filter.department = department;
      }
      
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { teacherId: { $regex: search, $options: 'i' } }
        ];
      }

      const teachers = await Teacher.find(filter)
        .sort({ [sort]: order === 'desc' ? -1 : 1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      const total = await Teacher.countDocuments(filter);

      res.json({
        success: true,
        data: {
          teachers,
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
        error: 'Failed to fetch teachers',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // GET /teachers/:id - Get single teacher details
  async getTeacherById(req: Request<{ id: string }>, res: Response<ApiResponse>) {
    try {
      const teacher = await Teacher.findById(req.params.id);
      
      if (!teacher) {
        return res.status(404).json({
          success: false,
          error: 'Teacher not found'
        });
      }

      return res.json({
        success: true,
        data: teacher
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch teacher',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // POST /teachers - Create new teacher
  async createTeacher(req: Request<{}, {}, CreateTeacherDto>, res: Response<ApiResponse>) {
    try {
      const existingTeacher = await Teacher.findOne({
        $or: [
          { email: req.body.email },
          { teacherId: req.body.teacherId }
        ]
      });

      if (existingTeacher) {
        return res.status(409).json({
          success: false,
          error: 'Teacher with this email or ID already exists'
        });
      }

      const teacher = new Teacher(req.body);
      await teacher.save();

      return res.status(201).json({
        success: true,
        data: teacher,
        message: 'Teacher created successfully'
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: 'Failed to create teacher',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // PUT /teachers/:id - Update teacher details
  async updateTeacher(req: Request<{ id: string }, {}, Partial<CreateTeacherDto>>, res: Response<ApiResponse>) {
    try {
      const teacher = await Teacher.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!teacher) {
        return res.status(404).json({
          success: false,
          error: 'Teacher not found'
        });
      }

      return res.json({
        success: true,
        data: teacher,
        message: 'Teacher updated successfully'
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: 'Failed to update teacher',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // DELETE /teachers/:id - Remove teacher
  async deleteTeacher(req: Request<{ id: string }>, res: Response<ApiResponse>) {
    try {
      const teacher = await Teacher.findByIdAndDelete(req.params.id);

      if (!teacher) {
        return res.status(404).json({
          success: false,
          error: 'Teacher not found'
        });
      }

      return res.json({
        success: true,
        message: 'Teacher deleted successfully'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to delete teacher',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}

export const teacherController = new TeacherController();
