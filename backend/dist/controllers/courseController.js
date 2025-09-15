"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseController = exports.CourseController = void 0;
const Course_1 = require("../models/Course");
class CourseController {
    async getAllCourses(req, res) {
        try {
            const { page = 1, limit = 10, sort = 'createdAt', order = 'desc', teacherId, search } = req.query;
            const filter = {};
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
            const courses = await Course_1.Course.find(filter)
                .populate('teacherId', 'name email teacherId')
                .sort({ [sort]: order === 'desc' ? -1 : 1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            const total = await Course_1.Course.countDocuments(filter);
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
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: 'Failed to fetch courses',
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
    async getCourseById(req, res) {
        try {
            const course = await Course_1.Course.findById(req.params.id)
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
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: 'Failed to fetch course',
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
    async createCourse(req, res) {
        try {
            const existingCourse = await Course_1.Course.findOne({ code: req.body.code });
            if (existingCourse) {
                return res.status(409).json({
                    success: false,
                    error: 'Course with this code already exists'
                });
            }
            const course = new Course_1.Course(req.body);
            await course.save();
            return res.status(201).json({
                success: true,
                data: course,
                message: 'Course created successfully'
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                error: 'Failed to create course',
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
    async updateCourse(req, res) {
        try {
            const course = await Course_1.Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                error: 'Failed to update course',
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
    async deleteCourse(req, res) {
        try {
            const course = await Course_1.Course.findByIdAndDelete(req.params.id);
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
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: 'Failed to delete course',
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}
exports.CourseController = CourseController;
exports.courseController = new CourseController();
//# sourceMappingURL=courseController.js.map