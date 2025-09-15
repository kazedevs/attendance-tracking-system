import mongoose, { Schema, Document } from 'mongoose';
import { Course as CourseType } from '../types';

export interface CourseDocument extends Omit<CourseType, 'id'>, Document {}

const CourseSchema: Schema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  teacherId: { type: String, required: true, ref: 'Teacher' },
  studentIds: [{ type: String, ref: 'Student' }],
}, {
  timestamps: true,
  toJSON: {
    transform: (doc: any, ret: any) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

export const Course = mongoose.model<CourseDocument>('Course', CourseSchema);
