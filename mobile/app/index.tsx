import { useEffect } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { authAPI } from '../services/api';
import styles from '..//styles';

export default function Index() {
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await authAPI.getToken();
      if (token) {
        router.replace('/(tab)/dashboard');
      } else {
        router.replace('/login');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      router.replace('/login');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.campusText}>Attendly</Text>
        <ActivityIndicator size="large" color="#2B8C4F" style={{ marginTop: 20 }} />
      </View>
    </View>
  );
}
