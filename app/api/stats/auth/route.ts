import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Fallback password if env var is not set or has issues
const STATS_PASSWORD = (process.env.STATS_PASSWORD || '145314').trim().replace(/[\r\n]/g, '');

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password === STATS_PASSWORD) {
      cookies().set('stats-auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE() {
  cookies().delete('stats-auth');
  return NextResponse.json({ success: true });
}
