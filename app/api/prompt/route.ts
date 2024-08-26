import { NextResponse } from "next/server";
import { settings } from "@/api/db";

export const runtime = "edge";

export async function GET() {
  return NextResponse.json(settings.collapsed);
}

export async function PUT(request: Request) {
  const { collapsed } = await request.json();
  settings.collapsed = collapsed as boolean;
  return NextResponse.json(settings.collapsed, { status: 201 });
}
