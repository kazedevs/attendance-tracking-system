"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const courseController_1 = require("../controllers/courseController");
const router = (0, express_1.Router)();
router.get('/', courseController_1.courseController.getAllCourses.bind(courseController_1.courseController));
router.post('/', courseController_1.courseController.createCourse.bind(courseController_1.courseController));
router.get('/:id', courseController_1.courseController.getCourseById.bind(courseController_1.courseController));
router.put('/:id', courseController_1.courseController.updateCourse.bind(courseController_1.courseController));
router.delete('/:id', courseController_1.courseController.deleteCourse.bind(courseController_1.courseController));
exports.default = router;
//# sourceMappingURL=courses.js.map