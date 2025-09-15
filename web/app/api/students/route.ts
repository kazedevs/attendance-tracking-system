import { NextRequest, NextResponse } from 'next/server';
import { addStudentWithCredentials, getAllStudents, resetStudentPassword, deleteStudent } from '@/lib/auth-db';

// GET - Get all students
export async function GET() {
  try {
    const students = await getAllStudents();
    return NextResponse.json({ success: true, students });
  } catch (error) {
    console.error('Get students API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch students' },
      { status: 500 }
    );
  }
}

// POST - Add new student
export async function POST(request: NextRequest) {
  try {
    const { name, email, course, semester } = await request.json();

    if (!name || !email || !course || !semester) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await addStudentWithCredentials({ name, email, course, semester });
    
    return NextResponse.json({
      success: true,
      student: result.student,
      studentId: result.studentId,
      password: result.password
    });
  } catch (error) {
    console.error('Add student API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create student account' },
      { status: 500 }
    );
  }
}

// PUT - Reset student password
export async function PUT(request: NextRequest) {
  try {
    const { studentId, action } = await request.json();

    if (!studentId || action !== 'reset_password') {
      return NextResponse.json(
        { success: false, error: 'Invalid request' },
        { status: 400 }
      );
    }

    const newPassword = await resetStudentPassword(studentId);
    
    if (newPassword) {
      return NextResponse.json({
        success: true,
        password: newPassword
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Reset password API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to reset password' },
      { status: 500 }
    );
  }
}

// DELETE - Delete student
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');

    if (!studentId) {
      return NextResponse.json(
        { success: false, error: 'Student ID is required' },
        { status: 400 }
      );
    }

    const success = await deleteStudent(studentId);
    
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Delete student API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete student' },
      { status: 500 }
    );
  }
}
