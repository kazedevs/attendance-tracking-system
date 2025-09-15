export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'teacher' | 'student';
    createdAt: Date;
    updatedAt: Date;
}
export interface Student extends User {
    studentId: string;
    courseIds: string[];
    attendanceRecords?: AttendanceRecord[];
}
export interface Teacher extends User {
    teacherId: string;
    department: string;
    courseIds: string[];
}
export interface Course {
    id: string;
    name: string;
    code: string;
    description: string;
    teacherId: string;
    studentIds: string[];
    createdAt: Date;
    updatedAt: Date;
}
export interface AttendanceSession {
    id: string;
    courseId: string;
    teacherId: string;
    sessionName: string;
    startTime: Date;
    endTime?: Date;
    qrCode: string;
    isActive: boolean;
    createdAt: Date;
}
export interface AttendanceRecord {
    id: string;
    sessionId: string;
    studentId: string;
    courseId: string;
    status: 'present' | 'absent' | 'late';
    markedAt: Date;
    markedBy: 'qr' | 'manual';
}
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}
export interface PaginationQuery {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
}
export interface StudentQuery extends PaginationQuery {
    courseId?: string;
    search?: string;
}
export interface TeacherQuery extends PaginationQuery {
    department?: string;
    search?: string;
}
export interface CourseQuery extends PaginationQuery {
    teacherId?: string;
    search?: string;
}
export interface AttendanceQuery extends PaginationQuery {
    sessionId?: string;
    studentId?: string;
    courseId?: string;
    teacherId?: string;
    dateFrom?: string;
    dateTo?: string;
}
export interface ReportQuery {
    type: 'attendance' | 'performance';
    courseId?: string;
    studentId?: string;
    teacherId?: string;
    dateFrom?: string;
    dateTo?: string;
    format?: 'json' | 'csv' | 'xlsx';
}
export interface CreateStudentDto {
    email: string;
    name: string;
    studentId: string;
    courseIds?: string[];
    password: string;
}
export interface CreateTeacherDto {
    email: string;
    name: string;
    teacherId: string;
    department: string;
    courseIds?: string[];
    password: string;
}
export interface CreateCourseDto {
    name: string;
    code: string;
    description: string;
    teacherId: string;
    studentIds?: string[];
}
export interface CreateAttendanceSessionDto {
    courseId: string;
    sessionName: string;
    startTime: Date;
    teacherId?: string;
}
export interface MarkAttendanceDto {
    sessionId: string;
    studentId: string;
    status: 'present' | 'absent' | 'late';
    markedBy: 'qr' | 'manual';
}
export interface LoginDto {
    email: string;
    password: string;
}
export interface AuthResponse {
    user: User;
    token: string;
}
//# sourceMappingURL=index.d.ts.map