import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useRouter } from 'expo-router';
import { authAPI } from '../services/api';

// Demo student credentials
const DEMO_CREDENTIALS = [
  { id: 'STU001', password: 'student123', name: 'John Doe', department: 'Computer Science' },
  { id: 'STU002', password: 'student123', name: 'Jane Smith', department: 'Electrical Engineering' },
  { id: 'STU003', password: 'student123', name: 'Alex Johnson', department: 'Mechanical Engineering' },
];

export default function LoginScreen() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!studentId || !password) {
      Alert.alert('Error', 'Please enter both ID and password');
      return;
    }

    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const user = DEMO_CREDENTIALS.find(
        cred => cred.id === studentId.toUpperCase() && cred.password === password
      );

      if (user) {
        // Store demo student data
        await authAPI.setToken('demo-token-' + user.id);
        await authAPI.setUserRole('student');
        await authAPI.setUserData({
          id: user.id,
          name: user.name,
          department: user.department
        });
        
        // Navigate to student dashboard
        router.replace('/(tab)/dashboard');
      } else {
        Alert.alert('Login Failed', 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during login');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-fill demo credentials
  const useDemoAccount = (index: number) => {
    const user = DEMO_CREDENTIALS[index];
    setStudentId(user.id);
    setPassword(user.password);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.header}>
            <Text style={styles.title}>Attendly</Text>
            <Text style={styles.subtitle}>Attendance Management System</Text>
          </View>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Enter ID"
              value={studentId}
              onChangeText={setStudentId}
              autoCapitalize="characters"
              placeholderTextColor="#999"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#999"
              onSubmitEditing={handleLogin}
            />

            <TouchableOpacity 
              style={[styles.button, loading && styles.buttonDisabled]} 
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>Sign In</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.demoSection}>
            <Text style={styles.demoTitle}>Quick Login (Tap to fill):</Text>
            {DEMO_CREDENTIALS.map((user, index) => (
              <TouchableOpacity 
                key={user.id}
                onPress={() => useDemoAccount(index)}
                style={styles.demoButton}
              >
                <Text style={styles.demoText}>
                  👨‍🎓 {user.name} ({user.id})
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  inner: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#2563eb',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  form: {
    width: '100%',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#0f172a',
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  demoSection: {
    marginTop: 32,
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  demoTitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  demoButton: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    backgroundColor: '#f1f5f9',
  },
  demoText: {
    fontSize: 14,
    color: '#334155',
    textAlign: 'center',
  },
});
