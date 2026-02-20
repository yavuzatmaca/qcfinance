import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Protect /stats route (but not /stats/login)
  if (request.nextUrl.pathname.startsWith('/stats') && 
      !request.nextUrl.pathname.startsWith('/stats/login')) {
    const authCookie = request.cookies.get('stats-auth');
    
    if (!authCookie || authCookie.value !== 'authenticated') {
      const loginUrl = new URL('/stats/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/stats/:path*',
};
