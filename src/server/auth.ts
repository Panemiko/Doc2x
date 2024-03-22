import { env } from "@/env";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Google } from "arctic";
import { Lucia } from "lucia";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { db } from "./db";

export const google = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  `${env.VERCEL_URL}/api/auth/google/callback`,
);

const adapter = new PrismaAdapter(db.session, db.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    // this sets cookies with super long expiration
    // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    expires: false,
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
});

async function validateSession() {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return { user: null, session: null };

  const { user, session } = await lucia.validateSession(sessionId);

  try {
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
  } catch {
    // Next.js throws error when attempting to set cookies when rendering page
  }

  return { user, session };
}

export async function invalidateSession() {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return { user: null, session: null };

  // this will sign-out the user
  await lucia.invalidateSession(sessionId);

  // and then remove the cookie
  const blankCookie = lucia.createBlankSessionCookie();
  cookies().set(blankCookie.name, blankCookie.value, blankCookie.attributes);
}

export async function getCurrentSession() {
  return await validateSession();
}

// Overload for when authRequired is true
export function getCurrentUserOg(params: {
  includeAvatar?: boolean;
  authRequired: true;
}): Promise<SafeUser>;

// Overload for when authRequired is false or undefined
export function getCurrentUserOg(params?: {
  includeAvatar?: boolean;
  authRequired?: false;
}): Promise<SafeUser | null>;

// Implementation of the function
export async function getCurrentUserOg(params?: {
  includeAvatar?: boolean;
  authRequired?: boolean;
}): Promise<SafeUser | null>;

// Implementation of the function
export async function getCurrentUserOg(params?: {
  includeAvatar?: boolean;
  authRequired?: boolean;
}): Promise<SafeUser | null> {
  const pathname = headers().get("x-pathname") ?? "";
  const { user } = await validateSession();

  if (params?.authRequired && !user && pathname !== "/auth/sign-in") {
    redirect("/auth/sign-in");
  }

  if (!user) {
    return null;
  }

  const completeUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!completeUser) {
    return null;
  }

  return {
    id: completeUser.id,
    name: completeUser.name,
    email: completeUser.email,
    emailVerified: completeUser.emailVerified,
  };
}

/**
 * used inside pages and places where the user can safely access the data
 */
export const getCurrentUser = cache(getCurrentUserOg);

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
  }
}

export interface SafeUser {
  id: string;
  email: string | null;
  name: string;
  emailVerified: boolean;
}
