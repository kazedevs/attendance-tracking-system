import { Router } from 'express';
import { studentController } from '../controllers/studentController';

const router = Router();

// Public routes
router.post('/login', studentController.login.bind(studentController));

// Protected routes - CRUD operations
router.get('/', studentController.getAllStudents.bind(studentController));
router.post('/', studentController.createStudent.bind(studentController));
router.get('/:id', studentController.getStudentById.bind(studentController));
router.put('/:id', studentController.updateStudent.bind(studentController));
router.delete('/:id', studentController.deleteStudent.bind(studentController));

export default router;
