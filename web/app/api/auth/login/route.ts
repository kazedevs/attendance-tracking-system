import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser, initializeAdmin } from '@/lib/auth-db';

export async function POST(request: NextRequest) {
  try {
    const { userId, password, role } = await request.json();

    if (!userId || !password || !role) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Initialize admin if this is the first run
    if (role === 'admin') {
      await initializeAdmin();
    }

    const result = await authenticateUser(userId, password, role);

    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(result, { status: 401 });
    }
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
