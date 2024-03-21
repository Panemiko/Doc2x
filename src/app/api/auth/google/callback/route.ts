import { google, lucia } from "@/server/auth";
import { db } from "@/server/db";
import { OAuth2RequestError } from "arctic";
import { cookies } from "next/headers";

interface GoogleUser {
  sub: string;
  name: string;
  picture: string;
  email: string;
  email_verified: boolean;
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const storedState = cookies().get("google_oauth_state")?.value;
  const storedCodeVerifier = cookies().get("google_oauth_code_verifier")?.value;

  if (
    !code ||
    !state ||
    !storedState ||
    !storedCodeVerifier ||
    state !== storedState
  ) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(
      code,
      storedCodeVerifier,
    );

    const googleResponse = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );

    const googleUser = await googleResponse.json().then((user: GoogleUser) => ({
      id: user.sub,
      email: user.email,
      name: user.name,
      picture: user.picture,
      emailVerified: user.email_verified,
    }));

    const existingAccount = await db.account.findFirst({
      where: {
        providerUserId: googleUser.id,
        providerId: "google",
      },
    });

    const existingUser = await db.user.findFirst({
      where: {
        email: googleUser.email,
      },
    });

    if (existingAccount ?? (existingUser && googleUser.emailVerified)) {
      if (!existingAccount) {
        await db.account.create({
          data: {
            providerId: "google",
            providerUserId: googleUser.id,
            userId: existingUser!.id,
          },
        });
      }

      const session = await lucia.createSession(
        existingAccount!.userId || existingUser!.id,
        {},
      );
      const sessionCookie = lucia.createSessionCookie(session.id);

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }

    const user = await db.user.create({
      data: {
        email: googleUser.email,
        emailVerified: googleUser.emailVerified,
        name: googleUser.name,
      },
    });

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}
