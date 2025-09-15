import { Request, Response } from 'express';
import { Course } from '../models/Course';
import { CreateCourseDto, CourseQuery, ApiResponse } from '../types';

export class CourseController {
  // GET /courses - List all courses with pagination and filtering
  async getAllCourses(req: Request<{}, {}, {}, CourseQuery>, res: Response<ApiResponse>) {
    try {
      const {
        page = 1,
        limit = 10,
        sort = 'createdAt',
        order = 'desc',
        teacherId,
        search
      } = req.query;

      const filter: any = {};
      
      if (teacherId) {
        filter.teacherId = teacherId;
      }
      
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { code: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }

      const courses = await Course.find(filter)
        .populate('teacherId', 'name email teacherId')
        .sort({ [sort]: order === 'desc' ? -1 : 1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      const total = await Course.countDocuments(filter);

      res.json({
        success: true,
        data: {
          courses,
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
        error: 'Failed to fetch courses',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // GET /courses/:id - Get single course details
  async getCourseById(req: Request<{ id: string }>, res: Response<ApiResponse>) {
    try {
      const course = await Course.findById(req.params.id)
        .populate('teacherId', 'name email teacherId department')
        .populate('studentIds', 'name email studentId');
      
      if (!course) {
        return res.status(404).json({
          success: false,
          error: 'Course not found'
        });
      }

      return res.json({
        success: true,
        data: course
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch course',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // POST /courses - Create new course
  async createCourse(req: Request<{}, {}, CreateCourseDto>, res: Response<ApiResponse>) {
    try {
      const existingCourse = await Course.findOne({ code: req.body.code });

      if (existingCourse) {
        return res.status(409).json({
          success: false,
          error: 'Course with this code already exists'
        });
      }

      const course = new Course(req.body);
      await course.save();

      return res.status(201).json({
        success: true,
        data: course,
        message: 'Course created successfully'
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: 'Failed to create course',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // PUT /courses/:id - Update course details
  async updateCourse(req: Request<{ id: string }, {}, Partial<CreateCourseDto>>, res: Response<ApiResponse>) {
    try {
      const course = await Course.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!course) {
        return res.status(404).json({
          success: false,
          error: 'Course not found'
        });
      }

      return res.json({
        success: true,
        data: course,
        message: 'Course updated successfully'
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: 'Failed to update course',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // DELETE /courses/:id - Remove course
  async deleteCourse(req: Request<{ id: string }>, res: Response<ApiResponse>) {
    try {
      const course = await Course.findByIdAndDelete(req.params.id);

      if (!course) {
        return res.status(404).json({
          success: false,
          error: 'Course not found'
        });
      }

      return res.json({
        success: true,
        message: 'Course deleted successfully'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to delete course',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}

export const courseController = new CourseController();
