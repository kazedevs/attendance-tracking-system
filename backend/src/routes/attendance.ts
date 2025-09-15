import { Router } from 'express';
import { attendanceController } from '../controllers/attendanceController';

const router = Router();

// Attendance sessions routes
router.get('/sessions', attendanceController.getAllSessions.bind(attendanceController));
router.post('/sessions', attendanceController.createSession.bind(attendanceController));
router.get('/sessions/:id', attendanceController.getSessionById.bind(attendanceController));
router.put('/sessions/:id', attendanceController.updateSession.bind(attendanceController));

// Attendance marking routes
router.post('/mark/:sessionId', attendanceController.markAttendance.bind(attendanceController));
router.get('/records', attendanceController.getAttendanceRecords.bind(attendanceController));
router.post('/records', attendanceController.saveManualAttendance.bind(attendanceController));

export default router;
