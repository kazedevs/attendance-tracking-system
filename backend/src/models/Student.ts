import mongoose, { Schema, Document } from 'mongoose';
import { Student as StudentType } from '../types';

export interface StudentDocument extends Omit<StudentType, 'id'>, Document {
  password: string;
}

const StudentSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'student' },
  studentId: { type: String, required: true, unique: true },
  courseIds: [{ type: String, ref: 'Course' }],
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      return ret;
    }
  }
});

export const Student = mongoose.model<StudentDocument>('Student', StudentSchema);
