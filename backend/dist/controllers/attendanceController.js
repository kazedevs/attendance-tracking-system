"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attendanceController = exports.AttendanceController = void 0;
const AttendanceSession_1 = require("../models/AttendanceSession");
const AttendanceRecord_1 = require("../models/AttendanceRecord");
const uuid_1 = require("uuid");
class AttendanceController {
    async getAllSessions(req, res) {
        try {
            const { page = 1, limit = 10, sort = "startTime", order = "desc", courseId, teacherId, } = req.query;
            const filter = {};
            if (courseId)
                filter.courseId = courseId;
            if (teacherId)
                filter.teacherId = teacherId;
            const sessions = await AttendanceSession_1.AttendanceSession.find(filter)
                .populate("courseId", "name code")
                .populate("teacherId", "name teacherId")
                .sort({ [sort]: order === "desc" ? -1 : 1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            const total = await AttendanceSession_1.AttendanceSession.countDocuments(filter);
            res.json({
                success: true,
                data: {
                    sessions,
                    pagination: {
                        page: Number(page),
                        limit: Number(limit),
                        total,
                        pages: Math.ceil(total / limit),
                    },
                },
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: "Failed to fetch sessions",
                message: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }
    async createSession(req, res) {
        try {
            const qrCode = (0, uuid_1.v4)();
            const session = new AttendanceSession_1.AttendanceSession({
                ...req.body,
                qrCode,
                teacherId: req.body.teacherId || req.user.id,
            });
            await session.save();
            const populatedSession = await AttendanceSession_1.AttendanceSession.findById(session.id)
                .populate("courseId", "name code")
                .populate("teacherId", "name teacherId");
            return res.status(201).json({
                success: true,
                data: populatedSession,
                message: "Attendance session created successfully",
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                error: "Failed to create session",
                message: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }
    async getSessionById(req, res) {
        try {
            const session = await AttendanceSession_1.AttendanceSession.findById(req.params.id)
                .populate("courseId", "name code")
                .populate("teacherId", "name teacherId");
            if (!session) {
                return res.status(404).json({
                    success: false,
                    error: "Session not found",
                });
            }
            return res.json({
                success: true,
                data: session,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: "Failed to fetch session",
                message: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }
    async updateSession(req, res) {
        try {
            const session = await AttendanceSession_1.AttendanceSession.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!session) {
                return res.status(404).json({
                    success: false,
                    error: "Session not found",
                });
            }
            return res.json({
                success: true,
                data: session,
                message: "Session updated successfully",
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                error: "Failed to update session",
                message: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }
    async markAttendance(req, res) {
        try {
            const session = await AttendanceSession_1.AttendanceSession.findById(req.params.sessionId);
            if (!session) {
                return res.status(404).json({
                    success: false,
                    error: "Session not found",
                });
            }
            if (!session.isActive) {
                return res.status(400).json({
                    success: false,
                    error: "Session is not active",
                });
            }
            const existingRecord = await AttendanceRecord_1.AttendanceRecord.findOne({
                sessionId: req.params.sessionId,
                studentId: req.body.studentId,
            });
            if (existingRecord) {
                return res.status(409).json({
                    success: false,
                    error: "Attendance already marked for this session",
                });
            }
            const attendanceRecord = new AttendanceRecord_1.AttendanceRecord({
                ...req.body,
                sessionId: req.params.sessionId,
                courseId: session.courseId,
            });
            await attendanceRecord.save();
            const populatedRecord = await AttendanceRecord_1.AttendanceRecord.findById(attendanceRecord.id)
                .populate("studentId", "name studentId")
                .populate("sessionId", "sessionName");
            return res.status(201).json({
                success: true,
                data: populatedRecord,
                message: "Attendance marked successfully",
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                error: "Failed to mark attendance",
                message: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }
    async getAttendanceRecords(req, res) {
        try {
            const { page = 1, limit = 10, sort = "markedAt", order = "desc", sessionId, studentId, courseId, dateFrom, dateTo, } = req.query;
            const filter = {};
            if (sessionId)
                filter.sessionId = sessionId;
            if (studentId)
                filter.studentId = studentId;
            if (courseId)
                filter.courseId = courseId;
            if (dateFrom || dateTo) {
                filter.markedAt = {};
                if (dateFrom)
                    filter.markedAt.$gte = new Date(dateFrom);
                if (dateTo)
                    filter.markedAt.$lte = new Date(dateTo);
            }
            const records = await AttendanceRecord_1.AttendanceRecord.find(filter)
                .populate("studentId", "name studentId")
                .populate("sessionId", "sessionName startTime")
                .populate("courseId", "name code")
                .sort({ [sort]: order === "desc" ? -1 : 1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            const total = await AttendanceRecord_1.AttendanceRecord.countDocuments(filter);
            res.json({
                success: true,
                data: {
                    records,
                    pagination: {
                        page: Number(page),
                        limit: Number(limit),
                        total,
                        pages: Math.ceil(total / limit),
                    },
                },
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: "Failed to fetch attendance records",
                message: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }
    async saveManualAttendance(req, res) {
        try {
            const records = await AttendanceRecord_1.AttendanceRecord.insertMany(req.body.map((record) => ({ ...record, markedBy: "manual" })), { ordered: false });
            res.status(201).json({
                success: true,
                data: records,
                message: "Manual attendance records saved successfully",
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                error: "Failed to save manual attendance",
                message: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }
}
exports.AttendanceController = AttendanceController;
exports.attendanceController = new AttendanceController();
//# sourceMappingURL=attendanceController.js.map