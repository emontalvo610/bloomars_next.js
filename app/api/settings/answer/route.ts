import { NextResponse } from "next/server";
import { settings } from "../../db";

export const runtime = "edge";

export async function GET() {
  return NextResponse.json(settings.answer);
}

export async function PUT(request: Request) {
  const { answer } = await request.json();
  settings.answer = answer;
  return NextResponse.json(settings.answer, { status: 201 });
}
