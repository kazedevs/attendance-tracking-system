import mongoose, { Schema, Document } from 'mongoose';
import { AttendanceRecord as AttendanceRecordType } from '../types';

export interface AttendanceRecordDocument extends Omit<AttendanceRecordType, 'id'>, Document {}

const AttendanceRecordSchema: Schema = new Schema({
  sessionId: { type: String, required: true, ref: 'AttendanceSession' },
  studentId: { type: String, required: true, ref: 'Student' },
  courseId: { type: String, required: true, ref: 'Course' },
  status: { type: String, enum: ['present', 'absent', 'late'], required: true },
  markedAt: { type: Date, default: Date.now },
  markedBy: { type: String, enum: ['qr', 'manual'], required: true },
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// Compound index to prevent duplicate attendance records
AttendanceRecordSchema.index({ sessionId: 1, studentId: 1 }, { unique: true });

export const AttendanceRecord = mongoose.model<AttendanceRecordDocument>('AttendanceRecord', AttendanceRecordSchema);
