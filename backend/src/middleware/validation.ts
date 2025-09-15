import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { ApiResponse } from '../types';

export const validateRequest = (req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorArray = errors.array();
    res.status(400).json({
      success: false,
      error: 'Validation failed',
      message: (errorArray.length > 0 && errorArray[0]?.msg) ? errorArray[0].msg : 'Validation failed'
    });
    return;
  }
  next();
};

// Student validation rules
export const validateCreateStudent = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('studentId').trim().isLength({ min: 3 }).withMessage('Student ID must be at least 3 characters'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('courseIds').optional().isArray().withMessage('Course IDs must be an array')
];

// Teacher validation rules
export const validateCreateTeacher = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('teacherId').trim().isLength({ min: 3 }).withMessage('Teacher ID must be at least 3 characters'),
  body('department').trim().isLength({ min: 2 }).withMessage('Department must be at least 2 characters'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('courseIds').optional().isArray().withMessage('Course IDs must be an array')
];

// Course validation rules
export const validateCreateCourse = [
  body('name').trim().isLength({ min: 3 }).withMessage('Course name must be at least 3 characters'),
  body('code').trim().isLength({ min: 3 }).withMessage('Course code must be at least 3 characters'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('teacherId').isMongoId().withMessage('Valid teacher ID is required'),
  body('studentIds').optional().isArray().withMessage('Student IDs must be an array')
];

// Attendance session validation rules
export const validateCreateAttendanceSession = [
  body('courseId').isMongoId().withMessage('Valid course ID is required'),
  body('sessionName').trim().isLength({ min: 3 }).withMessage('Session name must be at least 3 characters'),
  body('startTime').isISO8601().withMessage('Valid start time is required')
];

// Attendance marking validation rules
export const validateMarkAttendance = [
  body('studentId').isMongoId().withMessage('Valid student ID is required'),
  body('status').isIn(['present', 'absent', 'late']).withMessage('Status must be present, absent, or late'),
  body('markedBy').isIn(['qr', 'manual']).withMessage('Marked by must be qr or manual')
];
