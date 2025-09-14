import { useEffect } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import styles from '..//styles';



export default function Index() {

  useEffect(() => {
    // Navigate to tabs after 2 seconds
    const timer = setTimeout(() => {
      router.replace('/(tab)/dashboard');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.campusText}>Attendly</Text>
        <ActivityIndicator size="large" color="#2B8C4F" style={{ marginTop: 20 }} />
      </View>
    </View>
  );
}
