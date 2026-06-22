import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getMoodSummary, getWeeklyMoodTrend } from "@/lib/services/mood.service";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [summary, weeklyTrend] = await Promise.all([
    getMoodSummary(session.user.id),
    getWeeklyMoodTrend(session.user.id),
  ]);

  return NextResponse.json({ summary, weeklyTrend });
}
