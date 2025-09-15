"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attendanceController_1 = require("../controllers/attendanceController");
const router = (0, express_1.Router)();
router.get('/sessions', attendanceController_1.attendanceController.getAllSessions.bind(attendanceController_1.attendanceController));
router.post('/sessions', attendanceController_1.attendanceController.createSession.bind(attendanceController_1.attendanceController));
router.get('/sessions/:id', attendanceController_1.attendanceController.getSessionById.bind(attendanceController_1.attendanceController));
router.put('/sessions/:id', attendanceController_1.attendanceController.updateSession.bind(attendanceController_1.attendanceController));
router.post('/mark/:sessionId', attendanceController_1.attendanceController.markAttendance.bind(attendanceController_1.attendanceController));
router.get('/records', attendanceController_1.attendanceController.getAttendanceRecords.bind(attendanceController_1.attendanceController));
router.post('/records', attendanceController_1.attendanceController.saveManualAttendance.bind(attendanceController_1.attendanceController));
exports.default = router;
//# sourceMappingURL=attendance.js.map