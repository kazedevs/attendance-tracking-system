import mongoose, { Schema, Document } from 'mongoose';

export interface ITeacher extends Document {
  _id: string;
  userId: string;
  teacherId: string;
  department: string;
  subjects: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TeacherSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    unique: true
  },
  teacherId: {
    type: String,
    required: [true, 'Teacher ID is required'],
    unique: true,
    trim: true,
    match: [/^TCH\d+[A-Z0-9]+$/, 'Teacher ID must follow the format TCH followed by numbers and letters']
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true,
    maxlength: [100, 'Department name cannot be more than 100 characters']
  },
  subjects: [{
    type: Schema.Types.ObjectId,
    ref: 'Subject'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for faster queries
TeacherSchema.index({ teacherId: 1 });
TeacherSchema.index({ userId: 1 });

export default mongoose.models.Teacher || mongoose.model<ITeacher>('Teacher', TeacherSchema);
