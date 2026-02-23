import { NextResponse } from "next/server";
import { z } from "zod";
import { mockBotStatus } from "@/lib/data/mockData";

const schema = z.object({
  event: z.string(),
  data: z.record(z.any()),
});

export async function POST(request: Request) {
  const secret = request.headers.get("x-clawdbot-signature");
  if (!secret || secret !== process.env.CLAWDBOT_WEBHOOK_SECRET) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 });
  }

  // Placeholder: enqueue or log the event
  console.info("[clawdbot-webhook]", parsed.data.event, parsed.data.data);

  return NextResponse.json({ success: true, status: "received", bot_status: mockBotStatus });
}
