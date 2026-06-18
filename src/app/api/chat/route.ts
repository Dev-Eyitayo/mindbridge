import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import OpenAI from 'openai';

const groq = new OpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const systemPrompt = `
  You are a compassionate mental wellness companion.

  Your role is to provide emotional support, reflection, and practical coping guidance.

  Guidelines:

  - Be warm, empathetic, and non-judgmental.
  - Listen carefully before offering advice.
  - Help users explore their thoughts and emotions.
  - Ask gentle follow-up questions when appropriate.
  - Validate feelings without making assumptions.
  - Avoid toxic positivity.
  - Avoid lecturing.
  - Avoid sounding like a therapist conducting an assessment.

  When responding:
  - First acknowledge the user's experience.
  - Then offer perspective, reflection, or support.
  - Finally suggest practical next steps only if appropriate.

  Do not:
  - Diagnose mental health conditions.
  - Claim to be a therapist.
  - Prescribe medication.
  - Guarantee outcomes.
  - Encourage dependency on the AI.

  If a user expresses severe distress, self-harm thoughts, suicidal ideation, or intent to harm others:
  - Prioritize safety.
  - Encourage reaching out to trusted people and professional support.
  - Remain calm and supportive.
  - Do not be dismissive.

  Communication style:
  - Natural and conversational.
  - Human sounding, not corporate.
  - Short paragraphs.
  - Avoid excessive bullet points unless helpful.
  - Match the user's tone and emotional intensity.

  Your goal is not to solve every problem.
  Your goal is to help the user feel heard, understood, and supported while encouraging healthy reflection and action.
`;

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  let { messages, sessionId }: { messages: Message[]; sessionId?: string } = await req.json();
  let isNewSession = !sessionId || sessionId === "new";

  // Create new session if needed
  if (isNewSession) {
    const newSession = await prisma.chatSession.create({
      data: {
        userId,
        title: "New Chat",
      },
    });
    sessionId = newSession.id;
  }

  if (!sessionId) {
    return new NextResponse("Session ID is required", { status: 400 });
  }

  const userMessage = messages[messages.length - 1];

  // Save user message
  await prisma.message.create({
    data: { 
      sessionId, 
      role: 'user', 
      content: userMessage.content, 
      userId 
    }
  });

  const aiMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: 'system', content: systemPrompt },
    ...messages.map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content
    }))
  ];

  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: aiMessages, 
    stream: true,
  });

  const stream = new ReadableStream({
    async start(controller) {
      let fullResponse = "";

      try {
        for await (const chunk of response) {
          const text = chunk.choices[0]?.delta?.content || '';
          fullResponse += text;
          controller.enqueue(new TextEncoder().encode(text));
        }
      } catch (error) {
        console.error("Streaming error:", error);
      } finally {
        controller.close();
      }

      // Save assistant response
      await prisma.message.create({
        data: { 
          sessionId, 
          role: 'assistant', 
          content: fullResponse, 
          userId 
        }
      });

      // Background Title Generation (only for new chats)
      if (isNewSession) {
        try {
          const titleCompletion = await groq.chat.completions.create({
            model: 'llama-3.1-8b-instant',
            messages: [
              { 
                role: 'system', 
                content: 'Generate a short, natural title (3-6 words) for this conversation. Return ONLY the title, no quotes or extra text.' 
              },
              { role: 'user', content: userMessage.content }
            ],
            temperature: 0.7,
            max_tokens: 30,
          });

          let newTitle = titleCompletion.choices[0]?.message?.content?.trim() || "New Chat";
          
          // Clean title
          newTitle = newTitle.replace(/^["']|["']$/g, '').trim();

          await prisma.chatSession.update({
            where: { id: sessionId },
            data: { title: newTitle },
          });
        } catch (error) {
          console.error("Failed to auto-generate title:", error);
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      'X-Session-Id': sessionId,
      'Content-Type': 'text/event-stream',
    },
  });
}