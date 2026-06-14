import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import OpenAI from 'openai';

const groq = new OpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  let { messages, sessionId } = await req.json();
  let isNewSession = sessionId === "new";

  // Create session if it's new
  if (isNewSession) {
    const newSession = await prisma.chatSession.create({
      data: {
        userId,
        title: messages[0]?.content.substring(0, 30) || "New Chat",
      },
    });
    sessionId = newSession.id;
  }

  const userMessage = messages[messages.length - 1];

  // Save user message
  await prisma.message.create({
    data: { sessionId, role: 'user', content: userMessage.content, userId }
  });

  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: messages.map(({ role, content }: any) => ({ role, content })),
    stream: true,
  });

  const stream = new ReadableStream({
    async start(controller) {
      let fullResponse = "";
      for await (const chunk of response) {
        const text = chunk.choices[0]?.delta?.content || '';
        fullResponse += text;
        controller.enqueue(new TextEncoder().encode(text));
      }
      controller.close();

      // Save AI response
      await prisma.message.create({
        data: { sessionId, role: 'assistant', content: fullResponse, userId }
      });
    },
  });

  // Return the new sessionId in headers so the frontend can redirect
  return new Response(stream, {
    headers: {
      'X-Session-Id': sessionId,
    },
  });
}