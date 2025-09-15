import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import Teacher from '@/lib/models/Teacher';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { name, email, department, teacherId, password } = await request.json();

    if (!name || !email || !department || !teacherId || !password) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if teacher already exists
    const existingTeacher = await Teacher.findOne({ teacherId });
    if (existingTeacher) {
      return NextResponse.json(
        { success: false, error: 'Teacher already exists' },
        { status: 409 }
      );
    }

    // Create user account with the existing password (hash it)
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: 'teacher'
    });

    const savedUser = await user.save();

    // Create teacher profile
    const teacher = new Teacher({
      userId: savedUser._id,
      teacherId,
      department
    });

    await teacher.save();

    return NextResponse.json({
      success: true,
      message: 'Teacher migrated successfully'
    });

  } catch (error) {
    console.error('Migration API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to migrate teacher' },
      { status: 500 }
    );
  }
}
