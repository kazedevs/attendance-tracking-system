"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentController_1 = require("../controllers/studentController");
const router = (0, express_1.Router)();
router.get('/', studentController_1.studentController.getAllStudents.bind(studentController_1.studentController));
router.post('/', studentController_1.studentController.createStudent.bind(studentController_1.studentController));
router.get('/:id', studentController_1.studentController.getStudentById.bind(studentController_1.studentController));
router.put('/:id', studentController_1.studentController.updateStudent.bind(studentController_1.studentController));
router.delete('/:id', studentController_1.studentController.deleteStudent.bind(studentController_1.studentController));
exports.default = router;
//# sourceMappingURL=students.js.map