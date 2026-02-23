import { NextResponse } from "next/server";
import { z } from "zod";
import { mockWallets } from "@/lib/data/mockData";

const patchSchema = z.object({
  is_active: z.boolean().optional(),
  label: z.string().optional(),
});

export async function PATCH(_request: Request, { params }: { params: { id: string } }) {
  const wallet = mockWallets.find((w) => w.id === params.id);
  if (!wallet) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

  const json = await _request.json().catch(() => null);
  const parsed = patchSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    wallet: { ...wallet, isActive: parsed.data.is_active ?? wallet.isActive, label: parsed.data.label ?? wallet.label },
  });
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const exists = mockWallets.some((w) => w.id === params.id);
  if (!exists) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
