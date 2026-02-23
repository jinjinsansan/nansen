import { NextResponse } from "next/server";
import { z } from "zod";
import { ensureCronAuth } from "@/lib/api/auth";

const schema = z.object({
  event: z.string(),
  data: z.record(z.any()),
  priority: z.enum(["low", "normal", "high"]).default("normal"),
});

export async function POST(request: Request) {
  const unauthorized = ensureCronAuth(request);
  if (unauthorized) return unauthorized;

  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 });
  }

  // Placeholder: call Clawdbot gateway with bearer token
  console.info("[notify-clawdbot]", parsed.data.event, parsed.data.priority);

  return NextResponse.json({ success: true });
}
