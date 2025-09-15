import connectDB from './mongodb';
import User, { IUser } from './models/User';
import Teacher, { ITeacher } from './models/Teacher';
import Student, { IStudent } from './models/Student';
import Admin, { IAdmin } from './models/Admin';
import bcrypt from 'bcryptjs';

// Generate random password
function generatePassword(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// Generate teacher ID
function generateTeacherId(): string {
  const prefix = 'TCH';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}${timestamp}${random}`;
}

// Generate student ID
function generateStudentId(): string {
  const prefix = 'STU';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}${timestamp}${random}`;
}

// Initialize admin user if not exists
export async function initializeAdmin(): Promise<void> {
  try {
    await connectDB();
    
    const existingAdmin = await User.findOne({ email: 'admin@attendly.com' });
    if (!existingAdmin) {
      const adminUser = new User({
        name: 'System Administrator',
        email: 'admin@attendly.com',
        password: 'admin123',
        role: 'admin'
      });
      
      const savedUser = await adminUser.save();
      
      const adminProfile = new Admin({
        userId: savedUser._id,
        adminId: 'admin001',
        permissions: [
          'manage_users',
          'manage_teachers',
          'manage_students',
          'manage_courses',
          'view_reports',
          'system_settings'
        ]
      });
      
      await adminProfile.save();
      console.log('Admin user initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing admin:', error);
  }
}

// Add new teacher with generated credentials
export async function addTeacherWithCredentials(teacherData: {
  name: string;
  email: string;
  department: string;
}): Promise<{
  teacher: ITeacher & { user: IUser };
  teacherId: string;
  password: string;
}> {
  try {
    await connectDB();
    
    const teacherId = generateTeacherId();
    const password = generatePassword();
    
    // Create user account
    const user = new User({
      name: teacherData.name,
      email: teacherData.email,
      password: password,
      role: 'teacher'
    });
    
    const savedUser = await user.save();
    
    // Create teacher profile
    const teacher = new Teacher({
      userId: savedUser._id,
      teacherId: teacherId,
      department: teacherData.department
    });
    
    const savedTeacher = await teacher.save();
    
    // Populate user data
    const populatedTeacher = await Teacher.findById(savedTeacher._id).populate('userId') as ITeacher & { userId: IUser };
    
    return {
      teacher: {
        ...populatedTeacher.toObject(),
        user: populatedTeacher.userId
      } as ITeacher & { user: IUser },
      teacherId,
      password
    };
  } catch (error) {
    console.error('Error adding teacher:', error);
    throw new Error('Failed to create teacher account');
  }
}

// Add new student with generated credentials
export async function addStudentWithCredentials(studentData: {
  name: string;
  email: string;
  course: string;
  semester: string;
}): Promise<{
  student: IStudent & { user: IUser };
  studentId: string;
  password: string;
}> {
  try {
    await connectDB();
    
    const studentId = generateStudentId();
    const password = generatePassword();
    
    // Create user account
    const user = new User({
      name: studentData.name,
      email: studentData.email,
      password: password,
      role: 'student'
    });
    
    const savedUser = await user.save();
    
    // Create student profile
    const student = new Student({
      userId: savedUser._id,
      studentId: studentId,
      course: studentData.course,
      semester: studentData.semester
    });
    
    const savedStudent = await student.save();
    
    // Populate user data
    const populatedStudent = await Student.findById(savedStudent._id).populate('userId') as IStudent & { userId: IUser };
    
    return {
      student: {
        ...populatedStudent.toObject(),
        user: populatedStudent.userId
      } as IStudent & { user: IUser },
      studentId,
      password
    };
  } catch (error) {
    console.error('Error adding student:', error);
    throw new Error('Failed to create student account');
  }
}

// Authenticate user
export async function authenticateUser(userId: string, password: string, role: 'admin' | 'teacher' | 'student'): Promise<{
  success: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'teacher' | 'student';
    profileId?: string;
    teacherId?: string;
    studentId?: string;
  };
  error?: string;
}> {
  try {
    await connectDB();
    
    if (role === 'admin') {
      const admin = await Admin.findOne({ adminId: userId }).populate('userId');
      if (!admin) {
        return { success: false, error: 'Invalid admin credentials' };
      }
      
      const user = admin.userId as IUser;
      const isValidPassword = await user.comparePassword(password);
      
      if (isValidPassword) {
        // Update last login
        admin.lastLogin = new Date();
        await admin.save();
        
        return {
          success: true,
          user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: 'admin',
            profileId: admin._id.toString()
          }
        };
      }
      return { success: false, error: 'Invalid admin credentials' };
    }
    
    if (role === 'teacher') {
      const teacher = await Teacher.findOne({ teacherId: userId }).populate('userId');
      if (!teacher) {
        return { success: false, error: 'Invalid teacher credentials' };
      }
      
      const user = teacher.userId as IUser;
      const isValidPassword = await user.comparePassword(password);
      
      if (isValidPassword) {
        return {
          success: true,
          user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: 'teacher',
            profileId: teacher._id.toString(),
            teacherId: teacher.teacherId
          }
        };
      }
      return { success: false, error: 'Invalid teacher credentials' };
    }
    
    if (role === 'student') {
      const student = await Student.findOne({ studentId: userId }).populate('userId');
      if (!student) {
        return { success: false, error: 'Invalid student credentials' };
      }
      
      const user = student.userId as IUser;
      const isValidPassword = await user.comparePassword(password);
      
      if (isValidPassword) {
        return {
          success: true,
          user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: 'student',
            profileId: student._id.toString(),
            studentId: student.studentId
          }
        };
      }
      return { success: false, error: 'Invalid student credentials' };
    }
    
    return { success: false, error: 'Invalid role' };
  } catch (error) {
    console.error('Authentication error:', error);
    return { success: false, error: 'Authentication failed' };
  }
}

// Get all teachers
export async function getAllTeachers(): Promise<Array<ITeacher & { user: IUser }>> {
  try {
    await connectDB();
    const teachers = await Teacher.find({ isActive: true }).populate('userId');
    return teachers.map(teacher => ({
      ...teacher.toObject(),
      user: teacher.userId as IUser
    })) as Array<ITeacher & { user: IUser }>;
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return [];
  }
}

// Get all students
export async function getAllStudents(): Promise<Array<IStudent & { user: IUser }>> {
  try {
    await connectDB();
    const students = await Student.find({ isActive: true }).populate('userId');
    return students.map(student => ({
      ...student.toObject(),
      user: student.userId as IUser
    })) as Array<IStudent & { user: IUser }>;
  } catch (error) {
    console.error('Error fetching students:', error);
    return [];
  }
}

// Reset teacher password
export async function resetTeacherPassword(teacherId: string): Promise<string | null> {
  try {
    await connectDB();
    
    const teacher = await Teacher.findOne({ teacherId }).populate('userId');
    if (!teacher) return null;
    
    const newPassword = generatePassword();
    const user = teacher.userId as IUser;
    
    // Hash the new password
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    
    return newPassword;
  } catch (error) {
    console.error('Error resetting teacher password:', error);
    return null;
  }
}

// Reset student password
export async function resetStudentPassword(studentId: string): Promise<string | null> {
  try {
    await connectDB();
    
    const student = await Student.findOne({ studentId }).populate('userId');
    if (!student) return null;
    
    const newPassword = generatePassword();
    const user = student.userId as IUser;
    
    // Hash the new password
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    
    return newPassword;
  } catch (error) {
    console.error('Error resetting student password:', error);
    return null;
  }
}

// Delete teacher
export async function deleteTeacher(teacherId: string): Promise<boolean> {
  try {
    await connectDB();
    
    const teacher = await Teacher.findOne({ teacherId });
    if (!teacher) return false;
    
    // Soft delete - mark as inactive
    teacher.isActive = false;
    await teacher.save();
    
    // Also deactivate user account
    await User.findByIdAndUpdate(teacher.userId, { isActive: false });
    
    return true;
  } catch (error) {
    console.error('Error deleting teacher:', error);
    return false;
  }
}

// Delete student
export async function deleteStudent(studentId: string): Promise<boolean> {
  try {
    await connectDB();
    
    const student = await Student.findOne({ studentId });
    if (!student) return false;
    
    // Soft delete - mark as inactive
    student.isActive = false;
    await student.save();
    
    // Also deactivate user account
    await User.findByIdAndUpdate(student.userId, { isActive: false });
    
    return true;
  } catch (error) {
    console.error('Error deleting student:', error);
    return false;
  }
}
