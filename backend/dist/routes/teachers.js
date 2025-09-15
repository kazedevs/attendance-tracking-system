"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teacherController_1 = require("../controllers/teacherController");
const router = (0, express_1.Router)();
router.get('/', teacherController_1.teacherController.getAllTeachers.bind(teacherController_1.teacherController));
router.post('/', teacherController_1.teacherController.createTeacher.bind(teacherController_1.teacherController));
router.get('/:id', teacherController_1.teacherController.getTeacherById.bind(teacherController_1.teacherController));
router.put('/:id', teacherController_1.teacherController.updateTeacher.bind(teacherController_1.teacherController));
router.delete('/:id', teacherController_1.teacherController.deleteTeacher.bind(teacherController_1.teacherController));
exports.default = router;
//# sourceMappingURL=teachers.js.map