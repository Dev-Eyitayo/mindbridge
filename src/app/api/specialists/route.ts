import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAllSpecialists, getSpecialistRecommendations } from "@/lib/services/specialist-recommendation.service";
import { getDominantEmotions, getStressScore } from "@/lib/services/analytics.service";

/** GET /api/specialists — returns all specialists with optional filters */
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const specialization = searchParams.get("specialization") ?? undefined;
  const consultationType = searchParams.get("consultationType") ?? undefined;
  const tag = searchParams.get("tag") ?? undefined;
  const recommended = searchParams.get("recommended") === "true";

  if (recommended) {
    const [dominantEmotions, stressScore] = await Promise.all([
      getDominantEmotions(session.user.id),
      getStressScore(session.user.id),
    ]);

    const result = await getSpecialistRecommendations(
      dominantEmotions,
      stressScore.label
    );
    return NextResponse.json(result);
  }

  const specialists = await getAllSpecialists({ specialization, consultationType, tag });
  return NextResponse.json(specialists);
}
