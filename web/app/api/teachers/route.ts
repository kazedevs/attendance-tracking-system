import { NextRequest, NextResponse } from 'next/server';
import { addTeacherWithCredentials, getAllTeachers, resetTeacherPassword, deleteTeacher } from '@/lib/auth-db';

// GET - Get all teachers
export async function GET() {
  try {
    const teachers = await getAllTeachers();
    return NextResponse.json({ success: true, teachers });
  } catch (error) {
    console.error('Get teachers API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch teachers' },
      { status: 500 }
    );
  }
}

// POST - Add new teacher
export async function POST(request: NextRequest) {
  try {
    const { name, email, department } = await request.json();

    if (!name || !email || !department) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await addTeacherWithCredentials({ name, email, department });
    
    return NextResponse.json({
      success: true,
      teacher: result.teacher,
      teacherId: result.teacherId,
      password: result.password
    });
  } catch (error) {
    console.error('Add teacher API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create teacher account' },
      { status: 500 }
    );
  }
}

// PUT - Reset teacher password
export async function PUT(request: NextRequest) {
  try {
    const { teacherId, action } = await request.json();

    if (!teacherId || action !== 'reset_password') {
      return NextResponse.json(
        { success: false, error: 'Invalid request' },
        { status: 400 }
      );
    }

    const newPassword = await resetTeacherPassword(teacherId);
    
    if (newPassword) {
      return NextResponse.json({
        success: true,
        password: newPassword
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Teacher not found' },
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

// DELETE - Delete teacher
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const teacherId = searchParams.get('teacherId');

    if (!teacherId) {
      return NextResponse.json(
        { success: false, error: 'Teacher ID is required' },
        { status: 400 }
      );
    }

    const success = await deleteTeacher(teacherId);
    
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: 'Teacher not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Delete teacher API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete teacher' },
      { status: 500 }
    );
  }
}
