import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.nameText}>John!</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <FontAwesome name="calendar-check-o" size={24} color="#2B8C4F" />
          </View>
          <Text style={styles.statValue}>85%</Text>
          <Text style={styles.statLabel}>Attendance</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <FontAwesome name="book" size={20} color="#2B8C4F" />
          </View>
          <Text style={styles.statValue}>5</Text>
          <Text style={styles.statLabel}>Courses</Text>
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
  }
});
