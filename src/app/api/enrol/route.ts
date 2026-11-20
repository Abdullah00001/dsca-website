/**
 * @fileoverview Enrolment form endpoint — verifies Cloudflare Turnstile.
 */

import { NextResponse } from "next/server";
import { z } from "zod";

const enrolSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.union([
    z.literal(""),
    z.string().trim().email().max(160),
  ]),
  phone: z.string().trim().min(6).max(40),
  course: z.string().trim().min(1).max(80),
  note: z.string().trim().max(1000).optional().default(""),
  turnstileToken: z.string().trim().min(1),
});

type TurnstileResponse = {
  success: boolean;
  "error-codes"?: string[];
};

/**
 * Verifies a Turnstile token with Cloudflare.
 *
 * @param token - Token from the widget.
 * @param ip - Optional client IP for Cloudflare.
 */
async function verifyTurnstile(
  token: string,
  ip: string | null,
): Promise<boolean> {
  const secret =
    process.env.TURNSTILE_SECRET_KEY ??
    // Cloudflare always-pass test secret for local / unset env.
    "1x0000000000000000000000000000000AA";

  const body = new URLSearchParams({
    secret,
    response: token,
  });
  if (ip) {
    body.set("remoteip", ip);
  }

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
    },
  );

  if (!res.ok) {
    return false;
  }

  const data = (await res.json()) as TurnstileResponse;
  return data.success === true;
}

/**
 * Accepts an enrolment request after Turnstile passes.
 *
 * @param request - Incoming POST with JSON body.
 */
export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = enrolSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    null;

  const ok = await verifyTurnstile(parsed.data.turnstileToken, ip);
  if (!ok) {
    return NextResponse.json(
      { error: "Captcha verification failed" },
      { status: 403 },
    );
  }

  // Delivery (email / CRM) plugs in here later.
  return NextResponse.json({ ok: true });
}
