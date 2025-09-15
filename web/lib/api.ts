// API configuration for both development and production
const getApiBaseUrl = () => {
  // In development, use local API routes
  if (process.env.NODE_ENV === 'development') {
    return '';
  }
  // In production, use the backend deployment URL
  return process.env.NEXT_PUBLIC_API_URL || 'https://attendance-tracking-system-54qq.onrender.com';
};

const API_BASE_URL = getApiBaseUrl();

// Type definitions for API responses
export interface AuthResponse {
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
}

export interface TeacherResponse {
  success: boolean;
  teachers?: Array<{
    _id: string;
    teacherId: string;
    department: string;
    user: {
      name: string;
      email: string;
    };
  }>;
  teacher?: {
    _id: string;
    teacherId: string;
    department: string;
    user: {
      name: string;
      email: string;
    };
  };
  teacherId?: string;
  password?: string;
  error?: string;
}

export interface ApiResponse {
  success: boolean;
  error?: string;
  password?: string;
}

export interface StudentResponse {
  success: boolean;
  students?: Array<{
    _id: string;
    studentId: string;
    course: string;
    semester: string;
    user: {
      name: string;
      email: string;
    };
  }>;
  student?: {
    _id: string;
    studentId: string;
    course: string;
    semester: string;
    user: {
      name: string;
      email: string;
    };
  };
  studentId?: string;
  password?: string;
  error?: string;
}

// API client with error handling
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Authentication
  async login(userId: string, password: string, role: 'admin' | 'teacher' | 'student'): Promise<AuthResponse> {
    return this.request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ userId, password, role }),
    });
  }

  // Teachers
  async getTeachers(): Promise<TeacherResponse> {
    return this.request<TeacherResponse>('/api/teachers');
  }

  async createTeacher(teacherData: { name: string; email: string; department: string }): Promise<TeacherResponse> {
    return this.request<TeacherResponse>('/api/teachers', {
      method: 'POST',
      body: JSON.stringify(teacherData),
    });
  }

  async resetTeacherPassword(teacherId: string): Promise<ApiResponse> {
    return this.request<ApiResponse>('/api/teachers', {
      method: 'PUT',
      body: JSON.stringify({ teacherId, action: 'reset_password' }),
    });
  }

  async deleteTeacher(teacherId: string): Promise<ApiResponse> {
    return this.request<ApiResponse>(`/api/teachers?teacherId=${teacherId}`, {
      method: 'DELETE',
    });
  }

  // Students
  async getStudents(): Promise<StudentResponse> {
    return this.request<StudentResponse>('/api/students');
  }

  async createStudent(studentData: { name: string; email: string; course: string; semester: string }): Promise<StudentResponse> {
    return this.request<StudentResponse>('/api/students', {
      method: 'POST',
      body: JSON.stringify(studentData),
    });
  }

  async resetStudentPassword(studentId: string): Promise<ApiResponse> {
    return this.request<ApiResponse>('/api/students', {
      method: 'PUT',
      body: JSON.stringify({ studentId, action: 'reset_password' }),
    });
  }

  async deleteStudent(studentId: string): Promise<ApiResponse> {
    return this.request<ApiResponse>(`/api/students?studentId=${studentId}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;
