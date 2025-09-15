import { View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { studentAPI, courseAPI } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Student {
  _id: string;
  name: string;
  email: string;
  studentId: string;
  courseIds: string[];
}

interface Course {
  _id: string;
  name: string;
  code: string;
  description: string;
  studentIds: string[];
}

interface AttendanceRecord {
  _id: string;
  status: 'present' | 'absent' | 'late';
  markedAt: string;
}

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const [userData, setUserData] = useState<Student | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [attendance, setAttendance] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Get student profile
      const profileResponse = await studentAPI.getStudents({ email: 'alice@example.com' });
      if (profileResponse.success && profileResponse.data.students?.length > 0) {
        setUserData(profileResponse.data.students[0] as Student);
      }

      // Get all courses and filter for student
      const coursesResponse = await courseAPI.getCourses();
      if (coursesResponse.success) {
        const allCourses = coursesResponse.data.courses as Course[] || [];
        // For demo, show all courses (in real app, filter by student enrollment)
        setCourses(allCourses);
      }

      // Get attendance records (placeholder - would need proper endpoint)
      setAttendance({ records: [] });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#2B8C4F" />
      </View>
    );
  }

  const userName = userData?.name || 'Student';
  const courseCount = courses.length;
  const totalClasses = attendance?.records?.length || 0;
  const presentClasses = attendance?.records?.filter((r: any) => r.status === 'present')?.length || 0;
  const attendancePercentage = totalClasses > 0 ? Math.round((presentClasses / totalClasses) * 100) : 0;

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.nameText}>{userName}!</Text>
        <Text style={styles.studentId}>Student ID: S001</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <FontAwesome name="calendar-check-o" size={24} color="#2B8C4F" />
          </View>
          <Text style={styles.statValue}>{attendancePercentage}%</Text>
          <Text style={styles.statLabel}>Attendance</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <FontAwesome name="book" size={20} color="#2B8C4F" />
          </View>
          <Text style={styles.statValue}>{courseCount}</Text>
          <Text style={styles.statLabel}>Courses</Text>
        </View>
      </View>

      {courses.length > 0 && (
        <View style={styles.coursesContainer}>
          <Text style={styles.sectionTitle}>Your Courses</Text>
          {courses.map((course) => (
            <View key={course._id} style={styles.courseCard}>
              <Text style={styles.courseName}>{course.name}</Text>
              <Text style={styles.courseCode}>{course.code}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 25,
  },
  welcomeText: {
    fontSize: 18,
    color: '#4A5568',
  },
  nameText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A202C',
    marginTop: 5,
  },
  studentId: {
    fontSize: 14,
    color: '#718096',
    marginTop: 5,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statIcon: {
    backgroundColor: '#EBF8F2',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 14,
    color: '#718096',
  },
  coursesContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 15,
  },
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  courseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A202C',
  },
  courseCode: {
    fontSize: 14,
    color: '#718096',
    marginTop: 2,
  }
});
