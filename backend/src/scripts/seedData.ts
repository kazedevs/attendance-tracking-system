import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Student } from '../models/Student';
import { Teacher } from '../models/Teacher';
import { Course } from '../models/Course';
import bcrypt from 'bcryptjs';

// Load environment variables
dotenv.config();

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/attendance-tracking';
    await mongoose.connect(mongoUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('✅ MongoDB connected successfully');

    // Clear existing data
    await Student.deleteMany({});
    await Teacher.deleteMany({});
    await Course.deleteMany({});

    console.log('🧹 Cleared existing data');

    // Create Admin Teacher
    const adminTeacher = new Teacher({
      name: 'Admin User',
      email: 'admin001@example.com',
      teacherId: 'admin001',
      department: 'Administration',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin',
      courseIds: []
    });
    await adminTeacher.save();
    console.log('👨‍💼 Admin created:', adminTeacher.email);

    // Create Regular Teacher
    const regularTeacher = new Teacher({
      name: 'John Smith',
      email: 'teacher001@example.com',
      teacherId: 'teacher001',
      department: 'Computer Science',
      password: await bcrypt.hash('teacher123', 10),
      role: 'teacher',
      courseIds: []
    });
    await regularTeacher.save();
    console.log('👨‍🏫 Teacher created:', regularTeacher.email);

    // Create Students
    const students = [
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        studentId: 'S001',
        password: await bcrypt.hash('student123', 10),
        courseIds: []
      },
      {
        name: 'Bob Williams',
        email: 'bob@example.com',
        studentId: 'S002',
        password: await bcrypt.hash('student123', 10),
        courseIds: []
      },
      {
        name: 'Charlie Brown',
        email: 'charlie@example.com',
        studentId: 'S003',
        password: await bcrypt.hash('student123', 10),
        courseIds: []
      }
    ];

    const createdStudents = await Student.insertMany(students);
    console.log('👥 Students created:', createdStudents.length);

    // Create Courses
    const courses = [
      {
        name: 'Introduction to Computer Science',
        code: 'CS101',
        description: 'Fundamental concepts of computer science and programming',
        teacherId: regularTeacher._id,
        studentIds: createdStudents.map(s => s._id)
      },
      {
        name: 'Data Structures and Algorithms',
        code: 'CS201',
        description: 'Advanced data structures and algorithmic problem solving',
        teacherId: regularTeacher._id,
        studentIds: [createdStudents[0]!._id, createdStudents[1]!._id]
      }
    ];

    const createdCourses = await Course.insertMany(courses);
    console.log('📚 Courses created:', createdCourses.length);

    // Update teacher with course IDs
    regularTeacher.courseIds = createdCourses.map(c => c._id) as any;
    await regularTeacher.save();

    // Update students with course IDs
    for (const student of createdStudents) {
      const enrolledCourses = createdCourses.filter(course => 
        course.studentIds.some(id => id.toString() === student._id.toString())
      );
      student.courseIds = enrolledCourses.map(course => course._id) as any;
      await student.save();
    }

    console.log('✅ Database seeded successfully!');
    console.log('');
    console.log('🔑 Login Credentials:');
    console.log('Admin: admin001@example.com / admin123');
    console.log('Teacher: teacher001@example.com / teacher123');
    console.log('Students: alice@example.com, bob@example.com, charlie@example.com / student123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seedData();
