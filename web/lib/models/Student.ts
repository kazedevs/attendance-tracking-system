import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  _id: string;
  userId: string;
  studentId: string;
  course: string;
  semester: string;
  enrollmentDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    unique: true
  },
  studentId: {
    type: String,
    required: [true, 'Student ID is required'],
    unique: true,
    trim: true,
    match: [/^STU\d+[A-Z0-9]+$/, 'Student ID must follow the format STU followed by numbers and letters']
  },
  course: {
    type: String,
    required: [true, 'Course is required'],
    trim: true,
    maxlength: [100, 'Course name cannot be more than 100 characters']
  },
  semester: {
    type: String,
    required: [true, 'Semester is required'],
    trim: true,
    maxlength: [20, 'Semester cannot be more than 20 characters']
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for faster queries
StudentSchema.index({ studentId: 1 });
StudentSchema.index({ userId: 1 });
StudentSchema.index({ course: 1 });

export default mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema);
