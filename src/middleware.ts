import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Protect all /dashboard and /quiz routes
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/quiz')) {
    const sessionToken = request.cookies.get('better-auth.session_token');
    
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/quiz/:path*'],
};
