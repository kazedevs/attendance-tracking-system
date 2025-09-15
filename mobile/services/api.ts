import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// API Configuration - Use correct IP for mobile devices
// For Android Emulator: http://10.0.2.2:5000
// For iOS Simulator: http://localhost:5000  
// For Real Device: http://[YOUR-MACHINE-IP]:5000
export const API_BASE_URL = 'https://attendance-tracking-system-54qq.onrender.com'; // Deployed backend

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      AsyncStorage.removeItem('authToken');
    }
    return Promise.reject(error);
  }
);

// API Endpoints
export const authAPI = {
  login: async (email: string, password: string) => {
    try {
      console.log('🔍 Attempting login with:', { email, url: API_BASE_URL });
      const response = await api.post('/auth/login', { email, password });
      console.log('✅ Login response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Login error:', {
        message: error.message,
        url: API_BASE_URL,
        status: error.response?.status,
        data: error.response?.data
      });
      throw error;
    }
  },

  // Student-specific login with mobile-only validation
  loginStudent: async (studentId: string, password: string) => {
    try {
      console.log('🔍 Attempting student login with:', { studentId, url: API_BASE_URL });
      const response = await api.post('/auth/student/login', { 
        studentId, 
        password,
        platform: 'mobile' // Mobile-only flag
      });
      console.log('✅ Student login response:', response.data);
      
      // Validate that this is a student account
      if (response.data.user?.role !== 'student') {
        throw new Error('Access denied: This app is for students only');
      }
      
      return response.data;
    } catch (error: any) {
      console.error('❌ Student login error:', {
        message: error.message,
        url: API_BASE_URL,
        status: error.response?.status,
        data: error.response?.data
      });
      throw error;
    }
  },

  // Student registration
  registerStudent: async (studentData: {
    studentId: string;
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    course?: string;
    semester?: string;
  }) => {
    try {
      console.log('📝 Attempting student registration:', { studentId: studentData.studentId });
      const response = await api.post('/auth/student/register', {
        ...studentData,
        platform: 'mobile' // Ensure mobile-only registration
      });
      console.log('✅ Student registration response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Student registration error:', {
        message: error.message,
        url: API_BASE_URL,
        status: error.response?.status,
        data: error.response?.data
      });
      throw error;
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userRole');
    await AsyncStorage.removeItem('userData');
    await AsyncStorage.removeItem('isMobileAuth');
  },

  getToken: async () => AsyncStorage.getItem('authToken'),
  setToken: async (token: string) => AsyncStorage.setItem('authToken', token),
  getUserRole: async () => AsyncStorage.getItem('userRole'),
  setUserRole: async (role: string) => AsyncStorage.setItem('userRole', role),
  getUserData: async () => {
    const data = await AsyncStorage.getItem('userData');
    return data ? JSON.parse(data) : null;
  },
  setUserData: async (userData: any) => AsyncStorage.setItem('userData', JSON.stringify(userData)),
  setMobileAuth: async () => AsyncStorage.setItem('isMobileAuth', 'true'),
  isMobileAuthenticated: async () => {
    const token = await AsyncStorage.getItem('authToken');
    const isMobile = await AsyncStorage.getItem('isMobileAuth');
    return !!token && isMobile === 'true';
  },

  // Validate mobile-only access
  validateMobileAccess: async () => {
    const isMobileAuth = await AsyncStorage.getItem('isMobileAuth');
    const userRole = await AsyncStorage.getItem('userRole');
    
    if (isMobileAuth !== 'true' || userRole !== 'student') {
      await authAPI.logout();
      return false;
    }
    return true;
  }
};

export const studentAPI = {
  getStudents: async (params?: any) => {
    const response = await api.get('/api/students', { params });
    return response.data;
  },
  getStudent: async (id: string) => {
    const response = await api.get(`/api/students/${id}`);
    return response.data;
  },
};

export const attendanceAPI = {
  getSessions: async (params?: any) => {
    const response = await api.get('/api/attendance/sessions', { params });
    return response.data;
  },
  createSession: async (data: any) => {
    const response = await api.post('/api/attendance/sessions', data);
    return response.data;
  },
  markAttendance: async (sessionId: string, data: any) => {
    const response = await api.post(`/api/attendance/mark/${sessionId}`, data);
    return response.data;
  },
  getMyAttendance: async (params?: any) => {
    const response = await api.get('/api/attendance/records', { params });
    return response.data;
  },
};

export const courseAPI = {
  getCourses: async (params?: any) => {
    const response = await api.get('/api/courses', { params });
    return response.data;
  },
  getCourse: async (id: string) => {
    const response = await api.get(`/api/courses/${id}`);
    return response.data;
  },
};

export default api;
