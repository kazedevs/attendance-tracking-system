"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportController = exports.ReportController = void 0;
const AttendanceRecord_1 = require("../models/AttendanceRecord");
const AttendanceSession_1 = require("../models/AttendanceSession");
class ReportController {
    async getAttendanceSummary(req, res) {
        try {
            const { courseId, studentId, teacherId, dateFrom, dateTo } = req.query;
            const matchStage = {};
            if (courseId)
                matchStage.courseId = courseId;
            if (studentId)
                matchStage.studentId = studentId;
            if (dateFrom || dateTo) {
                matchStage.markedAt = {};
                if (dateFrom)
                    matchStage.markedAt.$gte = new Date(dateFrom);
                if (dateTo)
                    matchStage.markedAt.$lte = new Date(dateTo);
            }
            if (teacherId) {
                const sessions = await AttendanceSession_1.AttendanceSession.find({ teacherId });
                const sessionIds = sessions.map(s => s.id);
                matchStage.sessionId = { $in: sessionIds };
            }
            const pipeline = [
                { $match: matchStage },
                {
                    $group: {
                        _id: {
                            courseId: '$courseId',
                            studentId: '$studentId'
                        },
                        totalSessions: { $sum: 1 },
                        present: { $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] } },
                        absent: { $sum: { $cond: [{ $eq: ['$status', 'absent'] }, 1, 0] } },
                        late: { $sum: { $cond: [{ $eq: ['$status', 'late'] }, 1, 0] } },
                        lastAttendance: { $max: '$markedAt' }
                    }
                },
                {
                    $project: {
                        courseId: '$_id.courseId',
                        studentId: '$_id.studentId',
                        totalSessions: 1,
                        present: 1,
                        absent: 1,
                        late: 1,
                        attendanceRate: {
                            $multiply: [
                                { $divide: ['$present', '$totalSessions'] },
                                100
                            ]
                        },
                        lastAttendance: 1,
                        _id: 0
                    }
                },
                { $sort: { attendanceRate: -1 } }
            ];
            const summary = await AttendanceRecord_1.AttendanceRecord.aggregate(pipeline);
            return res.json({
                success: true,
                data: summary
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: 'Failed to generate attendance summary',
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
    async getPerformanceAnalytics(req, res) {
        try {
            const { courseId, dateFrom, dateTo } = req.query;
            const matchStage = {};
            if (courseId)
                matchStage.courseId = courseId;
            if (dateFrom || dateTo) {
                matchStage.markedAt = {};
                if (dateFrom)
                    matchStage.markedAt.$gte = new Date(dateFrom);
                if (dateTo)
                    matchStage.markedAt.$lte = new Date(dateTo);
            }
            const pipeline = [
                { $match: matchStage },
                {
                    $group: {
                        _id: '$courseId',
                        totalStudents: { $addToSet: '$studentId' },
                        totalSessions: { $addToSet: '$sessionId' },
                        attendance: {
                            $push: {
                                studentId: '$studentId',
                                status: '$status'
                            }
                        }
                    }
                },
                {
                    $project: {
                        courseId: '$_id',
                        totalStudents: { $size: '$totalStudents' },
                        totalSessions: { $size: '$totalSessions' },
                        averageAttendance: {
                            $let: {
                                vars: {
                                    presentCount: {
                                        $size: {
                                            $filter: {
                                                input: '$attendance',
                                                cond: { $eq: ['$$this.status', 'present'] }
                                            }
                                        }
                                    }
                                },
                                in: {
                                    $multiply: [
                                        {
                                            $divide: [
                                                '$$presentCount',
                                                { $multiply: ['$totalStudents', '$totalSessions'] }
                                            ]
                                        },
                                        100
                                    ]
                                }
                            }
                        },
                        _id: 0
                    }
                }
            ];
            const performance = await AttendanceRecord_1.AttendanceRecord.aggregate(pipeline);
            return res.json({
                success: true,
                data: performance
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: 'Failed to generate performance analytics',
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
    async exportReport(req, res) {
        try {
            const { type = 'attendance', format = 'json', ...query } = req.query;
            let data;
            if (type === 'attendance') {
                const matchStage = {};
                const { courseId, studentId, teacherId, dateFrom, dateTo } = query;
                if (courseId)
                    matchStage.courseId = courseId;
                if (studentId)
                    matchStage.studentId = studentId;
                if (dateFrom || dateTo) {
                    matchStage.markedAt = {};
                    if (dateFrom)
                        matchStage.markedAt.$gte = new Date(dateFrom);
                    if (dateTo)
                        matchStage.markedAt.$lte = new Date(dateTo);
                }
                if (teacherId) {
                    const sessions = await AttendanceSession_1.AttendanceSession.find({ teacherId });
                    const sessionIds = sessions.map(s => s.id);
                    matchStage.sessionId = { $in: sessionIds };
                }
                data = await AttendanceRecord_1.AttendanceRecord.aggregate([
                    { $match: matchStage },
                    {
                        $group: {
                            _id: {
                                courseId: '$courseId',
                                studentId: '$studentId'
                            },
                            totalSessions: { $sum: 1 },
                            present: { $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] } },
                            absent: { $sum: { $cond: [{ $eq: ['$status', 'absent'] }, 1, 0] } },
                            late: { $sum: { $cond: [{ $eq: ['$status', 'late'] }, 1, 0] } },
                            lastAttendance: { $max: '$markedAt' }
                        }
                    },
                    {
                        $project: {
                            courseId: '$_id.courseId',
                            studentId: '$_id.studentId',
                            totalSessions: 1,
                            present: 1,
                            absent: 1,
                            late: 1,
                            attendanceRate: {
                                $multiply: [
                                    { $divide: ['$present', '$totalSessions'] },
                                    100
                                ]
                            },
                            lastAttendance: 1,
                            _id: 0
                        }
                    },
                    { $sort: { attendanceRate: -1 } }
                ]);
            }
            else if (type === 'performance') {
                const matchStage = {};
                const { courseId, dateFrom, dateTo } = query;
                if (courseId)
                    matchStage.courseId = courseId;
                if (dateFrom || dateTo) {
                    matchStage.markedAt = {};
                    if (dateFrom)
                        matchStage.markedAt.$gte = new Date(dateFrom);
                    if (dateTo)
                        matchStage.markedAt.$lte = new Date(dateTo);
                }
                data = await AttendanceRecord_1.AttendanceRecord.aggregate([
                    { $match: matchStage },
                    {
                        $group: {
                            _id: '$courseId',
                            totalStudents: { $addToSet: '$studentId' },
                            totalSessions: { $addToSet: '$sessionId' },
                            attendance: {
                                $push: {
                                    studentId: '$studentId',
                                    status: '$status'
                                }
                            }
                        }
                    },
                    {
                        $project: {
                            courseId: '$_id',
                            totalStudents: { $size: '$totalStudents' },
                            totalSessions: { $size: '$totalSessions' },
                            averageAttendance: {
                                $let: {
                                    vars: {
                                        presentCount: {
                                            $size: {
                                                $filter: {
                                                    input: '$attendance',
                                                    cond: { $eq: ['$$this.status', 'present'] }
                                                }
                                            }
                                        }
                                    },
                                    in: {
                                        $multiply: [
                                            {
                                                $divide: [
                                                    '$$presentCount',
                                                    { $multiply: ['$totalStudents', '$totalSessions'] }
                                                ]
                                            },
                                            100
                                        ]
                                    }
                                }
                            },
                            _id: 0
                        }
                    }
                ]);
            }
            if (format === 'csv') {
                res.setHeader('Content-Type', 'text/csv');
                res.setHeader('Content-Disposition', `attachment; filename="${type}-report.csv"`);
                const csv = this.convertToCSV(data);
                res.send(csv);
                return;
            }
            if (format === 'xlsx') {
                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.setHeader('Content-Disposition', `attachment; filename="${type}-report.xlsx"`);
                res.json({
                    success: true,
                    data: data,
                    message: 'Excel export not implemented - returning JSON format'
                });
                return;
            }
            res.json({
                success: true,
                data
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: 'Failed to export report',
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
    convertToCSV(data) {
        if (!data || !Array.isArray(data)) {
            return '';
        }
        if (data.length === 0) {
            return '';
        }
        const headers = Object.keys(data[0]);
        const csvHeaders = headers.join(',');
        const csvRows = data.map(row => headers.map(header => {
            const value = row[header];
            return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
        }).join(','));
        return [csvHeaders, ...csvRows].join('\n');
    }
}
exports.ReportController = ReportController;
exports.reportController = new ReportController();
//# sourceMappingURL=reportController.js.map