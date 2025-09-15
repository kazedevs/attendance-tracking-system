import { Router } from 'express';
import { teacherController } from '../controllers/teacherController';

const router = Router();

// Teachers routes - CRUD operations
router.get('/', teacherController.getAllTeachers.bind(teacherController));
router.post('/', teacherController.createTeacher.bind(teacherController));
router.get('/:id', teacherController.getTeacherById.bind(teacherController));
router.put('/:id', teacherController.updateTeacher.bind(teacherController));
router.delete('/:id', teacherController.deleteTeacher.bind(teacherController));

export default router;
