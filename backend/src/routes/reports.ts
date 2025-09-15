import { Router } from 'express';
import { reportController } from '../controllers/reportController';

const router = Router();

// Reports routes
router.get('/attendance', reportController.getAttendanceSummary.bind(reportController));
router.get('/performance', reportController.getPerformanceAnalytics.bind(reportController));
router.get('/export', reportController.exportReport.bind(reportController));

export default router;
