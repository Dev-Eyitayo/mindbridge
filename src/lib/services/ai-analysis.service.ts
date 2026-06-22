import OpenAI from "openai";

const groq = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

export type RiskLevel = "LOW" | "MODERATE" | "HIGH" | "CRISIS";

export type MessageAnalysisResult = {
  emotion: string;   // e.g. ANXIOUS, SAD, HAPPY, ANGRY, NEUTRAL, FEARFUL, HOPEFUL
  intensity: number; // 1-10
  riskLevel: RiskLevel;
};

const ANALYSIS_PROMPT = `
You are an emotion analysis engine for a mental wellness app.

Analyse the user's message and return ONLY a JSON object with these fields:
- emotion: one of HAPPY, SAD, ANXIOUS, ANGRY, NEUTRAL, FEARFUL, HOPEFUL, OVERWHELMED, LONELY, CALM
- intensity: integer from 1 to 10 (1 = barely noticeable, 10 = extreme)
- riskLevel: one of LOW, MODERATE, HIGH, CRISIS

CRISIS = explicit self-harm, suicidal ideation, or intent to harm others.
HIGH = severe distress, hopelessness, or mentions of self-harm without explicit intent.
MODERATE = significant distress, persistent negative mood, mentions of struggle.
LOW = mild negative emotion or normal conversation.

Return ONLY valid JSON. No explanation, no markdown, no backticks.

Example:
{"emotion":"ANXIOUS","intensity":7,"riskLevel":"LOW"}
`.trim();

/**
 * Analyse a single user message for emotion, intensity, and risk level.
 * Returns null on failure so callers can proceed without blocking the chat.
 */
export async function analyseMessage(
  userMessage: string
): Promise<MessageAnalysisResult | null> {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // Faster, cheaper model for analysis
      messages: [
        { role: "system", content: ANALYSIS_PROMPT },
        { role: "user", content: userMessage },
      ],
      temperature: 0.1, // Low temp for consistent structured output
      max_tokens: 60,
    });

    const raw = completion.choices[0]?.message?.content?.trim() ?? "";
    const parsed = JSON.parse(raw) as MessageAnalysisResult;

    // Validate required fields
    if (!parsed.emotion || !parsed.riskLevel || typeof parsed.intensity !== "number") {
      return null;
    }

    // Clamp intensity to 1-10
    parsed.intensity = Math.max(1, Math.min(10, Math.round(parsed.intensity)));

    return parsed;
  } catch (err) {
    // Non-fatal: analysis failure should not break the chat
    console.error("[AI Analysis] Failed to analyse message:", err);
    return null;
  }
}
