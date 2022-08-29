import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { EXCLUDE_ROUTES } from '@/services/constants';

const FORMATTED_PUBLIC_PATHNAME = EXCLUDE_ROUTES.map(route => route + '/');

export async function middleware(request: NextRequest) {
  const { pathname: requestedPathname } = request.nextUrl;
  const url = request.nextUrl.clone();
  const token = request.cookies.get('token');
  const visitingPublicRoutes = FORMATTED_PUBLIC_PATHNAME.includes(requestedPathname);

  // public visiting admin
  if (!token && !visitingPublicRoutes) {
    url.pathname = `client${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  url.pathname = `client${url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    // public routes
    '/',
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',

    // admin routes
    '/admin'
  ]
}