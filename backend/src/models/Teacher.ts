import mongoose, { Schema, Document } from 'mongoose';
import { Teacher as TeacherType } from '../types';

export interface TeacherDocument extends Omit<TeacherType, 'id'>, Document {
  password: string;
}

const TeacherSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'teacher' },
  teacherId: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  courseIds: [{ type: String, ref: 'Course' }],
}, {
  timestamps: true,
  toJSON: {
    transform: (doc: any, ret: any) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      return ret;
    }
  }
});

export const Teacher = mongoose.model<TeacherDocument>('Teacher', TeacherSchema);
