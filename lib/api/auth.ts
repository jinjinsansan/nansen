import { NextResponse } from "next/server";

export function ensureClawdbotAuth(request: Request) {
  const header = request.headers.get("authorization");
  if (!header || !header.startsWith("Bearer ")) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  const token = header.replace("Bearer ", "");
  if (token !== process.env.CLAWDBOT_API_KEY) {
    return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
  }
  return null;
}

export function ensureCronAuth(request: Request) {
  const header = request.headers.get("authorization");
  if (header !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
