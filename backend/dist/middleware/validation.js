"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMarkAttendance = exports.validateCreateAttendanceSession = exports.validateCreateCourse = exports.validateCreateTeacher = exports.validateCreateStudent = exports.validateRequest = void 0;
const express_validator_1 = require("express-validator");
const validateRequest = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
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
exports.validateRequest = validateRequest;
exports.validateCreateStudent = [
    (0, express_validator_1.body)('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    (0, express_validator_1.body)('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    (0, express_validator_1.body)('studentId').trim().isLength({ min: 3 }).withMessage('Student ID must be at least 3 characters'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    (0, express_validator_1.body)('courseIds').optional().isArray().withMessage('Course IDs must be an array')
];
exports.validateCreateTeacher = [
    (0, express_validator_1.body)('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    (0, express_validator_1.body)('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    (0, express_validator_1.body)('teacherId').trim().isLength({ min: 3 }).withMessage('Teacher ID must be at least 3 characters'),
    (0, express_validator_1.body)('department').trim().isLength({ min: 2 }).withMessage('Department must be at least 2 characters'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    (0, express_validator_1.body)('courseIds').optional().isArray().withMessage('Course IDs must be an array')
];
exports.validateCreateCourse = [
    (0, express_validator_1.body)('name').trim().isLength({ min: 3 }).withMessage('Course name must be at least 3 characters'),
    (0, express_validator_1.body)('code').trim().isLength({ min: 3 }).withMessage('Course code must be at least 3 characters'),
    (0, express_validator_1.body)('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
    (0, express_validator_1.body)('teacherId').isMongoId().withMessage('Valid teacher ID is required'),
    (0, express_validator_1.body)('studentIds').optional().isArray().withMessage('Student IDs must be an array')
];
exports.validateCreateAttendanceSession = [
    (0, express_validator_1.body)('courseId').isMongoId().withMessage('Valid course ID is required'),
    (0, express_validator_1.body)('sessionName').trim().isLength({ min: 3 }).withMessage('Session name must be at least 3 characters'),
    (0, express_validator_1.body)('startTime').isISO8601().withMessage('Valid start time is required')
];
exports.validateMarkAttendance = [
    (0, express_validator_1.body)('studentId').isMongoId().withMessage('Valid student ID is required'),
    (0, express_validator_1.body)('status').isIn(['present', 'absent', 'late']).withMessage('Status must be present, absent, or late'),
    (0, express_validator_1.body)('markedBy').isIn(['qr', 'manual']).withMessage('Marked by must be qr or manual')
];
//# sourceMappingURL=validation.js.map