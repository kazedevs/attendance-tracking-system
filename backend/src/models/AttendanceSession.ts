import mongoose, { Schema, Document } from 'mongoose';
import { AttendanceSession as AttendanceSessionType } from '../types';

export interface AttendanceSessionDocument extends Omit<AttendanceSessionType, 'id'>, Document {}

const AttendanceSessionSchema: Schema = new Schema({
  courseId: { type: String, required: true, ref: 'Course' },
  teacherId: { type: String, required: true, ref: 'Teacher' },
  sessionName: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  qrCode: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true },
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

export const AttendanceSession = mongoose.model<AttendanceSessionDocument>('AttendanceSession', AttendanceSessionSchema);
