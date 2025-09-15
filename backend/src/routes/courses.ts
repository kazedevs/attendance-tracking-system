import { Router } from 'express';
import { courseController } from '../controllers/courseController';

const router = Router();

// Courses routes - CRUD operations
router.get('/', courseController.getAllCourses.bind(courseController));
router.post('/', courseController.createCourse.bind(courseController));
router.get('/:id', courseController.getCourseById.bind(courseController));
router.put('/:id', courseController.updateCourse.bind(courseController));
router.delete('/:id', courseController.deleteCourse.bind(courseController));

export default router;
