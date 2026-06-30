import { NextRequest, NextResponse } from "next/server";
import { runCode } from "@/lib/judge";

export async function POST(req: NextRequest) {

  const { code, input } = await req.json();
  if (!code) return NextResponse.json({ error: "No code" }, { status: 400 });

  try {
    const result = await runCode(code, input ?? "", "");
    return NextResponse.json({
      output: result.output,
      error: result.error,
      time: result.time,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
