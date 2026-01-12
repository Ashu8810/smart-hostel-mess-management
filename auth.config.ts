import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    trustHost: true,
    pages: {
        signIn: '/login',
    },
    providers: [],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/admin') ||
                nextUrl.pathname.startsWith('/warden') ||
                nextUrl.pathname.startsWith('/student');

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                if (nextUrl.pathname === '/login' || nextUrl.pathname === '/register') {
                    const role = (auth.user as any).role;
                    if (role === 'WARDEN') return Response.redirect(new URL('/warden', nextUrl));
                    if (role === 'ADMIN') return Response.redirect(new URL('/admin', nextUrl));
                    return Response.redirect(new URL('/student', nextUrl));
                }
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                (session.user as any).role = token.role;
            }
            return session;
        }
    },
} satisfies NextAuthConfig;
