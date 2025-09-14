import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import React from "react";
import StudentCard from "../../components/StudentCard";
import { Text } from "react-native";

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  // Sample student data - replace with actual data from your state/context/API
  const studentData = {
    name: "John Alexander Doe",
    course: "Computer Science & Engineering",
    semester: 6,
    studentId: "CS2023001",
    section: "A",
    imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    universityName: "Assam Down Town University",
    validThru: "12/2025"
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Student Profile</Text>
      </View>
      
      <View style={[styles.cardContainer, { width: width * 0.95 }]}>
        <StudentCard 
          name={studentData.name}
          course={studentData.course}
          semester={studentData.semester}
          studentId={studentData.studentId}
          section={studentData.section}
          imageUrl={studentData.imageUrl}
          universityName={studentData.universityName}
        />
      </View>
      
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Student Information</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Department</Text>
            <Text style={styles.infoValue}>Computer Science</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Batch</Text>
            <Text style={styles.infoValue}>2022 - 2026</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Contact</Text>
            <Text style={styles.infoValue}>+1 234 567 8900</Text>
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
  header: {
    marginBottom: 10,
    paddingHorizontal: 16,
    width: '100%',
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 20,
  },
  scrollContent: {
    alignItems: 'center',
    paddingTop: 0,
  },
  cardContainer: {
    width: width * 0.9,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  infoSection: {
    width: width * 0.9,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a365d',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 8,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoItem: {
    width: '48%',
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2d3748',
  },
});
