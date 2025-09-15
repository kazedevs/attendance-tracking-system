"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacherController = exports.TeacherController = void 0;
const Teacher_1 = require("../models/Teacher");
class TeacherController {
    async getAllTeachers(req, res) {
        try {
            const { page = 1, limit = 10, sort = 'createdAt', order = 'desc', department, search } = req.query;
            const filter = {};
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
            const teachers = await Teacher_1.Teacher.find(filter)
                .sort({ [sort]: order === 'desc' ? -1 : 1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            const total = await Teacher_1.Teacher.countDocuments(filter);
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
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: 'Failed to fetch teachers',
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
    async getTeacherById(req, res) {
        try {
            const teacher = await Teacher_1.Teacher.findById(req.params.id);
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
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: 'Failed to fetch teacher',
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
    async createTeacher(req, res) {
        try {
            const existingTeacher = await Teacher_1.Teacher.findOne({
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
            const teacher = new Teacher_1.Teacher(req.body);
            await teacher.save();
            return res.status(201).json({
                success: true,
                data: teacher,
                message: 'Teacher created successfully'
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                error: 'Failed to create teacher',
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
    async updateTeacher(req, res) {
        try {
            const teacher = await Teacher_1.Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                error: 'Failed to update teacher',
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
    async deleteTeacher(req, res) {
        try {
            const teacher = await Teacher_1.Teacher.findByIdAndDelete(req.params.id);
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
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: 'Failed to delete teacher',
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}
exports.TeacherController = TeacherController;
exports.teacherController = new TeacherController();
//# sourceMappingURL=teacherController.js.map