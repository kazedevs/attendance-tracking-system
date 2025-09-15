// Authentication system for attendance tracking
import { Teacher } from "./types";

// Admin credentials (hardcoded)
export const ADMIN_CREDENTIALS = {
  id: "admin001",
  password: "admin123",
  name: "System Administrator",
  email: "admin@attendly.com",
};

// Teacher credentials storage
interface TeacherCredentials {
  teacherId: string;
  password: string;
  teacher: Teacher;
}

// In-memory storage for teacher credentials (in production, use a proper database)
let teacherCredentialsStore: TeacherCredentials[] = [];

// Generate random password
function generatePassword(length: number = 8): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// Generate teacher ID
function generateTeacherId(): string {
  const prefix = "TCH";
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}${timestamp}${random}`;
}

// Add new teacher with generated credentials
export function addTeacherWithCredentials(
  teacherData: Omit<Teacher, "id" | "teacherId">
): {
  teacher: Teacher;
  teacherId: string;
  password: string;
} {
  const teacherId = generateTeacherId();
  const password = generatePassword();

  const teacher: Teacher = {
    ...teacherData,
    id: crypto.randomUUID(),
    teacherId,
  };

  teacherCredentialsStore.push({
    teacherId,
    password,
    teacher,
  });

  return {
    teacher,
    teacherId,
    password,
  };
}

// Authenticate user
export function authenticateUser(
  userId: string,
  password: string,
  role: "admin" | "teacher"
): {
  success: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    role: "admin" | "teacher";
    teacherId?: string;
  };
  error?: string;
} {
  if (role === "admin") {
    if (
      userId === ADMIN_CREDENTIALS.id &&
      password === ADMIN_CREDENTIALS.password
    ) {
      return {
        success: true,
        user: {
          id: "admin-001",
          name: ADMIN_CREDENTIALS.name,
          email: ADMIN_CREDENTIALS.email,
          role: "admin",
        },
      };
    }
    return { success: false, error: "Invalid admin credentials" };
  }

  if (role === "teacher") {
    const teacherCred = teacherCredentialsStore.find(
      (cred) => cred.teacherId === userId && cred.password === password
    );

    if (teacherCred) {
      return {
        success: true,
        user: {
          id: teacherCred.teacher.id,
          name: teacherCred.teacher.name,
          email: teacherCred.teacher.email,
          role: "teacher",
          teacherId: teacherCred.teacher.teacherId,
        },
      };
    }
    return { success: false, error: "Invalid teacher credentials" };
  }

  return { success: false, error: "Invalid role" };
}

// Get all teachers (for admin panel)
export function getAllTeachers(): TeacherCredentials[] {
  return [...teacherCredentialsStore];
}

// Get teacher by ID
export function getTeacherById(
  teacherId: string
): TeacherCredentials | undefined {
  return teacherCredentialsStore.find((cred) => cred.teacherId === teacherId);
}

// Reset teacher password
export function resetTeacherPassword(teacherId: string): string | null {
  const teacherIndex = teacherCredentialsStore.findIndex(
    (cred) => cred.teacherId === teacherId
  );

  if (teacherIndex === -1) return null;

  const newPassword = generatePassword();
  teacherCredentialsStore[teacherIndex].password = newPassword;
  return newPassword;
}

// Delete teacher
export function deleteTeacher(teacherId: string): boolean {
  const initialLength = teacherCredentialsStore.length;
  teacherCredentialsStore = teacherCredentialsStore.filter(
    (cred) => cred.teacherId !== teacherId
  );
  return teacherCredentialsStore.length < initialLength;
}
