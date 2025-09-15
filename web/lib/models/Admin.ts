import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmin extends Document {
  _id: string;
  userId: string;
  adminId: string;
  permissions: string[];
  lastLogin: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    unique: true
  },
  adminId: {
    type: String,
    required: [true, 'Admin ID is required'],
    unique: true,
    trim: true,
    default: 'admin001'
  },
  permissions: [{
    type: String,
    enum: [
      'manage_users',
      'manage_teachers',
      'manage_students',
      'manage_courses',
      'view_reports',
      'system_settings'
    ]
  }],
  lastLogin: {
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
AdminSchema.index({ adminId: 1 });
AdminSchema.index({ userId: 1 });

export default mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);
