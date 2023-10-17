import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const sessionToken = request.cookies.get('next-auth.session-token')
  if (!sessionToken) return NextResponse.redirect(new URL('/login', request.url))
  else return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/', '/accounts/', '/movements/', '/clients/', '/agents/', '/verify_email/', '/profile/']
}
