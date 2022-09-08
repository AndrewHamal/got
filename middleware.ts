import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const token = request.cookies.get('token');

  // login
  if (url.pathname === '/superadmin/login') {
    if (token) {
      url.pathname = '/superadmin'
      return NextResponse.redirect(url);
    } else {
      return NextResponse.next();
    }
  }

  // superadmin
  if (url.pathname.includes('/superadmin')) {
    if (token) {
      return NextResponse.next();
    } else {
      url.pathname = '/'
      return NextResponse.redirect(url);
    }
  }

  url.pathname = `client${url.pathname}`;

  return NextResponse.rewrite(url);

}

export const config = {
  matcher: [
    // public routes
    '/',
    '/blogs',
    '/blogs/detail',
    '/contact',
    '/register',
    '/destinations/:path',
    '/blogs',
    '/blogs/:path',
    '/our_team',
    '/videos',

    // admin routes
    '/superadmin/login',
    '/superadmin',
  ]
}