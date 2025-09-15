"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentController = exports.StudentController = void 0;
const Student_1 = require("../models/Student");
class StudentController {
    async getAllStudents(req, res) {
        try {
            const { page = 1, limit = 10, sort = 'createdAt', order = 'desc', courseId, search } = req.query;
            const filter = {};
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
            const students = await Student_1.Student.find(filter)
                .sort({ [sort]: order === 'desc' ? -1 : 1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            const total = await Student_1.Student.countDocuments(filter);
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
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: 'Failed to fetch students',
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
    async getStudentById(req, res) {
        try {
            const student = await Student_1.Student.findById(req.params.id);
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
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: 'Failed to fetch student',
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
    async createStudent(req, res) {
        try {
            const existingStudent = await Student_1.Student.findOne({
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
            const student = new Student_1.Student(req.body);
            await student.save();
            return res.status(201).json({
                success: true,
                data: student,
                message: 'Student created successfully'
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                error: 'Failed to create student',
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
    async updateStudent(req, res) {
        try {
            const student = await Student_1.Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                error: 'Failed to update student',
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
    async deleteStudent(req, res) {
        try {
            const student = await Student_1.Student.findByIdAndDelete(req.params.id);
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
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: 'Failed to delete student',
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}
exports.StudentController = StudentController;
exports.studentController = new StudentController();
//# sourceMappingURL=studentController.js.map