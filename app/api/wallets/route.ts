import { NextResponse } from "next/server";
import { z } from "zod";
import { mockWallets } from "@/lib/data/mockData";

const createSchema = z.object({
  address: z.string().min(1),
  label: z.string().min(1),
});

export async function GET() {
  return NextResponse.json({ wallets: mockWallets });
}

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = createSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 });
  }

  const wallet = {
    id: crypto.randomUUID(),
    address: parsed.data.address,
    label: parsed.data.label,
    isActive: true,
  };

  return NextResponse.json({ success: true, wallet });
}
