import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// API Configuration - Use correct IP for mobile devices
// For Android Emulator: http://10.0.2.2:5000
// For iOS Simulator: http://localhost:5000  
// For Real Device: http://[YOUR-MACHINE-IP]:5000
export const API_BASE_URL = 'http://10.0.2.2:5000'; // Android emulator fix

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
  logout: async () => {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userRole');
  },
  getToken: async () => AsyncStorage.getItem('authToken'),
  setToken: async (token: string) => AsyncStorage.setItem('authToken', token),
  getUserRole: async () => AsyncStorage.getItem('userRole'),
  setUserRole: async (role: string) => AsyncStorage.setItem('userRole', role),
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
