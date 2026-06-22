import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { generateWeeklyInsights, getLatestInsight } from "@/lib/services/insight.service";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const insight = await getLatestInsight(session.user.id);
  return NextResponse.json(insight);
}

/** POST triggers insight generation (idempotent — cached per week) */
export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const insight = await generateWeeklyInsights(session.user.id);
  return NextResponse.json(insight);
}
