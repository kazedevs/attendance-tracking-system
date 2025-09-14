import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function NotificationsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>Recent Activity</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today</Text>
        <View style={styles.activityItem}>
          <View style={[styles.activityIcon, { backgroundColor: '#EBF8F2' }]}>
            <FontAwesome name="check-circle" size={16} color="#2B8C4F" />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityText}>Attendance marked for Web Development</Text>
            <Text style={styles.activityTime}>10:30 AM</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Yesterday</Text>
        <View style={styles.activityItem}>
          <View style={[styles.activityIcon, { backgroundColor: '#FEE2E2' }]}>
            <FontAwesome name="times-circle" size={16} color="#E53E3E" />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityText}>Class cancelled: Database Systems</Text>
            <Text style={styles.activityTime}>3:45 PM</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>September 12</Text>
        <View style={styles.activityItem}>
          <View style={[styles.activityIcon, { backgroundColor: '#EBF8F2' }]}>
            <FontAwesome name="check-circle" size={16} color="#2B8C4F" />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityText}>Attendance marked for Mobile App Development</Text>
            <Text style={styles.activityTime}>2:15 PM</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 12,
    paddingLeft: 8,
  },
  activityItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#1A202C',
    marginBottom: 4,
    lineHeight: 20,
  },
  activityTime: {
    fontSize: 12,
    color: '#A0AEC0',
  },
});
