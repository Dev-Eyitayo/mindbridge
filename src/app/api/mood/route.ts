// src/app/api/mood/route.ts
// ============================================================
// Mood API — GET recent entries, POST new entry
// ============================================================

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createMoodEntry, getRecentMoodEntries } from "@/lib/services/mood.service";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") ?? "30", 10);

  const entries = await getRecentMoodEntries(session.user.id, limit);
  return NextResponse.json(entries);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { value, moodType, intensity, note, sleepScore, energyScore } = body;

    if (typeof value !== "number" || value < 1 || value > 10) {
      return NextResponse.json(
        { error: "value must be a number between 1 and 10" },
        { status: 400 }
      );
    }

    const entry = await createMoodEntry({
      userId: session.user.id,
      value,
      moodType,
      intensity: intensity ?? value,
      note,
      sleepScore,
      energyScore,
    });

    return NextResponse.json(entry, { status: 201 });
  } catch (err) {
    console.error("[Mood API] POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
