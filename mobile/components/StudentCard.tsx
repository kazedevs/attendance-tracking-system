import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import React from 'react';

const { width } = Dimensions.get('window');

type StudentCardProps = {
  name: string;
  course: string;
  semester: string | number;
  studentId: string;
  section: string;
  imageUrl?: string;
  universityName?: string;
  validThru?: string;
};

const StudentCard: React.FC<StudentCardProps> = ({
  name,
  course,
  semester,
  studentId,
  section,
  imageUrl = 'https://randomuser.me/api/portraits/men/1.jpg',
  universityName = 'UNIVERSITY NAME',
  validThru = '12/2025',
}) => {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.universityName}>{universityName}</Text>
        <Text style={styles.idText}>STUDENT ID CARD</Text>
      </View>
      
      {/* Content */}
      <View style={styles.content}>
        <View style={styles.photoFrame}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.photo}
            resizeMode="cover"
          />
        </View>
        
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>NAME</Text>
            <Text style={styles.detailValue}>{name.toUpperCase()}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>ID NUMBER</Text>
            <Text style={styles.detailValue}>{studentId}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>COURSE</Text>
            <Text style={styles.detailValue}>{course.toUpperCase()}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>SEMESTER</Text>
              <Text style={styles.detailValue}>{semester}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>SECTION</Text>
              <Text style={styles.detailValue}>{section}</Text>
            </View>
          </View>
        </View>
      </View>
      
    </View>
  );
};

const CARD_WIDTH = width * 0.95;
const CARD_HEIGHT = CARD_WIDTH * 0.7;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  header: {
    backgroundColor: '#1a365d',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2c5282',
  },
  universityName: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  idText: {
    color: '#fff',
    fontSize: 10,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    padding: 12,
  },
  photoFrame: {
    width: 100,
    height: 120,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#d0d0d0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: 15,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
  },
  detailItem: {
    marginBottom: 6,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 10,
    color: '#666',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 12,
    color: '#000',
    fontWeight: '600',
    marginTop: 2,
  },
  footer: {
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    padding: 6,
    alignItems: 'center',
  },
  barcodeContainer: {
    alignItems: 'center',
  },
  barcode: {
    flexDirection: 'row',
    height: 20,
    marginBottom: 2,
    justifyContent: 'center',
  },
  bar: {
    width: 2,
    backgroundColor: '#000',
    marginHorizontal: 1,
  },
  barcodeText: {
    fontSize: 8,
    letterSpacing: 4,
    fontWeight: 'bold',
  },
});

export default StudentCard;
