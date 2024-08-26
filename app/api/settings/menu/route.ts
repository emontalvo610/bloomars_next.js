// app/api/setting/menu/route.ts
import { NextResponse } from "next/server";
import { settings } from "@/api/db";
import { MenuItem } from "@/types/menu";

export const runtime = "edge";

export async function GET() {
  return NextResponse.json(settings.menus);
}

export async function PUT(request: Request) {
  const { menus } = await request.json();
  settings.menus = menus as MenuItem[];
  return NextResponse.json(settings.menus, { status: 201 });
}
