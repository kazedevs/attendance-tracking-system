"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reportController_1 = require("../controllers/reportController");
const router = (0, express_1.Router)();
router.get('/attendance', reportController_1.reportController.getAttendanceSummary.bind(reportController_1.reportController));
router.get('/performance', reportController_1.reportController.getPerformanceAnalytics.bind(reportController_1.reportController));
router.get('/export', reportController_1.reportController.exportReport.bind(reportController_1.reportController));
exports.default = router;
//# sourceMappingURL=reports.js.map