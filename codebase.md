# mindbridge

## README.md

```markdown
# MindBridge 🧠💙

MindBridge is an AI-powered mental wellness platform designed to provide users with a safe space for reflection, emotional support, and mood tracking. It combines conversational AI with mood analytics to help users better understand their emotional patterns over time and connect with appropriate support resources when needed.

## Features

* 🤖 AI companion powered by Groq
* 😊 Mood logging and tracking
* 📈 Mood trends and insights
* 💬 Persistent conversations
* 🔐 Secure authentication with NextAuth
* 📊 Analytics dashboard
* 🩺 Specialist recommendations based on emotional patterns
* 🧠 AI-generated wellness insights
* 🌙 Responsive and modern UI

> **Disclaimer:** MindBridge is intended to support mental wellness and self-awareness. It is not a substitute for professional medical advice, diagnosis, or treatment.

---

## Tech Stack

### Frontend

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS

### Backend

* Next.js Server Actions / API Routes
* Prisma ORM
* PostgreSQL
* NextAuth

### AI

* Groq API

---

## Getting Started

### Prerequisites

Make sure you have installed:

* Node.js 18+
* npm, pnpm, yarn, or bun
* PostgreSQL

---

## Installation

Clone the repository:

```bash
git clone https://github.com/dev-eyitayo/mindbridge
cd mindbridge
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory and configure the required variables:

```env
NEXTAUTH_URL=
NEXTAUTH_SECRET=
GROQ_API_KEY=
DATABASE_URL = 
```

---

## Database Setup

Generate the Prisma client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

Seed the database:

```bash
npx prisma db seed
```

---

## Running the Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

The application automatically reloads as changes are made.

---

## Project Structure

```text
app/
components/
lib/
prisma/
public/
types/
hooks/
services/
```

The structure may evolve as new features are added.

---

## Core Modules

### AI Chat

Users can engage in supportive conversations powered by Groq.

### Mood Tracking

Track moods, intensity levels, and emotional trends over time.

### Insights

Receive AI-generated summaries and wellness observations based on mood history.

### Journal

Maintain personal reflections and emotional notes.

### Support & Specialists

Discover therapists and mental health specialists based on emotional patterns and needs.

---

## Scripts

Start development server:

```bash
npm run dev
```

Build the application:

```bash
npm run build
```

Run production server:

```bash
npm run start
```

Generate Prisma client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

Open Prisma Studio:

```bash
npx prisma studio
```

Seed database:

```bash
npx prisma db seed
```

---


```

## codebase.md

```markdown
# mindbridge

## README.md

```markdown
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```

## codebase.md

```markdown

```

## next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

```

## package.json

```json
{
  "name": "mindbridge",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "lint": "eslint",
    "postinstall": "prisma generate"
  },
  "dependencies": {
    "@ai-sdk/deepseek": "^2.0.38",
    "@ai-sdk/google": "^3.0.82",
    "@ai-sdk/openai": "^3.0.71",
    "@libsql/client": "^0.17.3",
    "@prisma/adapter-libsql": "^7.8.0",
    "@prisma/adapter-pg": "^7.8.0",
    "@prisma/client": "^7.8.0",
    "ai": "^6.0.205",
    "bcrypt": "^6.0.0",
    "dotenv": "^17.4.2",
    "lucide-react": "^1.18.0",
    "next": "16.2.9",
    "next-auth": "^4.24.14",
    "openai": "^6.42.0",
    "prisma": "^7.8.0",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "react-markdown": "^10.1.0",
    "sonner": "^2.0.7",
    "swr": "^2.4.1",
    "zustand": "^5.0.14"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@tailwindcss/typography": "^0.5.20",
    "@types/bcrypt": "^6.0.0",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.9",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}

```


## prisma.config.ts

```typescript
import "dotenv/config"; 
import { defineConfig, env } from "prisma/config";
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },

  datasource: {
    url: env("DATABASE_URL"),
  },
});
```

## prisma/migrations/20260617215753_setup_chats/migration.sql

```sql
-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "matric" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'student',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoodEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MoodEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "ChatSession" ADD CONSTRAINT "ChatSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "ChatSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoodEntry" ADD CONSTRAINT "MoodEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

```

## prisma/migrations/migration_lock.toml

```toml
# Please do not edit this file manually
# It should be added in your version-control system (e.g., Git)
provider = "postgresql"

```

## src/app/api/auth/[...nextauth]/route.ts

```typescript
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

## src/app/api/auth/register/route.ts

```typescript
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password } = body;

    // 1. Make sure all fields are filled out
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "Please fill in all fields." }, 
        { status: 400 }
      );
    }

    // 2. Check if the user already exists in SQLite
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "This email is already registered." }, 
        { status: 400 }
      );
    }

    // 3. Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Save the new user to the database
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      }
    });

    // 5. Send success back to the frontend so NextAuth can log them in
    return NextResponse.json({ success: true }, { status: 201 });

  } catch (error: any) {
    console.error("SERVER ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}
```

## src/app/api/chat/history/route.ts

```typescript
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('sessionId');
  if (!sessionId) return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });

  // Verify ownership before fetching messages
  const chatSession = await prisma.chatSession.findFirst({
    where: { 
      id: sessionId,
      userId: session.user.id // This acts as your security guard
    }
  });

  if (!chatSession) {
    return NextResponse.json({ error: 'Not found or unauthorized' }, { status: 404 });
  }

  const messages = await prisma.message.findMany({
    where: { sessionId },
    orderBy: { createdAt: 'asc' },
  });

  return NextResponse.json(messages);
}
```

## src/app/api/chat/route.ts

```typescript
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

const titlePrompt = `
You generate chat session titles.

Rules:
- Output ONLY the title.
- 3 to 6 words maximum.
- Must be a short noun phrase, not a sentence.
- No punctuation (no periods, commas, colons).
- No quotes.
- No "Chat about", "Discussion on", or similar prefixes.
- No repetition of words from the input unless essential.
- Make it sound like a clean app conversation title.

Style guidelines:
- Prefer natural human labeling like:
  "Work Stress Reflection", "Overthinking Late Night", "Relationship Confusion"
- Avoid generic titles like "New Chat", "Conversation", "User Message"
- Avoid full sentences like "I feel overwhelmed today"

Return only the title text.
`;

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  let { messages, sessionId }: { messages: Message[]; sessionId?: string } =
    await req.json();

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
      role: "user",
      content: userMessage.content,
      userId,
    },
  });

  const aiMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },
    ...messages.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
  ];

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: aiMessages,
    stream: true,
  });

  const stream = new ReadableStream({
    async start(controller) {
      let fullResponse = "";

      try {
        for await (const chunk of response) {
          const text = chunk.choices[0]?.delta?.content || "";
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
          role: "assistant",
          content: fullResponse,
          userId,
        },
      });

      // Background Title Generation (only for new chats)
      if (isNewSession) {
        try {
          const titleCompletion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
              {
                role: "system",
                content: titlePrompt,
              },
              {
                role: "user",
                content: userMessage.content,
              },
            ],
            temperature: 0.7,
            max_tokens: 20,
          });

          let newTitle =
            titleCompletion.choices[0]?.message?.content?.trim() ||
            "New Chat";

          // Clean title
          newTitle = newTitle
            .replace(/^["']|["']$/g, "")
            .trim();

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
      "X-Session-Id": sessionId,
      "Content-Type": "text/event-stream",
    },
  });
}
```

## src/app/api/chat/sessions/route.ts

```typescript
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const chats = await prisma.chatSession.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(chats);
}
```

## src/app/app/[[...sessionId]]/page.tsx

```typescript
"use client";

import { useSession } from "next-auth/react";
import { Sparkles, HeartPulse, Brain, ArrowUp } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useChatLogic } from "@/hooks/use-chat-logic";
import { TypingIndicator } from "@/components/TypingIndicator";
import { useEffect, useRef, use } from "react";

export default function DashboardPage({ params }: { params: Promise<{ sessionId?: string[] }> }) {
  const { data: session } = useSession();
  const unwrappedParams = use(params);
  const sessionId = unwrappedParams?.sessionId?.[0];

  const { messages, input, handleInputChange, handleSubmit, isLoading, isHistoryLoading } = useChatLogic(sessionId);

  const scrollRef = useRef<HTMLDivElement>(null);

  const firstName = session?.user?.name?.split(" ")[0] || "there";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const suggestions = [
    { icon: Brain, text: "I'm feeling really overwhelmed with work today." },
    { icon: HeartPulse, text: "I've been experiencing a lot of anxiety lately." },
    { icon: Sparkles, text: "I just want to reflect on my day." },
  ];

  const handleSuggestionClick = async (text: string) => {
    handleInputChange({ target: { value: text } } as any);
    setTimeout(async () => {
      const fakeEvent = { preventDefault: () => {} } as any;
      await handleSubmit(fakeEvent);
    }, 0);
  };

  // Auto-scroll to bottom smoothly
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [messages]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 180)}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        const fakeEvent = { preventDefault: () => {} } as any;
        handleSubmit(fakeEvent);
      }
    }
  };

  // ---- Render decision, in priority order ----
  //
  // 1. We have messages -> always render the chat thread. This is checked
  //    FIRST and is the load-bearing fix: messages now come from the
  //    Zustand store (see useChatLogic), which is re-keyed (not cleared)
  //    when "new" becomes a real sessionId. So at the exact moment
  //    router.replace fires, `messages` is already the same non-empty
  //    array it was a millisecond earlier. There is no render frame in
  //    which sessionId is the new uuid AND messages is empty, because
  //    those two facts are now updated in the same synchronous store
  //    write (promoteDraftToSession), not across a fetch boundary.
  //
  // 2. Only if there are truly zero messages AND we're fetching a cold
  //    session's history do we show the skeleton. This path is only ever
  //    hit for a direct link / refresh into an existing session, never
  //    for the new -> uuid transition.
  //
  // 3. Otherwise, zero messages and not loading -> the welcome screen.
  const showSkeleton = isHistoryLoading && messages.length === 0;
  const showWelcome = !showSkeleton && messages.length === 0;

  return (
    <div className="flex-1 flex flex-col h-screen bg-slate-50">
      <div className="flex-1 overflow-y-auto p-6 md:p-8" ref={scrollRef}>
        <div className="max-w-3xl mx-auto">
          {showSkeleton ? (
            <ChatSkeleton />
          ) : showWelcome ? (
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="text-teal-600" size={36} />
              </div>
              <h1 className="font-serif text-4xl font-semibold text-slate-900 mb-3">
                {getGreeting()}, {firstName}.
              </h1>
              <p className="text-slate-600 text-lg mb-12 max-w-md">
                This is a safe space. How are you feeling today?
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(s.text)}
                    className="flex flex-col items-start p-5 bg-white border border-slate-200 hover:border-teal-200 rounded-xl text-left transition-colors hover:bg-slate-50"
                  >
                    <s.icon size={22} className="text-slate-600 mb-3" />
                    <span className="text-sm text-slate-700 leading-snug">"{s.text}"</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-9 pb-24">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-6 py-4 text-[15.5px] leading-relaxed rounded-2xl ${
                    m.role === 'user'
                      ? 'bg-teal-600 text-white rounded-br-md'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-md'
                  }`}>
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {isLoading && <TypingIndicator />}
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-slate-200 bg-slate-50 p-6">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <textarea
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              rows={1}
              className="w-full resize-none bg-white border border-slate-200 focus:border-slate-300 focus:outline-none rounded-2xl py-4 pl-6 pr-16 text-slate-900 placeholder:text-slate-400 text-[15.5px] leading-relaxed max-h-[180px] overflow-auto scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-3 bottom-3 p-3 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white rounded-xl transition-colors"
            >
              <ArrowUp size={20} strokeWidth={2.5} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const ChatSkeleton = () => (
  <div className="space-y-10 pt-8 max-w-3xl mx-auto">
    <div className="flex justify-start animate-pulse">
      <div className="w-full max-w-[88%] sm:max-w-[82%]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-slate-100 rounded-full" />
          <div className="h-3.5 w-24 bg-slate-100 rounded" />
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-md px-6 py-6">
          <div className="space-y-3">
            <div className="h-4 bg-slate-100 rounded w-11/12" />
            <div className="h-4 bg-slate-100 rounded w-full" />
            <div className="h-4 bg-slate-100 rounded w-4/5" />
          </div>
        </div>
      </div>
    </div>

    <div className="flex justify-end animate-pulse">
      <div className="w-full max-w-[85%] sm:max-w-[78%]">
        <div className="bg-teal-100 rounded-2xl rounded-br-md px-6 py-6">
          <div className="space-y-3">
            <div className="h-4 bg-teal-50 rounded w-4/5" />
            <div className="h-4 bg-teal-50 rounded w-full" />
            <div className="h-4 bg-teal-50 rounded w-3/4" />
          </div>
        </div>
      </div>
    </div>
  </div>
);
```

## src/app/app/layout.tsx

```typescript
"use client";

import { useRouter, useParams } from 'next/navigation';
import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  LayoutDashboard,
  LogOut,
  Plus,
  Menu,
  X,
  History
} from "lucide-react";
import { useState, useEffect } from "react";
import useSWR from 'swr';
import { useChatStore, selectSidebarRefresh } from '@/store/useChatStore';

const fetcher = (url: string) => fetch(url, { credentials: 'include' }).then(res => res.json());

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const router = useRouter();

  const params = useParams();
  const currentSessionId = Array.isArray(params?.sessionId) ? params.sessionId[0] : undefined;

  const triggerRefresh = useChatStore(selectSidebarRefresh);
  const resetRefresh = useChatStore((state) => state.resetRefresh);
  const resetActiveChat = useChatStore((state) => state.resetActiveChat);

  const { data, mutate } = useSWR('/api/chat/sessions', fetcher, {
    refreshInterval: 4000,
    revalidateOnFocus: true
  });

  const sessions = Array.isArray(data) ? data : [];

  // Listen for sidebar refresh (new chat titles)
  useEffect(() => {
    if (triggerRefresh) {
      mutate();
      resetRefresh();
    }
  }, [triggerRefresh, mutate, resetRefresh]);

  const handleCreateNewChat = () => {
    resetActiveChat();
    router.push('/app');
    setIsMobileDrawerOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 border-r border-slate-800">
      {/* Logo */}
      <div className="px-6 py-8 font-serif text-2xl font-semibold tracking-tighter border-b border-slate-800">
        🌿 MindBridge
      </div>

      {/* New Chat Button */}
      <div className="p-6">
        <button
          onClick={handleCreateNewChat}
          className="w-full flex items-center justify-center gap-3 bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-lg transition-colors font-medium"
        >
          <Plus size={20} /> New Chat
        </button>
      </div>

      <nav
        className="flex-1 px-2 overflow-y-auto pb-6 sidebar-scroll"
        style={{ scrollbarColor: '#334155 transparent', scrollbarWidth: 'thin' }}
      >
        <Link
          href="/app"
          onClick={resetActiveChat}
          className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-slate-900 rounded-lg transition-colors mb-8"
        >
          <LayoutDashboard size={18} /> Overview
        </Link>

        {/* === TODAY SECTION === */}
        <div className="px-1 mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
            <History size={14} /> Today
          </div>
          <div className="space-y-0.5 pr-2">
            {sessions
              .filter((s: any) => isToday(s.createdAt) || s.title === "New Chat")
              .map((s: any) => {
                const isActive = s.id === currentSessionId;
                return (
                  <Link
                    key={s.id}
                    href={`/app/${s.id}`}
                    className={`block px-4 py-2.5 text-sm rounded-lg transition-colors truncate ${
                      isActive
                        ? 'bg-teal-600/15 text-teal-300 font-medium'
                        : 'text-slate-300 hover:text-slate-100 hover:bg-slate-900'
                    }`}
                  >
                    {s.title || "New Chat"}
                  </Link>
                );
              })}
          </div>
        </div>

        {/* === RECENT SECTION === */}
        <div className="px-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
            <History size={14} /> Recent
          </div>
          <div className="space-y-0.5 pr-2">
            {sessions
              .filter((s: any) => !isToday(s.createdAt) && s.title !== "New Chat")
              .map((s: any) => {
                const isActive = s.id === currentSessionId;
                return (
                  <Link
                    key={s.id}
                    href={`/app/${s.id}`}
                    className={`block px-4 py-2.5 text-sm rounded-lg transition-colors truncate ${
                      isActive
                        ? 'bg-teal-600/15 text-teal-300 font-medium'
                        : 'text-slate-300 hover:text-slate-100 hover:bg-slate-900'
                    }`}
                  >
                    {s.title || "Untitled Chat"}
                  </Link>
                );
              })}
          </div>
        </div>
      </nav>

      {/* Sign Out */}
      <div className="p-6 border-t border-slate-800 mt-auto">
        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-400 hover:bg-slate-900 hover:text-red-400 rounded-lg transition-colors"
        >
          <LogOut size={18} /> Sign out
        </button>
      </div>
    </div>
  );

  return (

    <div className="h-screen flex bg-slate-50 overflow-hidden">
      {/* Mobile Menu Trigger */}
      <button
        onClick={() => setIsMobileDrawerOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white border border-slate-200 rounded-lg"
      >
        <Menu size={22} />
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 h-screen overflow-hidden">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      {isMobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-72 h-full bg-slate-950 relative">
            <button
              onClick={() => setIsMobileDrawerOpen(false)}
              className="absolute right-4 top-6 p-2 text-slate-400 hover:text-slate-200"
            >
              <X size={24} />
            </button>
            <SidebarContent />
          </div>
          <div
            className="flex-1 bg-black/60"
            onClick={() => setIsMobileDrawerOpen(false)}
          />
        </div>
      )}

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {children}
      </main>
    </div>
  );
}

/* Helper Functions */
const isToday = (date?: string): boolean => {
  if (!date) return false;
  const d = new Date(date);
  const now = new Date();
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
};
```

## src/app/globals.css

```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}



.sidebar-scroll::-webkit-scrollbar {
  width: 6px;
}
 
.sidebar-scroll::-webkit-scrollbar-track {
  background: transparent;
}
 
.sidebar-scroll::-webkit-scrollbar-thumb {
  background-color: #334155; /* slate-700, matches the inline scrollbarColor */
  border-radius: 9999px;
}
 
.sidebar-scroll::-webkit-scrollbar-thumb:hover {
  background-color: #475569; /* slate-600 */
}
```

## src/app/layout.tsx

```typescript
import type { Metadata } from "next";
import { Nunito, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { AuthProvider } from "../components/Providers";

const nunito = Nunito({ 
  subsets: ["latin"],
  variable: '--font-nunito' 
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  style: ['normal', 'italic'],
  variable: '--font-playfair' 
});

export const metadata: Metadata = {
  title: 'MindBridge | AI Mental Wellness',
  description: 'Your safe space for reflection and AI-powered mental support.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://mindbridge.app',
    title: 'MindBridge',
    description: 'AI-driven mental health support and daily reflection.',
    siteName: 'MindBridge',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'MindBridge App Preview',
    }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${playfair.variable} font-sans bg-slate-50 text-slate-900`}>
        <AuthProvider>
          {/* THE TOASTER MUST BE HERE */}
          <Toaster richColors position="top-center" theme="light" className="font-sans" />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

## src/app/login/page.tsx

```typescript
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "signup") {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong during registration.");
        }
        
        toast.success("Account created successfully!");
      }

      const result = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (result?.error) {
        throw new Error("Invalid email or password");
      }

      toast.success("Welcome back!");
      router.push("/app");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <div className="hidden lg:flex w-[420px] bg-gradient-to-br from-slate-900 to-slate-800 flex-col p-12 relative overflow-hidden">
        <div className="absolute w-[300px] h-[300px] bg-teal-500 rounded-full blur-[80px] opacity-20 -bottom-12 -right-20" />
        <div className="absolute w-[200px] h-[200px] bg-emerald-500 rounded-full blur-[80px] opacity-20 top-24 -left-16" />

        <div className="relative z-10 flex-1 flex flex-col">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-xl flex items-center justify-center text-xl shadow-md">🌿</div>
            <div className="font-serif text-2xl font-bold text-white">MindBridge<span className="text-teal-400">.</span></div>
          </div>

          <div className="mt-auto font-serif text-[22px] italic text-slate-300 leading-relaxed">
            "You don't have to control your thoughts. You just have to stop letting them control you."
            <div className="text-slate-500 text-sm mt-4 font-sans not-italic">— Dan Millman</div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[460px] bg-white rounded-3xl p-10 shadow-sm border-1 border-slate-100">
          <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2 tracking-tight">
            {mode === "login" ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-slate-500 text-sm mb-8 font-sans">
            {mode === "login"
              ? "Sign in to your MindBridge account"
              : "Join our wellness community today"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2 tracking-wide uppercase font-sans">First Name</label>
                  <input required name="firstName" value={form.firstName} onChange={handleChange} className="font-sans w-full p-3 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all text-sm text-slate-900 placeholder:text-slate-400" placeholder="Amara" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2 tracking-wide uppercase font-sans">Last Name</label>
                  <input required name="lastName" value={form.lastName} onChange={handleChange} className="font-sans w-full p-3 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all text-sm text-slate-900 placeholder:text-slate-400" placeholder="Obi" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2 tracking-wide uppercase font-sans">Email Address</label>
              <input required type="email" name="email" value={form.email} onChange={handleChange} className="font-sans w-full p-3 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all text-sm text-slate-900 placeholder:text-slate-400" placeholder="you@example.com" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2 tracking-wide uppercase font-sans">Password</label>
              <input required type="password" name="password" value={form.password} onChange={handleChange} className="font-sans w-full p-3 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all text-sm text-slate-900 placeholder:text-slate-400" placeholder="••••••••" />
            </div>

            <button disabled={loading} type="submit" className="font-sans w-full p-4 mt-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-white font-bold transition-all shadow-sm disabled:opacity-70">
              {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="text-center mt-8 text-slate-500 text-sm font-sans">
            {mode === "login" ? (
              <>New here? <button onClick={() => setMode("signup")} className="text-teal-600 font-bold hover:underline">Create account</button></>
            ) : (
              <>Have an account? <button onClick={() => setMode("login")} className="text-teal-600 font-bold hover:underline">Sign in</button></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

## src/app/page.tsx

```typescript
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Brain, HeartPulse, ShieldCheck, ArrowRight, Menu, X } from 'lucide-react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="w-full px-6 py-8 flex items-center justify-between z-50">
        <div className="flex items-center gap-2 font-serif text-2xl font-bold">
          <span className="text-teal-600 text-xl">🌿</span> MindBridge
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/login" className="text-sm font-semibold hover:text-teal-600 transition-colors">Sign In</Link>
          <Link href="/login" className="px-6 py-2.5 bg-slate-900 text-white text-sm rounded-full font-semibold hover:bg-slate-800 transition-all">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 z-50 relative" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <Link href="/login" className="text-2xl font-medium" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
        <Link href="/login" className="px-8 py-4 bg-teal-600 text-white rounded-full text-lg font-medium" onClick={() => setIsMenuOpen(false)}>
          Get Started
        </Link>
      </div>

      {/* Hero Section */}
      <main className="w-full px-6 pt-16 md:pt-24 pb-20 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase text-teal-700 bg-teal-50 rounded-full">
          Reflect. Grow. Heal.
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-6 tracking-tight">
          Your thoughts, <br className="hidden md:block"/> understood.
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-lg mx-auto leading-relaxed px-2">
          MindBridge provides a safe, non-judgmental space to reflect on your day 
          and gain clarity through empathetic AI conversation.
        </p>
        <Link 
          href="/login"
          className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 text-white rounded-full text-base font-semibold hover:bg-teal-700 transition-all"
        >
          Get Started <ArrowRight size={18} />
        </Link>
      </main>

      {/* Features Grid */}
      <section className="w-full px-6 py-20 border-t border-slate-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <FeatureCard icon={<Brain size={24} className="text-teal-600" />} title="Empathetic AI" desc="Conversations designed to listen, reflect, and guide you through complex emotions." />
          <FeatureCard icon={<HeartPulse size={24} className="text-teal-600" />} title="Mood Tracking" desc="Visualize your emotional trends over time with daily check-ins." />
          <FeatureCard icon={<ShieldCheck size={24} className="text-teal-600" />} title="Private & Secure" desc="Your reflections belong to you. Your data is encrypted and strictly private." />
        </div>
      </section>
      
      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-slate-100 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>© 2026 MindBridge. All rights reserved.</div>
        <div className="flex gap-8">
          <Link href="/privacy" className="hover:text-teal-600">Privacy</Link>
          <Link href="/terms" className="hover:text-teal-600">Terms</Link>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="space-y-4 px-2">
      <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-base">{desc}</p>
    </div>
  );
}
```

## src/components/Providers.tsx

```typescript
"use client";

import { SessionProvider } from "next-auth/react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
```

## src/components/TypingIndicator.tsx

```typescript
export const TypingIndicator = () => (
  <div className="flex gap-1 p-4 bg-slate-100 rounded-2xl w-fit">
    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
  </div>
);
```

## src/hooks/use-chat-logic.ts

```typescript
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  useChatStore,
  selectActiveMessages,
  type ChatMessage,
} from '@/store/useChatStore';

export function useChatLogic(sessionId?: string) {
  const router = useRouter();

  const messages = useChatStore(selectActiveMessages);
  const setMessages = useChatStore((s) => s.setMessages);
  const startDraftSession = useChatStore((s) => s.startDraftSession);
  const promoteDraftToSession = useChatStore((s) => s.promoteDraftToSession);
  const loadHistoryForSession = useChatStore((s) => s.loadHistoryForSession);
  const isHydrated = useChatStore((s) => s.isHydrated);
  const triggerSidebarRefresh = useChatStore((s) => s.triggerRefresh);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);

  const draftKeyRef = useRef<string | null>(null);

  useEffect(() => {
    const isNewChat = !sessionId || sessionId === 'new';

    if (isNewChat) {
      if (!draftKeyRef.current) {
        setMessages([]);
      }
      setIsHistoryLoading(false);
      return;
    }
    if (isHydrated(sessionId)) {
      setIsHistoryLoading(false);
      draftKeyRef.current = null; // promotion complete, clear the draft marker
      return;
    }

    let cancelled = false;
    const fetchHistory = async () => {
      setIsHistoryLoading(true);
      try {
        const res = await fetch(`/api/chat/history?sessionId=${sessionId}`, {
          credentials: 'include',
        });
        if (res.ok && !cancelled) {
          const data: ChatMessage[] = await res.json();
          loadHistoryForSession(sessionId, data);
        }
      } catch (err) {
        console.error('Failed to load history:', err);
      } finally {
        if (!cancelled) setIsHistoryLoading(false);
      }
    };

    fetchHistory();
    return () => {
      cancelled = true;
    };
  }, [sessionId, isHydrated, loadHistoryForSession, setMessages]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const currentInput = input.trim();
      if (!currentInput) return;

      const isNewChat = !sessionId || sessionId === 'new';

      if (isNewChat && !draftKeyRef.current) {
        draftKeyRef.current = startDraftSession();
      }

      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: currentInput,
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...messages, userMessage],
            sessionId: sessionId || 'new',
          }),
          credentials: 'include',
        });

        if (!response.ok) throw new Error('Server error');

        const newSessionId = response.headers.get('X-Session-Id');

        if (isNewChat && newSessionId) {
          promoteDraftToSession(newSessionId);
          draftKeyRef.current = newSessionId;

          router.replace(`/app/${newSessionId}`, { scroll: false });
          triggerSidebarRefresh();
        }

        if (!response.body) throw new Error('No response body');

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        const assistantMessageId = (Date.now() + 1).toString();

        setMessages((prev) => [
          ...prev,
          { id: assistantMessageId, role: 'assistant', content: '' },
        ]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMessageId ? { ...m, content: m.content + chunk } : m
            )
          );
        }
      } catch (err) {
        console.error('Chat Error:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [input, messages, sessionId, router, triggerSidebarRefresh, setMessages, startDraftSession, promoteDraftToSession]
  );

  return {
    messages,
    input,
    handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value),
    handleSubmit,
    isLoading,
    isHistoryLoading,
  };
}
```

## src/lib/prisma.ts

```typescript
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
export default prisma;
```

## src/middleware.ts

```typescript
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname === "/";

    if (isAuth && isAuthPage) {
      return NextResponse.redirect(new URL("/app", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname === "/") return true;
        return !!token;
      },
    },
    pages: {
      signIn: "/",
    },
  }
);

export const config = {
  matcher: ["/", "/app/:path*"],
};
```

## src/store/useChatStore.ts

```typescript
import { create } from 'zustand';

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

interface ActiveChatSlice {
  activeKey: string | null;
  messages: ChatMessage[];

  hydratedSessionIds: Set<string>;

  isAwaitingSessionId: boolean;

  startDraftSession: () => string;
  setMessages: (updater: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])) => void;
  promoteDraftToSession: (realSessionId: string) => void;
  loadHistoryForSession: (sessionId: string, messages: ChatMessage[]) => void;
  markAwaitingSessionId: (waiting: boolean) => void;
  resetActiveChat: () => void;
  isHydrated: (sessionId: string) => boolean;
}

interface SidebarSlice {
  shouldRefresh: boolean;
  triggerRefresh: () => void;
  resetRefresh: () => void;
}

type ChatStore = ActiveChatSlice & SidebarSlice;

export const useChatStore = create<ChatStore>((set, get) => ({
  activeKey: null,
  messages: [],
  hydratedSessionIds: new Set(),
  isAwaitingSessionId: false,

  startDraftSession: () => {
    const draftKey = `draft-${Date.now()}`;
    set({ activeKey: draftKey, messages: [], isAwaitingSessionId: false });
    return draftKey;
  },

  setMessages: (updater) =>
    set((state) => ({
      messages: typeof updater === 'function' ? (updater as (prev: ChatMessage[]) => ChatMessage[])(state.messages) : updater,
    })),

  promoteDraftToSession: (realSessionId) =>
    set((state) => ({
      activeKey: realSessionId,
      hydratedSessionIds: new Set(state.hydratedSessionIds).add(realSessionId),
      isAwaitingSessionId: false,
    })),

  loadHistoryForSession: (sessionId, messages) =>
    set((state) => ({
      activeKey: sessionId,
      messages,
      hydratedSessionIds: new Set(state.hydratedSessionIds).add(sessionId),
    })),

  markAwaitingSessionId: (waiting) => set({ isAwaitingSessionId: waiting }),

  resetActiveChat: () => set({ activeKey: null, messages: [], isAwaitingSessionId: false }),

  isHydrated: (sessionId) => get().hydratedSessionIds.has(sessionId),

  shouldRefresh: false,
  triggerRefresh: () => set({ shouldRefresh: true }),
  resetRefresh: () => set({ shouldRefresh: false }),
}));

export const selectActiveMessages = (s: ChatStore) => s.messages;
export const selectActiveKey = (s: ChatStore) => s.activeKey;
export const selectSidebarRefresh = (s: ChatStore) => s.shouldRefresh;
```

## src/types/next-auth.d.ts

```typescript
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string;
  }
}
```

## tailwind.config.ts

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: { DEFAULT: '#7a9e7e', light: '#a8c5ac', dark: '#4a7a4f' },
        cream: '#faf7f2',
        'warm-white': '#fffef9',
        earth: { DEFAULT: '#8b6f47', light: '#c4a882' },
        forest: '#2d5a3d',
        blush: '#e8b4a0',
        text: { dark: '#2a2a2a', mid: '#5a5a5a', light: '#8a8a8a' },
      },
      fontFamily: {
        sans: ['var(--font-nunito)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
```

## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}

```


```

## next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

```

## package.json

```json
{
  "name": "mindbridge",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "lint": "eslint",
    "postinstall": "prisma generate",
    "db:seed": "tsx prisma/seed.ts",
    "db:migrate": "prisma migrate deploy",
    "db:studio": "prisma studio"
  },
  "dependencies": {
    "@ai-sdk/deepseek": "^2.0.38",
    "@ai-sdk/google": "^3.0.82",
    "@ai-sdk/openai": "^3.0.71",
    "@libsql/client": "^0.17.3",
    "@prisma/adapter-libsql": "^7.8.0",
    "@prisma/adapter-pg": "^7.8.0",
    "@prisma/client": "^7.8.0",
    "ai": "^6.0.205",
    "bcrypt": "^6.0.0",
    "dotenv": "^17.4.2",
    "lucide-react": "^1.18.0",
    "next": "16.2.9",
    "next-auth": "^4.24.14",
    "openai": "^6.42.0",
    "prisma": "^7.8.0",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "react-markdown": "^10.1.0",
    "recharts": "^3.8.1",
    "sonner": "^2.0.7",
    "swr": "^2.4.1",
    "typescript": "^5",
    "zustand": "^5.0.14"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@tailwindcss/typography": "^0.5.20",
    "@types/bcrypt": "^6.0.0",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.9",
    "tailwindcss": "^4",
    "tsx": "^4.22.4"
  }
}
```
```

## prisma.config.ts

```typescript
import "dotenv/config"; 
import { defineConfig, env } from "prisma/config";
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },

  datasource: {
    url: env("DATABASE_URL"),
  },
});
```

## prisma/migrations/20260617215753_setup_chats/migration.sql

```sql
-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "matric" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'student',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoodEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MoodEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "ChatSession" ADD CONSTRAINT "ChatSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "ChatSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoodEntry" ADD CONSTRAINT "MoodEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

```

## prisma/migrations/20260622173446_update_mood_entry_and_add_specialists/migration.sql

```sql
-- AlterTable
ALTER TABLE "MoodEntry" ADD COLUMN     "energyScore" INTEGER,
ADD COLUMN     "intensity" INTEGER,
ADD COLUMN     "moodType" TEXT,
ADD COLUMN     "sleepScore" INTEGER;

-- CreateTable
CREATE TABLE "MessageAnalysis" (
    "id" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "emotion" TEXT NOT NULL,
    "intensity" INTEGER NOT NULL,
    "riskLevel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MessageAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeeklyInsight" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "weekStart" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "tags" TEXT[],
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WeeklyInsight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Specialist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "yearsOfExperience" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "languages" TEXT[],
    "email" TEXT,
    "phone" TEXT,
    "imageUrl" TEXT,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 4.5,
    "availability" TEXT NOT NULL,
    "consultationType" TEXT NOT NULL,
    "tags" TEXT[],
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Specialist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MessageAnalysis_messageId_key" ON "MessageAnalysis"("messageId");

-- CreateIndex
CREATE INDEX "MessageAnalysis_messageId_idx" ON "MessageAnalysis"("messageId");

-- CreateIndex
CREATE INDEX "WeeklyInsight_userId_idx" ON "WeeklyInsight"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "WeeklyInsight_userId_weekStart_key" ON "WeeklyInsight"("userId", "weekStart");

-- CreateIndex
CREATE INDEX "Specialist_specialization_idx" ON "Specialist"("specialization");

-- CreateIndex
CREATE INDEX "Specialist_tags_idx" ON "Specialist"("tags");

-- CreateIndex
CREATE INDEX "MoodEntry_userId_createdAt_idx" ON "MoodEntry"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageAnalysis" ADD CONSTRAINT "MessageAnalysis_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeeklyInsight" ADD CONSTRAINT "WeeklyInsight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

```

## prisma/migrations/migration_lock.toml

```toml
# Please do not edit this file manually
# It should be added in your version-control system (e.g., Git)
provider = "postgresql"

```

## prisma/seed.ts

```typescript
import "dotenv/config";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const specialists = [
  // ── Clinical Psychologists ──────────────────────────────────
  {
    name: "Dr. Amara Okonkwo",
    title: "Clinical Psychologist",
    specialization: "Clinical Psychology",
    bio: "Dr. Amara Okonkwo brings over 15 years of experience in evidence-based psychotherapy for anxiety, depression, and emotional dysregulation. She trained at the University of Lagos and completed her doctorate at UCL London. She is known for her culturally sensitive, person-centred approach.",
    yearsOfExperience: 15,
    location: "Lagos, Nigeria",
    languages: ["English", "Yoruba", "Igbo"],
    email: "amara.okonkwo@mindbridge.app",
    imageUrl: "/specialists/amara-okonkwo.jpg",
    rating: 4.9,
    availability: "Mon-Thu, 9am-5pm",
    consultationType: "both",
    tags: ["anxiety", "depression", "CBT", "trauma", "emotional regulation"],
    verified: true,
  },
  {
    name: "Dr. Chukwuemeka Eze",
    title: "Clinical Psychologist",
    specialization: "Clinical Psychology",
    bio: "Dr. Eze specialises in cognitive-behavioural therapy and mindfulness-based interventions for adults dealing with chronic stress and burnout. With 12 years in private practice, he has helped hundreds of professionals reclaim their mental wellbeing.",
    yearsOfExperience: 12,
    location: "Abuja, Nigeria",
    languages: ["English", "Igbo", "Hausa"],
    imageUrl: "/specialists/chukwuemeka-eze.jpg",
    rating: 4.8,
    availability: "Tue-Sat, 10am-6pm",
    consultationType: "virtual",
    tags: ["stress", "burnout", "CBT", "mindfulness", "professionals"],
    verified: true,
  },
  {
    name: "Dr. Folake Adeyemi",
    title: "Clinical Psychologist",
    specialization: "Clinical Psychology",
    bio: "Dr. Folake Adeyemi is a compassionate psychologist specialising in childhood trauma and its adult manifestations. She holds a PhD from the University of Ibadan and has published research on intergenerational trauma in West African contexts.",
    yearsOfExperience: 10,
    location: "Ibadan, Nigeria",
    languages: ["English", "Yoruba"],
    imageUrl: "/specialists/folake-adeyemi.jpg",
    rating: 4.7,
    availability: "Mon-Fri, 8am-4pm",
    consultationType: "both",
    tags: ["trauma", "childhood trauma", "PTSD", "attachment", "depression"],
    verified: true,
  },

  // ── CBT Therapists ──────────────────────────────────────────
  {
    name: "Ngozi Chibuike",
    title: "CBT Therapist",
    specialization: "Cognitive Behavioural Therapy",
    bio: "Ngozi is a certified CBT therapist with a master's degree from the University of Benin. She works primarily with young adults navigating anxiety, perfectionism, and academic pressure, using structured yet warm therapeutic techniques.",
    yearsOfExperience: 7,
    location: "Benin City, Nigeria",
    languages: ["English", "Edo"],
    imageUrl: "/specialists/ngozi-chibuike.jpg",
    rating: 4.8,
    availability: "Mon-Sat, 9am-5pm",
    consultationType: "virtual",
    tags: ["anxiety", "CBT", "perfectionism", "academic stress", "young adults"],
    verified: true,
  },
  {
    name: "Emeka Nwosu",
    title: "CBT Therapist",
    specialization: "Cognitive Behavioural Therapy",
    bio: "Emeka Nwosu combines CBT with acceptance and commitment therapy (ACT) to help clients break unhelpful thought cycles. He has worked with athletes, students, and corporate professionals over his 9-year career.",
    yearsOfExperience: 9,
    location: "Port Harcourt, Nigeria",
    languages: ["English", "Igbo"],
    imageUrl: "/specialists/emeka-nwosu.jpg",
    rating: 4.6,
    availability: "Tue-Fri, 11am-7pm",
    consultationType: "both",
    tags: ["anxiety", "CBT", "ACT", "depression", "performance anxiety"],
    verified: true,
  },

  // ── Trauma Therapists ───────────────────────────────────────
  {
    name: "Dr. Hauwa Musa",
    title: "Trauma-Informed Therapist",
    specialization: "Trauma Therapy",
    bio: "Dr. Hauwa Musa is a licensed trauma specialist trained in EMDR (Eye Movement Desensitization and Reprocessing). She has worked extensively with survivors of domestic violence and conflict-related trauma across Northern Nigeria.",
    yearsOfExperience: 14,
    location: "Kano, Nigeria",
    languages: ["English", "Hausa", "Fulani"],
    imageUrl: "/specialists/hauwa-musa.jpg",
    rating: 4.9,
    availability: "Mon-Thu, 9am-4pm",
    consultationType: "both",
    tags: ["trauma", "EMDR", "PTSD", "domestic violence", "grief"],
    verified: true,
  },
  {
    name: "Adaeze Obi",
    title: "Trauma Specialist",
    specialization: "Trauma Therapy",
    bio: "Adaeze Obi works with individuals who have experienced relational trauma, helping them rebuild trust and emotional safety. Her somatic-informed approach integrates body-based techniques with narrative therapy.",
    yearsOfExperience: 6,
    location: "Enugu, Nigeria",
    languages: ["English", "Igbo"],
    imageUrl: "/specialists/adaeze-obi.jpg",
    rating: 4.7,
    availability: "Wed-Sun, 10am-6pm",
    consultationType: "virtual",
    tags: ["trauma", "somatic therapy", "relational trauma", "grief", "PTSD"],
    verified: false,
  },

  // ── Psychiatrists ───────────────────────────────────────────
  {
    name: "Dr. Babatunde Fashola",
    title: "Consultant Psychiatrist",
    specialization: "Psychiatry",
    bio: "Dr. Babatunde Fashola is a consultant psychiatrist with specialisations in mood disorders, psychosis, and dual diagnosis. He trained at Lagos University Teaching Hospital and has 18 years of clinical experience.",
    yearsOfExperience: 18,
    location: "Lagos, Nigeria",
    languages: ["English", "Yoruba"],
    email: "b.fashola@mindbridge.app",
    imageUrl: "/specialists/babatunde-fashola.jpg",
    rating: 4.9,
    availability: "Mon-Fri, 9am-3pm",
    consultationType: "both",
    tags: ["psychiatry", "depression", "bipolar", "psychosis", "medication management"],
    verified: true,
  },
  {
    name: "Dr. Zainab Garba",
    title: "Psychiatrist",
    specialization: "Psychiatry",
    bio: "Dr. Zainab Garba focuses on women's mental health, including perinatal psychiatry and trauma in women. She is one of the few psychiatrists in the North specialising in postpartum depression and anxiety.",
    yearsOfExperience: 11,
    location: "Kaduna, Nigeria",
    languages: ["English", "Hausa", "Arabic"],
    imageUrl: "/specialists/zainab-garba.jpg",
    rating: 4.8,
    availability: "Mon, Wed, Fri, 10am-4pm",
    consultationType: "virtual",
    tags: ["psychiatry", "women's mental health", "postpartum", "anxiety", "depression"],
    verified: true,
  },

  // ── Counsellors / Therapists ────────────────────────────────
  {
    name: "Yewande Bello",
    title: "Licensed Counsellor",
    specialization: "Counselling",
    bio: "Yewande Bello is a warm and approachable counsellor who helps individuals navigate life transitions, relationship difficulties, and low mood. She has a particular interest in supporting students and young professionals.",
    yearsOfExperience: 5,
    location: "Lagos, Nigeria",
    languages: ["English", "Yoruba"],
    imageUrl: "/specialists/yewande-bello.jpg",
    rating: 4.6,
    availability: "Mon-Sat, 8am-6pm",
    consultationType: "virtual",
    tags: ["depression", "life transitions", "grief", "relationships", "students"],
    verified: true,
  },
  {
    name: "Sunday Danladi",
    title: "Licensed Therapist",
    specialization: "Counselling",
    bio: "Sunday Danladi is a therapist grounded in person-centred and integrative approaches. He works with men who struggle to articulate their emotional experiences, helping them build self-awareness and healthy communication.",
    yearsOfExperience: 8,
    location: "Jos, Nigeria",
    languages: ["English", "Hausa", "Berom"],
    imageUrl: "/specialists/sunday-danladi.jpg",
    rating: 4.5,
    availability: "Tue-Sat, 9am-5pm",
    consultationType: "both",
    tags: ["stress", "men's mental health", "emotional intelligence", "relationships"],
    verified: false,
  },

  // ── Family / Marriage Therapists ────────────────────────────
  {
    name: "Mrs. Chidinma Okafor",
    title: "Family Therapist",
    specialization: "Family Therapy",
    bio: "Chidinma Okafor is a systemic family therapist helping families improve communication, resolve conflict, and heal relational wounds. She brings 11 years of experience working with blended families and multigenerational dynamics.",
    yearsOfExperience: 11,
    location: "Onitsha, Nigeria",
    languages: ["English", "Igbo"],
    imageUrl: "/specialists/chidinma-okafor.jpg",
    rating: 4.8,
    availability: "Mon-Thu, 10am-5pm",
    consultationType: "both",
    tags: ["family therapy", "parenting", "conflict resolution", "relationships"],
    verified: true,
  },
  {
    name: "Mr. Rasheed Adekunle",
    title: "Marriage & Couples Counsellor",
    specialization: "Marriage Counselling",
    bio: "Rasheed Adekunle uses Emotionally Focused Therapy (EFT) to help couples rebuild intimacy and trust. He has worked with over 300 couples in 13 years of practice and holds certifications from the International Centre for Excellence in EFT.",
    yearsOfExperience: 13,
    location: "Abuja, Nigeria",
    languages: ["English", "Yoruba"],
    imageUrl: "/specialists/rasheed-adekunle.jpg",
    rating: 4.9,
    availability: "Mon-Fri, 4pm-8pm, Sat 10am-2pm",
    consultationType: "both",
    tags: ["marriage", "couples therapy", "EFT", "intimacy", "infidelity recovery"],
    verified: true,
  },

  // ── Child Psychologists ─────────────────────────────────────
  {
    name: "Dr. Temi Adesanya",
    title: "Child & Adolescent Psychologist",
    specialization: "Child Psychology",
    bio: "Dr. Temi Adesanya specialises in emotional and behavioural challenges in children and teenagers. She uses play therapy, CBT for youth, and parent coaching to create lasting positive change.",
    yearsOfExperience: 9,
    location: "Lagos, Nigeria",
    languages: ["English", "Yoruba"],
    imageUrl: "/specialists/temi-adesanya.jpg",
    rating: 4.9,
    availability: "Mon-Fri, 9am-4pm",
    consultationType: "both",
    tags: ["child psychology", "adolescent", "ADHD", "anxiety", "play therapy"],
    verified: true,
  },
  {
    name: "Mrs. Obiageli Nwofor",
    title: "Child Psychologist",
    specialization: "Child Psychology",
    bio: "Obiageli Nwofor works with children aged 3-16 experiencing anxiety, social difficulties, and learning challenges. She offers school consultations and works closely with parents to ensure consistency between home and therapy.",
    yearsOfExperience: 6,
    location: "Owerri, Nigeria",
    languages: ["English", "Igbo"],
    imageUrl: "/specialists/obiageli-nwofor.jpg",
    rating: 4.7,
    availability: "Mon-Sat, 9am-3pm",
    consultationType: "both",
    tags: ["child psychology", "learning difficulties", "anxiety", "social skills", "parenting"],
    verified: false,
  },

  // ── Behavioural Therapists ──────────────────────────────────
  {
    name: "Dr. Musa Ibrahim",
    title: "Behavioural Therapist",
    specialization: "Behavioural Therapy",
    bio: "Dr. Musa Ibrahim applies behavioural and DBT techniques to help clients with sleep disorders, compulsive behaviours, and emotional dysregulation. He has published in several African psychology journals.",
    yearsOfExperience: 12,
    location: "Maiduguri, Nigeria",
    languages: ["English", "Hausa", "Kanuri"],
    imageUrl: "/specialists/musa-ibrahim.jpg",
    rating: 4.6,
    availability: "Mon-Thu, 9am-5pm",
    consultationType: "virtual",
    tags: ["sleep issues", "DBT", "behavioural therapy", "OCD", "emotional regulation"],
    verified: true,
  },
  {
    name: "Grace Okonkwo",
    title: "Behavioural Therapist",
    specialization: "Behavioural Therapy",
    bio: "Grace Okonkwo helps clients build healthier habits and break destructive patterns using applied behaviour analysis and habit reversal training. She specialises in sleep hygiene and digital addiction.",
    yearsOfExperience: 4,
    location: "Uyo, Nigeria",
    languages: ["English", "Efik", "Ibibio"],
    imageUrl: "/specialists/grace-okonkwo.jpg",
    rating: 4.5,
    availability: "Tue-Sat, 10am-6pm",
    consultationType: "virtual",
    tags: ["sleep issues", "habits", "behavioural therapy", "digital wellness"],
    verified: false,
  },

  // ── Addiction Counsellors ───────────────────────────────────
  {
    name: "Mr. Ifeanyi Okeke",
    title: "Addiction Counsellor",
    specialization: "Addiction Counselling",
    bio: "Ifeanyi Okeke has 16 years of experience supporting individuals in recovery from substance dependence, behavioural addictions, and co-occurring mental health conditions. He integrates motivational interviewing with 12-step facilitation.",
    yearsOfExperience: 16,
    location: "Lagos, Nigeria",
    languages: ["English", "Igbo", "Pidgin"],
    imageUrl: "/specialists/ifeanyi-okeke.jpg",
    rating: 4.8,
    availability: "Mon-Fri, 8am-5pm",
    consultationType: "both",
    tags: ["addiction", "substance use", "recovery", "co-occurring disorders"],
    verified: true,
  },
  {
    name: "Mrs. Blessing Uche",
    title: "Addiction Therapist",
    specialization: "Addiction Counselling",
    bio: "Blessing Uche works with individuals and families affected by addiction, using community reinforcement and harm reduction approaches. She also facilitates group therapy sessions for those in recovery.",
    yearsOfExperience: 7,
    location: "Calabar, Nigeria",
    languages: ["English", "Efik"],
    imageUrl: "/specialists/blessing-uche.jpg",
    rating: 4.6,
    availability: "Mon, Wed, Fri-Sat, 10am-5pm",
    consultationType: "both",
    tags: ["addiction", "harm reduction", "group therapy", "family support"],
    verified: false,
  },

  // ── Anxiety Specialists ─────────────────────────────────────
  {
    name: "Dr. Adeola Savage",
    title: "Anxiety Specialist",
    specialization: "Anxiety Disorders",
    bio: "Dr. Adeola Savage is one of Lagos's leading anxiety specialists, trained in exposure and response prevention (ERP) and acceptance-based therapies. She helps clients regain control over panic disorder, social anxiety, and generalised anxiety.",
    yearsOfExperience: 13,
    location: "Lagos, Nigeria",
    languages: ["English", "Yoruba"],
    email: "adeola.savage@mindbridge.app",
    imageUrl: "/specialists/adeola-savage.jpg",
    rating: 4.9,
    availability: "Mon-Fri, 9am-5pm",
    consultationType: "both",
    tags: ["anxiety", "panic disorder", "social anxiety", "OCD", "ERP", "GAD"],
    verified: true,
  },
  {
    name: "Kemi Fadahunsi",
    title: "Anxiety & Stress Therapist",
    specialization: "Anxiety Disorders",
    bio: "Kemi Fadahunsi combines mindfulness-based stress reduction with CBT techniques to help clients manage anxiety and chronic worry. She offers flexible evening and weekend appointments for working professionals.",
    yearsOfExperience: 5,
    location: "Lagos, Nigeria",
    languages: ["English", "Yoruba"],
    imageUrl: "/specialists/kemi-fadahunsi.jpg",
    rating: 4.7,
    availability: "Weekdays 5pm-9pm, Sat 9am-3pm",
    consultationType: "virtual",
    tags: ["anxiety", "stress", "MBSR", "mindfulness", "worry", "professionals"],
    verified: true,
  },

  // ── Depression Specialists ──────────────────────────────────
  {
    name: "Dr. Tunde Oyelaran",
    title: "Depression Specialist",
    specialization: "Mood Disorders",
    bio: "Dr. Tunde Oyelaran has spent two decades treating depression across its many presentations — from mild low mood to treatment-resistant depression. He uses an integrative model combining pharmacotherapy referrals with psychotherapy.",
    yearsOfExperience: 20,
    location: "Ibadan, Nigeria",
    languages: ["English", "Yoruba"],
    imageUrl: "/specialists/tunde-oyelaran.jpg",
    rating: 4.9,
    availability: "Mon-Fri, 10am-4pm",
    consultationType: "both",
    tags: ["depression", "mood disorders", "bipolar", "grief", "integration"],
    verified: true,
  },
  {
    name: "Dr. Sandra Nkem",
    title: "Psychologist & Depression Therapist",
    specialization: "Mood Disorders",
    bio: "Dr. Sandra Nkem specialises in treating depression, particularly in women, students, and those navigating grief and loss. She uses behavioural activation, interpersonal therapy, and narrative approaches.",
    yearsOfExperience: 8,
    location: "Abuja, Nigeria",
    languages: ["English", "Igbo"],
    imageUrl: "/specialists/sandra-nkem.jpg",
    rating: 4.7,
    availability: "Mon-Sat, 9am-5pm",
    consultationType: "virtual",
    tags: ["depression", "grief", "women's health", "interpersonal therapy", "students"],
    verified: true,
  },

  // ── Stress Management Coaches ───────────────────────────────
  {
    name: "Lanre Akintola",
    title: "Stress Management Coach",
    specialization: "Stress Management",
    bio: "Lanre Akintola is a certified coach and wellness consultant who helps executives and teams build resilience and reduce burnout. His methodology blends neuroscience, productivity frameworks, and mindfulness.",
    yearsOfExperience: 8,
    location: "Lagos, Nigeria",
    languages: ["English", "Yoruba"],
    imageUrl: "/specialists/lanre-akintola.jpg",
    rating: 4.7,
    availability: "Mon-Fri, 7am-9am, 6pm-9pm",
    consultationType: "virtual",
    tags: ["stress", "burnout", "productivity", "resilience", "executive coaching"],
    verified: true,
  },
  {
    name: "Mrs. Fatima Aliyu",
    title: "Wellness & Stress Coach",
    specialization: "Stress Management",
    bio: "Fatima Aliyu draws on holistic wellness practices and cognitive coaching to help individuals manage work-life stress, improve sleep, and cultivate sustainable mental health routines.",
    yearsOfExperience: 6,
    location: "Abuja, Nigeria",
    languages: ["English", "Hausa", "French"],
    imageUrl: "/specialists/fatima-aliyu.jpg",
    rating: 4.6,
    availability: "Mon-Sat, 9am-6pm",
    consultationType: "both",
    tags: ["stress", "sleep issues", "wellness", "mindfulness", "work-life balance"],
    verified: false,
  },

  // ── Mindfulness & Wellbeing ─────────────────────────────────
  {
    name: "Sola Ajayi",
    title: "Mindfulness-Based Therapist",
    specialization: "Mindfulness & Wellbeing",
    bio: "Sola Ajayi is a trained mindfulness teacher and therapist who integrates MBCT and compassion-focused therapy into her work. She runs individual sessions and group mindfulness programmes online.",
    yearsOfExperience: 7,
    location: "Remote / Nationwide",
    languages: ["English", "Yoruba"],
    imageUrl: "/specialists/sola-ajayi.jpg",
    rating: 4.8,
    availability: "Flexible — book anytime",
    consultationType: "virtual",
    tags: ["mindfulness", "MBCT", "stress", "anxiety", "self-compassion", "wellbeing"],
    verified: true,
  },
  {
    name: "David Abah",
    title: "Positive Psychology Coach",
    specialization: "Mindfulness & Wellbeing",
    bio: "David Abah works with clients to build psychological strengths, cultivate meaning, and improve overall wellbeing. He draws on positive psychology, goal-setting, and strengths-based coaching.",
    yearsOfExperience: 4,
    location: "Port Harcourt, Nigeria",
    languages: ["English", "Ijaw"],
    imageUrl: "/specialists/david-abah.jpg",
    rating: 4.5,
    availability: "Mon-Fri, 8am-8pm",
    consultationType: "virtual",
    tags: ["wellbeing", "positive psychology", "coaching", "motivation", "resilience"],
    verified: false,
  },

  // ── Specialist for Sleep ────────────────────────────────────
  {
    name: "Dr. Aisha Mohammed",
    title: "Sleep & Behavioural Therapist",
    specialization: "Sleep Health",
    bio: "Dr. Aisha Mohammed specialises in cognitive behavioural therapy for insomnia (CBT-I) and other sleep disorders. She has worked with shift workers, new parents, and individuals with anxiety-driven sleep problems.",
    yearsOfExperience: 10,
    location: "Abuja, Nigeria",
    languages: ["English", "Hausa", "Arabic"],
    imageUrl: "/specialists/aisha-mohammed.jpg",
    rating: 4.8,
    availability: "Mon-Fri, 9am-5pm",
    consultationType: "both",
    tags: ["sleep issues", "CBT-I", "insomnia", "anxiety", "sleep hygiene"],
    verified: true,
  },

  // ── Additional Diverse Specialists ─────────────────────────
  {
    name: "Dr. Emeka Obi-Okafor",
    title: "Neuropsychologist",
    specialization: "Neuropsychology",
    bio: "Dr. Emeka Obi-Okafor brings neuropsychological expertise to the assessment and treatment of attention, memory, and executive function difficulties. He works with adults who suspect or have diagnosed ADHD.",
    yearsOfExperience: 9,
    location: "Lagos, Nigeria",
    languages: ["English", "Igbo"],
    imageUrl: "/specialists/emeka-obi-okafor.jpg",
    rating: 4.7,
    availability: "Mon-Fri, 10am-4pm",
    consultationType: "both",
    tags: ["ADHD", "neuropsychology", "cognitive assessment", "executive function"],
    verified: true,
  },
  {
    name: "Nneka Obaseki",
    title: "Psychotherapist",
    specialization: "Psychotherapy",
    bio: "Nneka Obaseki is an integrative psychotherapist working with individuals experiencing existential challenges, identity questions, and life-purpose issues. She draws on humanistic and existential frameworks.",
    yearsOfExperience: 11,
    location: "Lagos, Nigeria",
    languages: ["English", "Yoruba", "Bini"],
    imageUrl: "/specialists/nneka-obaseki.jpg",
    rating: 4.8,
    availability: "Tue-Sat, 10am-6pm",
    consultationType: "both",
    tags: ["existential therapy", "identity", "life transitions", "self-esteem", "purpose"],
    verified: true,
  },
  {
    name: "Mr. Ikechukwu Eze",
    title: "Grief & Loss Counsellor",
    specialization: "Grief Counselling",
    bio: "Ikechukwu Eze provides compassionate support to individuals navigating bereavement, pregnancy loss, and the grief of life changes. He uses narrative therapy and continuing bonds theory in his practice.",
    yearsOfExperience: 7,
    location: "Enugu, Nigeria",
    languages: ["English", "Igbo"],
    imageUrl: "/specialists/ikechukwu-eze.jpg",
    rating: 4.6,
    availability: "Mon-Fri, 9am-5pm, Sat 10am-1pm",
    consultationType: "both",
    tags: ["grief", "bereavement", "loss", "trauma", "pregnancy loss"],
    verified: false,
  },
];

async function main() {
  console.log("🌱 Seeding specialists...");

  for (const specialist of specialists) {
    await prisma.specialist.upsert({
      where: {
        // Use a stable composite: name + title
        // We create a unique constraint-free upsert via findFirst + create
        id: `seed-${specialist.name.toLowerCase().replace(/\s+/g, "-")}`,
      },
      update: {
        ...specialist,
      },
      create: {
        id: `seed-${specialist.name.toLowerCase().replace(/\s+/g, "-")}`,
        ...specialist,
      },
    });
    console.log(`  ✅ ${specialist.name} — ${specialist.title}`);
  }

  console.log(`\n✨ Seeded ${specialists.length} specialists successfully.`);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

```

## src/app/(protected)/chat/[[...sessionId]]/page.tsx

```typescript
"use client";

import { useSession } from "next-auth/react";
import { Sparkles, HeartPulse, Brain, ArrowUp } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useChatLogic } from "@/hooks/use-chat-logic";
import { TypingIndicator } from "@/components/TypingIndicator";
import { useEffect, useRef, use } from "react";

export default function DashboardPage({ params }: { params: Promise<{ sessionId?: string[] }> }) {
  const { data: session } = useSession();
  const unwrappedParams = use(params);
  const sessionId = unwrappedParams?.sessionId?.[0];

  const { messages, input, handleInputChange, handleSubmit, isLoading, isHistoryLoading } = useChatLogic(sessionId);

  const scrollRef = useRef<HTMLDivElement>(null);

  const firstName = session?.user?.name?.split(" ")[0] || "there";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const suggestions = [
    { icon: Brain, text: "I'm feeling really overwhelmed with work today." },
    { icon: HeartPulse, text: "I've been experiencing a lot of anxiety lately." },
    { icon: Sparkles, text: "I just want to reflect on my day." },
  ];

  const handleSuggestionClick = async (text: string) => {
    handleInputChange({ target: { value: text } } as any);
    setTimeout(async () => {
      const fakeEvent = { preventDefault: () => {} } as any;
      await handleSubmit(fakeEvent);
    }, 0);
  };

  // Auto-scroll to bottom smoothly
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [messages]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 180)}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        const fakeEvent = { preventDefault: () => {} } as any;
        handleSubmit(fakeEvent);
      }
    }
  };

  // ---- Render decision, in priority order ----
  //
  // 1. We have messages -> always render the chat thread. This is checked
  //    FIRST and is the load-bearing fix: messages now come from the
  //    Zustand store (see useChatLogic), which is re-keyed (not cleared)
  //    when "new" becomes a real sessionId. So at the exact moment
  //    router.replace fires, `messages` is already the same non-empty
  //    array it was a millisecond earlier. There is no render frame in
  //    which sessionId is the new uuid AND messages is empty, because
  //    those two facts are now updated in the same synchronous store
  //    write (promoteDraftToSession), not across a fetch boundary.
  //
  // 2. Only if there are truly zero messages AND we're fetching a cold
  //    session's history do we show the skeleton. This path is only ever
  //    hit for a direct link / refresh into an existing session, never
  //    for the new -> uuid transition.
  //
  // 3. Otherwise, zero messages and not loading -> the welcome screen.
  const showSkeleton = isHistoryLoading && messages.length === 0;
  const showWelcome = !showSkeleton && messages.length === 0;

  return (
    <div className="flex-1 flex flex-col h-screen bg-slate-50">
      <div className="flex-1 overflow-y-auto p-6 md:p-8" ref={scrollRef}>
        <div className="max-w-3xl mx-auto">
          {showSkeleton ? (
            <ChatSkeleton />
          ) : showWelcome ? (
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="text-teal-600" size={36} />
              </div>
              <h1 className="font-serif text-4xl font-semibold text-slate-900 mb-3">
                {getGreeting()}, {firstName}.
              </h1>
              <p className="text-slate-600 text-lg mb-12 max-w-md">
                This is a safe space. How are you feeling today?
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(s.text)}
                    className="flex flex-col items-start p-5 bg-white border border-slate-200 hover:border-teal-200 rounded-xl text-left transition-colors hover:bg-slate-50"
                  >
                    <s.icon size={22} className="text-slate-600 mb-3" />
                    <span className="text-sm text-slate-700 leading-snug">"{s.text}"</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-9 pb-24">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-6 py-4 text-[15.5px] leading-relaxed rounded-2xl ${
                    m.role === 'user'
                      ? 'bg-teal-600 text-white rounded-br-md'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-md'
                  }`}>
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {isLoading && <TypingIndicator />}
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-slate-200 bg-slate-50 p-6">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <textarea
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              rows={1}
              className="w-full resize-none bg-white border border-slate-200 focus:border-slate-300 focus:outline-none rounded-2xl py-4 pl-6 pr-16 text-slate-900 placeholder:text-slate-400 text-[15.5px] leading-relaxed max-h-[180px] overflow-auto scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-3 bottom-3 p-3 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white rounded-xl transition-colors"
            >
              <ArrowUp size={20} strokeWidth={2.5} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const ChatSkeleton = () => (
  <div className="space-y-10 pt-8 max-w-3xl mx-auto">
    <div className="flex justify-start animate-pulse">
      <div className="w-full max-w-[88%] sm:max-w-[82%]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-slate-100 rounded-full" />
          <div className="h-3.5 w-24 bg-slate-100 rounded" />
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-md px-6 py-6">
          <div className="space-y-3">
            <div className="h-4 bg-slate-100 rounded w-11/12" />
            <div className="h-4 bg-slate-100 rounded w-full" />
            <div className="h-4 bg-slate-100 rounded w-4/5" />
          </div>
        </div>
      </div>
    </div>

    <div className="flex justify-end animate-pulse">
      <div className="w-full max-w-[85%] sm:max-w-[78%]">
        <div className="bg-teal-100 rounded-2xl rounded-br-md px-6 py-6">
          <div className="space-y-3">
            <div className="h-4 bg-teal-50 rounded w-4/5" />
            <div className="h-4 bg-teal-50 rounded w-full" />
            <div className="h-4 bg-teal-50 rounded w-3/4" />
          </div>
        </div>
      </div>
    </div>
  </div>
);
```

## src/app/(protected)/dashboard/page.tsx

```typescript
"use client";


import { useSession } from "next-auth/react";
import useSWR from "swr";
import Link from "next/link";
import {
  Heart,
  TrendingUp,
  Flame,
  Brain,
  Zap,
  MessageSquare,
  UserCheck,
  ArrowRight,
  Sparkles,
  Moon,
  Activity,
} from "lucide-react";
import { MoodTrendChart } from "@/components/mood/MoodTrendChart";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((r) => r.json());

const MOOD_EMOJI: Record<string, string> = {
  HAPPY: "😊",
  CALM: "😌",
  HOPEFUL: "🌟",
  NEUTRAL: "😐",
  SAD: "😔",
  ANXIOUS: "😰",
  ANGRY: "😤",
  OVERWHELMED: "😵",
  LONELY: "💙",
  FEARFUL: "😨",
};

const STRESS_COLOUR: Record<string, string> = {
  Low: "text-emerald-600 bg-emerald-50",
  Moderate: "text-amber-600 bg-amber-50",
  High: "text-red-500 bg-red-50",
  Critical: "text-red-700 bg-red-100",
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(" ")[0] ?? "there";

  const { data, isLoading } = useSWR("/api/dashboard", fetcher, {
    refreshInterval: 30_000,
  });

  if (isLoading) return <DashboardSkeleton />;

  const {
    moodSummary,
    weeklyTrend,
    recentMoodEntries,
    stressScore,
    latestInsight,
    recentSessions,
    recommendedSpecialists,
    recommendationReason,
  } = data ?? {};

  const topMoodType = recentMoodEntries?.[0]?.moodType ?? null;

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* ── Header ── */}
        <div>
          <h1 className="font-serif text-3xl font-semibold text-slate-900">
            Good to see you, {firstName}.
          </h1>
          <p className="text-slate-500 mt-1">Here's your wellness overview for this week.</p>
        </div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={<Heart size={20} className="text-rose-500" />}
            label="Current Mood"
            value={
              topMoodType
                ? `${MOOD_EMOJI[topMoodType] ?? "💭"} ${topMoodType}`
                : "Not logged"
            }
            sub={
              recentMoodEntries?.[0]?.intensity
                ? `Intensity ${recentMoodEntries[0].intensity}/10`
                : undefined
            }
          />
          <StatCard
            icon={<Flame size={20} className="text-orange-500" />}
            label="Mood Streak"
            value={`${moodSummary?.currentStreak ?? 0} day${moodSummary?.currentStreak === 1 ? "" : "s"}`}
            sub="Keep it going!"
          />
          <StatCard
            icon={<Activity size={20} className="text-violet-500" />}
            label="Avg. Intensity"
            value={
              moodSummary?.averageIntensity
                ? `${moodSummary.averageIntensity}/10`
                : "—"
            }
            sub="Last 90 days"
          />
          <StatCard
            icon={<Zap size={20} className={stressScore?.label ? STRESS_COLOUR[stressScore.label]?.split(" ")[0] : "text-slate-400"} />}
            label="Stress Score"
            value={`${stressScore?.score ?? 0}/100`}
            sub={stressScore?.label ?? "—"}
            valueClass={stressScore ? STRESS_COLOUR[stressScore.label] : undefined}
          />
        </div>

        {/* ── Weekly Trend Chart + Insight ── */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                <TrendingUp size={18} className="text-teal-600" />
                Weekly Mood Trend
              </h2>
              <Link
                href="/mood"
                className="text-xs text-teal-600 hover:underline flex items-center gap-1"
              >
                Full history <ArrowRight size={12} />
              </Link>
            </div>
            <MoodTrendChart data={weeklyTrend ?? []} />
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h2 className="font-semibold text-slate-800 flex items-center gap-2 mb-3">
                <Sparkles size={18} className="text-amber-500" />
                Weekly Insight
              </h2>
              {latestInsight ? (
                <p className="text-sm text-slate-600 leading-relaxed">
                  {latestInsight.content}
                </p>
              ) : (
                <p className="text-sm text-slate-400 italic">
                  Log your mood daily to unlock AI-generated insights.
                </p>
              )}
            </div>
            <Link
              href="/mood"
              className="mt-4 text-xs text-teal-600 hover:underline flex items-center gap-1"
            >
              Log mood <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* ── Additional Stats Row ── */}
        {(moodSummary?.averageSleepScore || moodSummary?.averageEnergyScore) && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {moodSummary.averageSleepScore && (
              <StatCard
                icon={<Moon size={20} className="text-indigo-500" />}
                label="Avg. Sleep"
                value={`${moodSummary.averageSleepScore}/10`}
                sub="Last 90 days"
              />
            )}
            {moodSummary.averageEnergyScore && (
              <StatCard
                icon={<Zap size={20} className="text-yellow-500" />}
                label="Avg. Energy"
                value={`${moodSummary.averageEnergyScore}/10`}
                sub="Last 90 days"
              />
            )}
            <StatCard
              icon={<Brain size={20} className="text-teal-500" />}
              label="Entries Logged"
              value={`${moodSummary?.totalEntries ?? 0}`}
              sub="Last 90 days"
            />
          </div>
        )}

        {/* ── Bottom Row: Recent Chats + Recommended Specialist ── */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Recent Journal / Chats */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2 mb-4">
              <MessageSquare size={18} className="text-teal-600" />
              Recent Conversations
            </h2>
            {recentSessions?.length > 0 ? (
              <div className="space-y-2">
                {recentSessions.map((s: any) => (
                  <Link
                    key={s.id}
                    href={`/chat/${s.id}`}
                    className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors group"
                  >
                    <span className="text-sm text-slate-700 truncate">{s.title ?? "Untitled Chat"}</span>
                    <ArrowRight size={14} className="text-slate-300 group-hover:text-teal-500 shrink-0 ml-2" />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">No conversations yet. Start chatting!</p>
            )}
            <Link
              href="/chat"
              className="mt-4 inline-flex items-center gap-1 text-xs text-teal-600 hover:underline"
            >
              New conversation <ArrowRight size={12} />
            </Link>
          </div>

          {/* Recommended Specialist */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2 mb-2">
              <UserCheck size={18} className="text-teal-600" />
              Suggested Support
            </h2>
            {recommendationReason && (
              <p className="text-xs text-slate-400 mb-4 leading-relaxed italic">
                {recommendationReason}
              </p>
            )}
            {recommendedSpecialists?.length > 0 ? (
              <div className="space-y-3">
                {recommendedSpecialists.map((sp: any) => (
                  <div
                    key={sp.id}
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-semibold text-sm shrink-0">
                      {sp.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">{sp.name}</p>
                      <p className="text-xs text-slate-500 truncate">{sp.title}</p>
                    </div>
                    <div className="ml-auto shrink-0 text-xs text-amber-600 font-medium">
                      ★ {sp.rating}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">Chat more to receive personalised suggestions.</p>
            )}
            <Link
              href="/support"
              className="mt-4 inline-flex items-center gap-1 text-xs text-teal-600 hover:underline"
            >
              View all specialists <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
  sub,
  valueClass,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  valueClass?: string;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p
        className={`text-xl font-semibold ${valueClass ?? "text-slate-900"} truncate`}
      >
        {value}
      </p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 md:p-8 animate-pulse">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="h-8 bg-slate-200 rounded w-1/3" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 h-28 border border-slate-100" />
          ))}
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl h-56 border border-slate-100" />
          <div className="bg-white rounded-2xl h-56 border border-slate-100" />
        </div>
      </div>
    </div>
  );
}

```

## src/app/(protected)/layout.tsx

```typescript
"use client";

import { useRouter, useParams, usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  LayoutDashboard,
  LogOut,
  Plus,
  Menu,
  X,
  History,
  Smile,
  HeartHandshake,
  MessageCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { useChatStore, selectSidebarRefresh } from "@/store/useChatStore";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => res.json());

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const params = useParams();
  const currentSessionId = Array.isArray(params?.sessionId)
    ? params.sessionId[0]
    : undefined;

  const triggerRefresh = useChatStore(selectSidebarRefresh);
  const resetRefresh = useChatStore((state) => state.resetRefresh);
  const resetActiveChat = useChatStore((state) => state.resetActiveChat);

  const { data, mutate } = useSWR("/api/chat/sessions", fetcher, {
    refreshInterval: 4000,
    revalidateOnFocus: true,
  });

  const sessions = Array.isArray(data) ? data : [];

  useEffect(() => {
    if (triggerRefresh) {
      mutate();
      resetRefresh();
    }
  }, [triggerRefresh, mutate, resetRefresh]);

  const handleCreateNewChat = () => {
    resetActiveChat();
    router.push("/chat");
    setIsMobileDrawerOpen(false);
  };

  // Helper: active nav item style
  const navItemClass = (href: string) => {
    const isActive = pathname === href || (href !== "/chat" && pathname.startsWith(href));
    return `flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-colors ${
      isActive
        ? "bg-teal-600/15 text-teal-300 font-medium"
        : "hover:bg-slate-900 text-slate-400 hover:text-slate-200"
    }`;
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 border-r border-slate-800">
      {/* Logo */}
      <div className="px-6 py-8 font-serif text-2xl font-semibold tracking-tighter border-b border-slate-800">
        🌿 MindBridge
      </div>

      {/* New Chat Button */}
      <div className="p-6">
        <button
          onClick={handleCreateNewChat}
          className="w-full flex items-center justify-center gap-3 bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-lg transition-colors font-medium"
        >
          <Plus size={20} /> New Chat
        </button>
      </div>

      <nav
        className="flex-1 px-2 overflow-y-auto pb-6 sidebar-scroll"
        style={{ scrollbarColor: "#334155 transparent", scrollbarWidth: "thin" }}
      >
        {/* ── Primary Navigation ── */}
        <div className="px-1 mb-6">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3 px-3">
            Menu
          </div>
          <Link
            href="/dashboard"
            className={navItemClass("/dashboard")}
          >
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          {/* <Link
            href="/chat"
            onClick={resetActiveChat}
            className={`flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-colors mt-0.5 ${
              pathname === "/chat" && !currentSessionId
                ? "bg-teal-600/15 text-teal-300 font-medium"
                : "hover:bg-slate-900 text-slate-400 hover:text-slate-200"
            }`}
          >
            <MessageCircle size={18} /> Chat
          </Link> */}
          <Link
            href="/mood"
            className={navItemClass("/mood")}
          >
            <Smile size={18} /> Mood Tracker
          </Link>
          <Link
            href="/support"
            className={navItemClass("/support")}
          >
            <HeartHandshake size={18} /> Support
          </Link>
        </div>

        {/* === TODAY SECTION === */}
        <div className="px-1 mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
            <History size={14} /> Today
          </div>
          <div className="space-y-0.5 pr-2">
            {sessions
              .filter((s: any) => isToday(s.createdAt) || s.title === "New Chat")
              .map((s: any) => {
                const isActive = s.id === currentSessionId;
                return (
                  <Link
                    key={s.id}
                    href={`/chat/${s.id}`}
                    className={`block px-4 py-2.5 text-sm rounded-lg transition-colors truncate ${
                      isActive
                        ? "bg-teal-600/15 text-teal-300 font-medium"
                        : "text-slate-300 hover:text-slate-100 hover:bg-slate-900"
                    }`}
                  >
                    {s.title || "New Chat"}
                  </Link>
                );
              })}
          </div>
        </div>

        {/* === RECENT SECTION === */}
        <div className="px-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
            <History size={14} /> Recent
          </div>
          <div className="space-y-0.5 pr-2">
            {sessions
              .filter((s: any) => !isToday(s.createdAt) && s.title !== "New Chat")
              .map((s: any) => {
                const isActive = s.id === currentSessionId;
                return (
                  <Link
                    key={s.id}
                    href={`/chat/${s.id}`}
                    className={`block px-4 py-2.5 text-sm rounded-lg transition-colors truncate ${
                      isActive
                        ? "bg-teal-600/15 text-teal-300 font-medium"
                        : "text-slate-300 hover:text-slate-100 hover:bg-slate-900"
                    }`}
                  >
                    {s.title || "Untitled Chat"}
                  </Link>
                );
              })}
          </div>
        </div>
      </nav>

      {/* Sign Out */}
      <div className="p-6 border-t border-slate-800 mt-auto">
        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-400 hover:bg-slate-900 hover:text-red-400 rounded-lg transition-colors"
        >
          <LogOut size={18} /> Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex bg-slate-50 overflow-hidden">
      {/* Mobile Menu Trigger */}
      <button
        onClick={() => setIsMobileDrawerOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white border border-slate-200 rounded-lg"
      >
        <Menu size={22} />
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 h-screen overflow-hidden">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      {isMobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-72 h-full bg-slate-950 relative">
            <button
              onClick={() => setIsMobileDrawerOpen(false)}
              className="absolute right-4 top-6 p-2 text-slate-400 hover:text-slate-200"
            >
              <X size={24} />
            </button>
            <SidebarContent />
          </div>
          <div
            className="flex-1 bg-black/60"
            onClick={() => setIsMobileDrawerOpen(false)}
          />
        </div>
      )}

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {children}
      </main>
    </div>
  );
}

/* Helper Functions */
const isToday = (date?: string): boolean => {
  if (!date) return false;
  const d = new Date(date);
  const now = new Date();
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
};

```

## src/app/(protected)/mood/page.tsx

```typescript
"use client";


import { useState } from "react";
import useSWR from "swr";
import { toast } from "sonner";
import {
  Smile,
  Moon,
  Zap,
  Calendar,
  PlusCircle,
  X,
  ChevronDown,
  TrendingUp,
} from "lucide-react";
import { MoodTrendChart } from "@/components/mood/MoodTrendChart";
import { MoodDistributionChart } from "@/components/mood/MoodDistributionChart";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((r) => r.json());

const MOOD_TYPES = [
  { value: "HAPPY", label: "Happy", emoji: "😊" },
  { value: "CALM", label: "Calm", emoji: "😌" },
  { value: "HOPEFUL", label: "Hopeful", emoji: "🌟" },
  { value: "NEUTRAL", label: "Neutral", emoji: "😐" },
  { value: "LONELY", label: "Lonely", emoji: "💙" },
  { value: "ANXIOUS", label: "Anxious", emoji: "😰" },
  { value: "SAD", label: "Sad", emoji: "😔" },
  { value: "OVERWHELMED", label: "Overwhelmed", emoji: "😵" },
  { value: "ANGRY", label: "Angry", emoji: "😤" },
  { value: "FEARFUL", label: "Fearful", emoji: "😨" },
];

export default function MoodPage() {
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    moodType: "",
    intensity: 5,
    note: "",
    sleepScore: "" as string | number,
    energyScore: "" as string | number,
  });

  const { data: entries, mutate: mutateEntries } = useSWR("/api/mood?limit=14", fetcher);
  const { data: summaryData, mutate: mutateSummary } = useSWR("/api/mood/summary", fetcher);

  const handleSubmit = async () => {
    if (!form.moodType) {
      toast.error("Please select a mood type.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          value: form.intensity,
          moodType: form.moodType,
          intensity: form.intensity,
          note: form.note || undefined,
          sleepScore: form.sleepScore !== "" ? Number(form.sleepScore) : undefined,
          energyScore: form.energyScore !== "" ? Number(form.energyScore) : undefined,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("Mood logged!");
      setForm({ moodType: "", intensity: 5, note: "", sleepScore: "", energyScore: "" });
      setShowForm(false);
      mutateEntries();
      mutateSummary();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const { summary, weeklyTrend } = summaryData ?? {};

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* ── Header ── */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-semibold text-slate-900">Mood Tracker</h1>
            <p className="text-slate-500 mt-1">Track how you're feeling over time.</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            <PlusCircle size={18} /> Log Mood
          </button>
        </div>

        {/* ── Log Form Modal ── */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-slate-900 text-lg">How are you feeling?</h2>
                <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={20} />
                </button>
              </div>

              {/* Mood Type Selection */}
              <div className="mb-5">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 block">
                  Mood
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {MOOD_TYPES.map((m) => (
                    <button
                      key={m.value}
                      onClick={() => setForm((p) => ({ ...p, moodType: m.value }))}
                      className={`flex flex-col items-center py-2 rounded-xl border text-xs transition-all ${
                        form.moodType === m.value
                          ? "border-teal-500 bg-teal-50 text-teal-700"
                          : "border-slate-200 hover:border-slate-300 text-slate-600"
                      }`}
                    >
                      <span className="text-xl mb-1">{m.emoji}</span>
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Intensity Slider */}
              <div className="mb-5">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 block">
                  Intensity — {form.intensity}/10
                </label>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={form.intensity}
                  onChange={(e) => setForm((p) => ({ ...p, intensity: Number(e.target.value) }))}
                  className="w-full accent-teal-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>Mild</span><span>Moderate</span><span>Intense</span>
                </div>
              </div>

              {/* Optional Fields */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1 block flex items-center gap-1">
                    <Moon size={11} /> Sleep
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    placeholder="1-10"
                    value={form.sleepScore}
                    onChange={(e) => setForm((p) => ({ ...p, sleepScore: e.target.value }))}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1 block flex items-center gap-1">
                    <Zap size={11} /> Energy
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    placeholder="1-10"
                    value={form.energyScore}
                    onChange={(e) => setForm((p) => ({ ...p, energyScore: e.target.value }))}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-400"
                  />
                </div>
              </div>

              {/* Note */}
              <div className="mb-6">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1 block">
                  Note (optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Anything on your mind?"
                  value={form.note}
                  onChange={(e) => setForm((p) => ({ ...p, note: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-400 resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitting || !form.moodType}
                className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white py-3 rounded-xl font-medium text-sm transition-colors"
              >
                {submitting ? "Saving…" : "Save Mood"}
              </button>
            </div>
          </div>
        )}

        {/* ── Stats Row ── */}
        {summary && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SummaryCard icon={<Calendar size={16} />} label="Total Logs" value={summary.totalEntries} />
            <SummaryCard icon={<Smile size={16} />} label="Avg Intensity" value={`${summary.averageIntensity}/10`} />
            {summary.averageSleepScore && (
              <SummaryCard icon={<Moon size={16} />} label="Avg Sleep" value={`${summary.averageSleepScore}/10`} />
            )}
            {summary.averageEnergyScore && (
              <SummaryCard icon={<Zap size={16} />} label="Avg Energy" value={`${summary.averageEnergyScore}/10`} />
            )}
          </div>
        )}

        {/* ── Charts ── */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2 mb-4">
              <TrendingUp size={18} className="text-teal-600" /> Weekly Trend
            </h2>
            <MoodTrendChart data={weeklyTrend ?? []} />
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2 mb-4">
              <Smile size={18} className="text-teal-600" /> Mood Distribution
            </h2>
            <MoodDistributionChart distribution={summary?.moodDistribution ?? {}} />
          </div>
        </div>

        {/* ── Recent Entries ── */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="font-semibold text-slate-800 mb-4">Recent Logs</h2>
          {Array.isArray(entries) && entries.length > 0 ? (
            <div className="space-y-3">
              {entries.map((entry: any) => {
                const mood = MOOD_TYPES.find((m) => m.value === entry.moodType);
                return (
                  <div
                    key={entry.id}
                    className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl"
                  >
                    <span className="text-2xl">{mood?.emoji ?? "💭"}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-slate-800">
                          {mood?.label ?? entry.moodType ?? `Value: ${entry.value}`}
                        </span>
                        {entry.intensity && (
                          <span className="text-xs text-slate-400">
                            Intensity {entry.intensity}/10
                          </span>
                        )}
                        {entry.sleepScore && (
                          <span className="text-xs text-indigo-500">
                            😴 Sleep {entry.sleepScore}/10
                          </span>
                        )}
                        {entry.energyScore && (
                          <span className="text-xs text-amber-500">
                            ⚡ Energy {entry.energyScore}/10
                          </span>
                        )}
                      </div>
                      {entry.note && (
                        <p className="text-xs text-slate-500 mt-1 truncate">{entry.note}</p>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 shrink-0">
                      {new Date(entry.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-slate-400 italic">No mood logs yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4">
      <div className="flex items-center gap-1.5 text-teal-600 mb-2">{icon}
        <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">{label}</span>
      </div>
      <p className="text-xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}

```

## src/app/(protected)/support/page.tsx

```typescript
"use client";


import useSWR from "swr";
import { useState } from "react";
import {
  Star,
  MapPin,
  Globe,
  Clock,
  Video,
  Users,
  BookOpen,
  Heart,
  Brain,
  Moon,
  Wind,
  Shield,
  ChevronDown,
  ChevronUp,
  BadgeCheck,
} from "lucide-react";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((r) => r.json());

const CONSULT_LABELS: Record<string, string> = {
  virtual: "Virtual",
  physical: "In-Person",
  both: "Virtual & In-Person",
};

const CONSULT_ICON: Record<string, React.ReactNode> = {
  virtual: <Video size={12} />,
  physical: <Users size={12} />,
  both: <Globe size={12} />,
};

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState<"recommended" | "all">("recommended");
  const [expandedResource, setExpandedResource] = useState<string | null>(null);

  const { data: recData, isLoading: recLoading } = useSWR(
    "/api/specialists?recommended=true",
    fetcher
  );

  const { data: allSpecialists, isLoading: allLoading } = useSWR(
    activeTab === "all" ? "/api/specialists" : null,
    fetcher
  );

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* ── Header ── */}
        <div>
          <h1 className="font-serif text-3xl font-semibold text-slate-900">Support & Resources</h1>
          <p className="text-slate-500 mt-1">
            Find professional support tailored to your journey. All recommendations are
            category-based — never a diagnosis.
          </p>
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1 w-fit">
          {[
            { key: "recommended", label: "Recommended For You" },
            { key: "all", label: "All Specialists" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Recommended Specialists ── */}
        {activeTab === "recommended" && (
          <section className="space-y-6">
            {recData?.reason && (
              <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5">
                <p className="text-sm text-teal-800 leading-relaxed">
                  <span className="font-semibold">Why these specialists?</span>{" "}
                  {recData.reason}
                </p>
              </div>
            )}

            {recLoading ? (
              <SpecialistSkeleton count={3} />
            ) : recData?.specialists?.length > 0 ? (
              <div className="space-y-4">
                {recData.specialists.map((sp: any) => (
                  <SpecialistCard key={sp.id} specialist={sp} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400 italic">
                Chat more to receive personalised recommendations.
              </p>
            )}
          </section>
        )}

        {/* ── All Specialists ── */}
        {activeTab === "all" && (
          <section className="space-y-4">
            {allLoading ? (
              <SpecialistSkeleton count={5} />
            ) : Array.isArray(allSpecialists) && allSpecialists.length > 0 ? (
              allSpecialists.map((sp: any) => (
                <SpecialistCard key={sp.id} specialist={sp} />
              ))
            ) : (
              <p className="text-sm text-slate-400 italic">No specialists found.</p>
            )}
          </section>
        )}

        {/* ── Educational Resources ── */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-slate-900 mb-6">
            Educational Resources
          </h2>
          <div className="space-y-3">
            {RESOURCES.map((resource) => (
              <div
                key={resource.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedResource(
                      expandedResource === resource.id ? null : resource.id
                    )
                  }
                  className="w-full flex items-center gap-4 p-5 text-left hover:bg-slate-50 transition-colors"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${resource.iconBg}`}
                  >
                    {resource.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{resource.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{resource.subtitle}</p>
                  </div>
                  {expandedResource === resource.id ? (
                    <ChevronUp size={18} className="text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-slate-400 shrink-0" />
                  )}
                </button>
                {expandedResource === resource.id && (
                  <div className="px-5 pb-5 border-t border-slate-100 pt-4 space-y-3">
                    {resource.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-slate-800">{item.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Crisis Resources ── */}
        <section className="bg-rose-50 border border-rose-100 rounded-2xl p-6">
          <h3 className="font-semibold text-rose-800 flex items-center gap-2 mb-3">
            <Shield size={18} /> Crisis Support
          </h3>
          <p className="text-sm text-rose-700 mb-4 leading-relaxed">
            If you are experiencing a mental health emergency, please reach out immediately.
          </p>
          <div className="space-y-2">
            {CRISIS_RESOURCES.map((r, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-rose-800">
                <span className="font-semibold">{r.name}:</span>
                <span>{r.contact}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

// ── Specialist Card ───────────────────────────────────────────

function SpecialistCard({ specialist: sp }: { specialist: any }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-2xl bg-teal-100 flex items-center justify-center text-teal-700 font-semibold text-lg shrink-0">
          {sp.name
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .slice(0, 2)}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-slate-900">{sp.name}</h3>
            {sp.verified && (
              <BadgeCheck size={16} className="text-teal-500 shrink-0" />
            )}
          </div>
          <p className="text-sm text-slate-500 mt-0.5">{sp.title}</p>
          <p className="text-xs text-teal-700 font-medium mt-1">{sp.specialization}</p>

          <div className="flex flex-wrap gap-3 mt-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Star size={12} className="text-amber-400 fill-amber-400" />
              {sp.rating}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen size={12} />
              {sp.yearsOfExperience} yrs experience
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              {sp.location}
            </span>
            <span className="flex items-center gap-1">
              {CONSULT_ICON[sp.consultationType]}
              {CONSULT_LABELS[sp.consultationType]}
            </span>
          </div>

          <div className="flex flex-wrap gap-3 mt-2 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Globe size={12} />
              {sp.languages?.join(", ")}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {sp.availability}
            </span>
          </div>

          <p className="text-xs text-slate-500 mt-3 leading-relaxed line-clamp-2">{sp.bio}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {sp.tags?.slice(0, 4).map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecialistSkeleton({ count }: { count: number }) {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 h-36" />
      ))}
    </div>
  );
}

// ── Static Data ───────────────────────────────────────────────

const CRISIS_RESOURCES = [
  { name: "Nigeria Suicide Prevention", contact: "0800-SUICIDE (0800-784-2433)" },
  { name: "LASUTH Psychiatric Emergency", contact: "+234-01-793-0284" },
  { name: "Crisis Text Line (International)", contact: "Text HOME to 741741" },
  { name: "WHO Mental Health Helpline", contact: "Visit who.int/mental_health" },
];

const RESOURCES = [
  {
    id: "anxiety",
    title: "Understanding Anxiety",
    subtitle: "What it is, what it feels like, and how to cope",
    icon: <Heart size={20} className="text-rose-500" />,
    iconBg: "bg-rose-50",
    items: [
      {
        title: "Recognising Anxiety",
        description:
          "Anxiety is your body's natural response to stress. It becomes a concern when it interferes with daily life. Common signs include racing thoughts, physical tension, and avoidance.",
      },
      {
        title: "Grounding Techniques",
        description:
          "The 5-4-3-2-1 method can help bring you back to the present moment: name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.",
      },
      {
        title: "Breathing Exercises",
        description:
          "Box breathing (inhale 4 counts, hold 4, exhale 4, hold 4) activates your parasympathetic nervous system and can reduce acute anxiety.",
      },
      {
        title: "When to Seek Help",
        description:
          "If anxiety is persistent, impairing your daily function, or causing panic attacks, speaking with a CBT therapist or anxiety specialist may be beneficial.",
      },
    ],
  },
  {
    id: "stress",
    title: "Stress Management",
    subtitle: "Tools and perspectives for managing daily stress",
    icon: <Brain size={20} className="text-violet-500" />,
    iconBg: "bg-violet-50",
    items: [
      {
        title: "Identifying Your Stressors",
        description:
          "Stress becomes manageable when you can name its sources. Journaling or mood tracking helps identify patterns — is your stress higher on certain days or in certain contexts?",
      },
      {
        title: "Time Boundaries",
        description:
          "Setting clear work-life boundaries reduces chronic stress. Consider regular 'switching off' rituals: a short walk, turning off notifications, or a fixed end-of-day routine.",
      },
      {
        title: "Physical Release",
        description:
          "Stress hormones are designed to fuel physical action. Even brief walks, stretching, or light exercise can help metabolise cortisol and adrenaline effectively.",
      },
      {
        title: "Social Support",
        description:
          "Talking to trusted people reduces the physiological impact of stress. You do not need to solve your problems to benefit — being heard is itself healing.",
      },
    ],
  },
  {
    id: "depression",
    title: "Navigating Low Mood & Depression",
    subtitle: "Understanding the difference and finding your way forward",
    icon: <Wind size={20} className="text-blue-500" />,
    iconBg: "bg-blue-50",
    items: [
      {
        title: "Low Mood vs. Depression",
        description:
          "Low mood is temporary and often tied to circumstances. Depression is more persistent, affects multiple areas of life, and may include physical symptoms like fatigue, appetite changes, and difficulty concentrating.",
      },
      {
        title: "Behavioural Activation",
        description:
          "Depression often reduces motivation, which reduces activity, which deepens depression. Gently reintroducing small, enjoyable or meaningful activities — even when motivation is low — can break this cycle.",
      },
      {
        title: "Self-Compassion",
        description:
          "Depression is not a character flaw or weakness. Treating yourself with the kindness you would extend to a friend can soften the self-critical voice that often accompanies low mood.",
      },
      {
        title: "Professional Support",
        description:
          "Depression is treatable. Psychotherapy (especially CBT and interpersonal therapy) and, where appropriate, medication can significantly reduce symptoms. Consider speaking with a counsellor or psychologist.",
      },
    ],
  },
  {
    id: "sleep",
    title: "Sleep Health",
    subtitle: "Building a foundation for restorative rest",
    icon: <Moon size={20} className="text-indigo-500" />,
    iconBg: "bg-indigo-50",
    items: [
      {
        title: "Sleep Hygiene Basics",
        description:
          "Consistent sleep and wake times, a cool and dark bedroom, and avoiding screens for 30-60 minutes before bed are among the most evidence-based steps for improving sleep quality.",
      },
      {
        title: "Managing Worry at Night",
        description:
          "If racing thoughts keep you awake, a 'worry journal' before bed — writing down thoughts and a brief plan — can help externalise the mental load and reduce nighttime rumination.",
      },
      {
        title: "The Anxiety-Sleep Cycle",
        description:
          "Poor sleep increases anxiety, and anxiety worsens sleep. CBT-I (Cognitive Behavioural Therapy for Insomnia) is the gold standard treatment and often more effective than medication long-term.",
      },
    ],
  },
  {
    id: "mindfulness",
    title: "Mindfulness & Wellbeing",
    subtitle: "Cultivating presence and emotional resilience",
    icon: <Heart size={20} className="text-teal-500" />,
    iconBg: "bg-teal-50",
    items: [
      {
        title: "What Is Mindfulness?",
        description:
          "Mindfulness is the practice of paying deliberate, non-judgmental attention to the present moment. It does not require clearing your mind — simply noticing thoughts without getting swept away by them.",
      },
      {
        title: "Starting a Practice",
        description:
          "Begin with just 5 minutes daily. Choose a consistent time, sit comfortably, and focus on your breath. When your mind wanders (it will), gently return your attention without self-criticism.",
      },
      {
        title: "Mindfulness in Daily Life",
        description:
          "You do not need a formal meditation session to be mindful. Eating slowly, walking without your phone, or fully focusing on a single task are all mindfulness practices.",
      },
      {
        title: "Evidence-Based Benefits",
        description:
          "Research supports mindfulness for reducing anxiety, improving emotional regulation, decreasing rumination, and increasing overall wellbeing — even with brief, consistent practice.",
      },
    ],
  },
];

```

## src/app/api/auth/[...nextauth]/route.ts

```typescript
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

## src/app/api/auth/register/route.ts

```typescript
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password } = body;

    // 1. Make sure all fields are filled out
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "Please fill in all fields." }, 
        { status: 400 }
      );
    }

    // 2. Check if the user already exists in SQLite
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "This email is already registered." }, 
        { status: 400 }
      );
    }

    // 3. Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Save the new user to the database
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      }
    });

    // 5. Send success back to the frontend so NextAuth can log them in
    return NextResponse.json({ success: true }, { status: 201 });

  } catch (error: any) {
    console.error("SERVER ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}
```

## src/app/api/chat/history/route.ts

```typescript
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('sessionId');
  if (!sessionId) return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });

  // Verify ownership before fetching messages
  const chatSession = await prisma.chatSession.findFirst({
    where: { 
      id: sessionId,
      userId: session.user.id // This acts as your security guard
    }
  });

  if (!chatSession) {
    return NextResponse.json({ error: 'Not found or unauthorized' }, { status: 404 });
  }

  const messages = await prisma.message.findMany({
    where: { sessionId },
    orderBy: { createdAt: 'asc' },
  });

  return NextResponse.json(messages);
}
```

## src/app/api/chat/route.ts

```typescript
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import OpenAI from "openai";
import { analyseMessage } from "@/lib/services/ai-analysis.service";


const groq = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

type Message = {
  role: "user" | "assistant";
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

const titlePrompt = `
You generate chat session titles.

Rules:
- Output ONLY the title.
- 3 to 6 words maximum.
- Must be a short noun phrase, not a sentence.
- No punctuation (no periods, commas, colons).
- No quotes.
- No "Chat about", "Discussion on", or similar prefixes.
- No repetition of words from the input unless essential.
- Make it sound like a clean app conversation title.

Style guidelines:
- Prefer natural human labeling like:
  "Work Stress Reflection", "Overthinking Late Night", "Relationship Confusion"
- Avoid generic titles like "New Chat", "Conversation", "User Message"
- Avoid full sentences like "I feel overwhelmed today"

Return only the title text.
`;

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  let { messages, sessionId }: { messages: Message[]; sessionId?: string } =
    await req.json();

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

  const savedUserMessage = await prisma.message.create({
    data: {
      sessionId,
      role: "user",
      content: userMessage.content,
      userId,
    },
  });


  analyseMessage(userMessage.content).then(async (analysis) => {
    if (!analysis) return;
    try {
      await prisma.messageAnalysis.create({
        data: {
          messageId: savedUserMessage.id,
          emotion: analysis.emotion,
          intensity: analysis.intensity,
          riskLevel: analysis.riskLevel,
        },
      });
    } catch (err) {
      console.error("[Chat] Failed to save message analysis:", err);
    }
  });

  const aiMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },
    ...messages.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
  ];

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: aiMessages,
    stream: true,
  });

  const stream = new ReadableStream({
    async start(controller) {
      let fullResponse = "";

      try {
        for await (const chunk of response) {
          const text = chunk.choices[0]?.delta?.content || "";
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
          role: "assistant",
          content: fullResponse,
          userId,
        },
      });

      // Background Title Generation (only for new chats)
      if (isNewSession) {
        try {
          const titleCompletion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
              { role: "system", content: titlePrompt },
              { role: "user", content: userMessage.content },
            ],
            temperature: 0.7,
            max_tokens: 20,
          });

          let newTitle =
            titleCompletion.choices[0]?.message?.content?.trim() || "New Chat";

          newTitle = newTitle.replace(/^["']|["']$/g, "").trim();

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
      "X-Session-Id": sessionId,
      "Content-Type": "text/event-stream",
    },
  });
}

```

## src/app/api/chat/sessions/route.ts

```typescript
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const chats = await prisma.chatSession.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(chats);
}
```

## src/app/api/dashboard/route.ts

```typescript
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getMoodSummary, getWeeklyMoodTrend, getRecentMoodEntries } from "@/lib/services/mood.service";
import { getStressScore, getDominantEmotions } from "@/lib/services/analytics.service";
import { getLatestInsight } from "@/lib/services/insight.service";
import { getSpecialistRecommendations } from "@/lib/services/specialist-recommendation.service";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  // Fetch everything in parallel
  const [
    moodSummary,
    weeklyTrend,
    recentMoodEntries,
    stressScore,
    dominantEmotions,
    latestInsight,
    recentSessions,
  ] = await Promise.all([
    getMoodSummary(userId),
    getWeeklyMoodTrend(userId),
    getRecentMoodEntries(userId, 5),
    getStressScore(userId),
    getDominantEmotions(userId),
    getLatestInsight(userId),
    prisma.chatSession.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: 3,
      select: { id: true, title: true, updatedAt: true },
    }),
  ]);

  // Get specialist recommendations based on patterns
  const { specialists, reason } = await getSpecialistRecommendations(
    dominantEmotions,
    stressScore.label === "Critical" ? "HIGH" : "LOW"
  );

  return NextResponse.json({
    moodSummary,
    weeklyTrend,
    recentMoodEntries,
    stressScore,
    dominantEmotions,
    latestInsight,
    recentSessions,
    recommendedSpecialists: specialists.slice(0, 2),
    recommendationReason: reason,
  });
}

```

## src/app/api/insights/route.ts

```typescript
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

```

## src/app/api/mood/route.ts

```typescript
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

```

## src/app/api/mood/summary/route.ts

```typescript
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

```

## src/app/api/specialists/route.ts

```typescript
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

```

## src/app/globals.css

```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}



.sidebar-scroll::-webkit-scrollbar {
  width: 6px;
}
 
.sidebar-scroll::-webkit-scrollbar-track {
  background: transparent;
}
 
.sidebar-scroll::-webkit-scrollbar-thumb {
  background-color: #334155; /* slate-700, matches the inline scrollbarColor */
  border-radius: 9999px;
}
 
.sidebar-scroll::-webkit-scrollbar-thumb:hover {
  background-color: #475569; /* slate-600 */
}
```

## src/app/layout.tsx

```typescript
import type { Metadata } from "next";
import { Nunito, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { AuthProvider } from "../components/Providers";

const nunito = Nunito({ 
  subsets: ["latin"],
  variable: '--font-nunito' 
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  style: ['normal', 'italic'],
  variable: '--font-playfair' 
});

export const metadata: Metadata = {
  title: 'MindBridge | AI Mental Wellness',
  description: 'Your safe space for reflection and AI-powered mental support.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://mindbridge.app',
    title: 'MindBridge',
    description: 'AI-driven mental health support and daily reflection.',
    siteName: 'MindBridge',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'MindBridge App Preview',
    }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${playfair.variable} font-sans bg-slate-50 text-slate-900`}>
        <AuthProvider>
          {/* THE TOASTER MUST BE HERE */}
          <Toaster richColors position="top-center" theme="light" className="font-sans" />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

## src/app/login/page.tsx

```typescript
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "signup") {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong during registration.");
        }
        
        toast.success("Account created successfully!");
      }

      const result = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (result?.error) {
        throw new Error("Invalid email or password");
      }

      toast.success("Welcome back!");
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <div className="hidden lg:flex w-[420px] bg-gradient-to-br from-slate-900 to-slate-800 flex-col p-12 relative overflow-hidden">
        <div className="absolute w-[300px] h-[300px] bg-teal-500 rounded-full blur-[80px] opacity-20 -bottom-12 -right-20" />
        <div className="absolute w-[200px] h-[200px] bg-emerald-500 rounded-full blur-[80px] opacity-20 top-24 -left-16" />

        <div className="relative z-10 flex-1 flex flex-col">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-xl flex items-center justify-center text-xl shadow-md">🌿</div>
            <div className="font-serif text-2xl font-bold text-white">MindBridge<span className="text-teal-400">.</span></div>
          </div>

          <div className="mt-auto font-serif text-[22px] italic text-slate-300 leading-relaxed">
            "You don't have to control your thoughts. You just have to stop letting them control you."
            <div className="text-slate-500 text-sm mt-4 font-sans not-italic">— Dan Millman</div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[460px] bg-white rounded-3xl p-10 shadow-sm border-1 border-slate-100">
          <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2 tracking-tight">
            {mode === "login" ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-slate-500 text-sm mb-8 font-sans">
            {mode === "login"
              ? "Sign in to your MindBridge account"
              : "Join our wellness community today"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2 tracking-wide uppercase font-sans">First Name</label>
                  <input required name="firstName" value={form.firstName} onChange={handleChange} className="font-sans w-full p-3 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all text-sm text-slate-900 placeholder:text-slate-400" placeholder="Amara" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2 tracking-wide uppercase font-sans">Last Name</label>
                  <input required name="lastName" value={form.lastName} onChange={handleChange} className="font-sans w-full p-3 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all text-sm text-slate-900 placeholder:text-slate-400" placeholder="Obi" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2 tracking-wide uppercase font-sans">Email Address</label>
              <input required type="email" name="email" value={form.email} onChange={handleChange} className="font-sans w-full p-3 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all text-sm text-slate-900 placeholder:text-slate-400" placeholder="you@example.com" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2 tracking-wide uppercase font-sans">Password</label>
              <input required type="password" name="password" value={form.password} onChange={handleChange} className="font-sans w-full p-3 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all text-sm text-slate-900 placeholder:text-slate-400" placeholder="••••••••" />
            </div>

            <button disabled={loading} type="submit" className="font-sans w-full p-4 mt-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-white font-bold transition-all shadow-sm disabled:opacity-70">
              {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="text-center mt-8 text-slate-500 text-sm font-sans">
            {mode === "login" ? (
              <>New here? <button onClick={() => setMode("signup")} className="text-teal-600 font-bold hover:underline">Create account</button></>
            ) : (
              <>Have an account? <button onClick={() => setMode("login")} className="text-teal-600 font-bold hover:underline">Sign in</button></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

## src/app/page.tsx

```typescript
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Brain, HeartPulse, ShieldCheck, ArrowRight, Menu, X } from 'lucide-react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="w-full px-6 py-8 flex items-center justify-between z-50">
        <div className="flex items-center gap-2 font-serif text-2xl font-bold">
          <span className="text-teal-600 text-xl">🌿</span> MindBridge
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/login" className="text-sm font-semibold hover:text-teal-600 transition-colors">Sign In</Link>
          <Link href="/login" className="px-6 py-2.5 bg-slate-900 text-white text-sm rounded-full font-semibold hover:bg-slate-800 transition-all">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 z-50 relative" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <Link href="/login" className="text-2xl font-medium" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
        <Link href="/login" className="px-8 py-4 bg-teal-600 text-white rounded-full text-lg font-medium" onClick={() => setIsMenuOpen(false)}>
          Get Started
        </Link>
      </div>

      {/* Hero Section */}
      <main className="w-full px-6 pt-16 md:pt-24 pb-20 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase text-teal-700 bg-teal-50 rounded-full">
          Reflect. Grow. Heal.
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-6 tracking-tight">
          Your thoughts, <br className="hidden md:block"/> understood.
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-lg mx-auto leading-relaxed px-2">
          MindBridge provides a safe, non-judgmental space to reflect on your day 
          and gain clarity through empathetic AI conversation.
        </p>
        <Link 
          href="/login"
          className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 text-white rounded-full text-base font-semibold hover:bg-teal-700 transition-all"
        >
          Get Started <ArrowRight size={18} />
        </Link>
      </main>

      {/* Features Grid */}
      <section className="w-full px-6 py-20 border-t border-slate-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <FeatureCard icon={<Brain size={24} className="text-teal-600" />} title="Empathetic AI" desc="Conversations designed to listen, reflect, and guide you through complex emotions." />
          <FeatureCard icon={<HeartPulse size={24} className="text-teal-600" />} title="Mood Tracking" desc="Visualize your emotional trends over time with daily check-ins." />
          <FeatureCard icon={<ShieldCheck size={24} className="text-teal-600" />} title="Private & Secure" desc="Your reflections belong to you. Your data is encrypted and strictly private." />
        </div>
      </section>
      
      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-slate-100 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>© 2026 MindBridge. All rights reserved.</div>
        <div className="flex gap-8">
          <Link href="/privacy" className="hover:text-teal-600">Privacy</Link>
          <Link href="/terms" className="hover:text-teal-600">Terms</Link>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="space-y-4 px-2">
      <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-base">{desc}</p>
    </div>
  );
}
```

## src/components/Providers.tsx

```typescript
"use client";

import { SessionProvider } from "next-auth/react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
```

## src/components/TypingIndicator.tsx

```typescript
export const TypingIndicator = () => (
  <div className="flex gap-1 p-4 bg-slate-100 rounded-2xl w-fit">
    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
  </div>
);
```

## src/components/mood/MoodDistributionChart.tsx

```typescript
"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const MOOD_COLOURS: Record<string, string> = {
  HAPPY: "#10b981",
  CALM: "#6366f1",
  HOPEFUL: "#f59e0b",
  NEUTRAL: "#94a3b8",
  LONELY: "#60a5fa",
  ANXIOUS: "#f97316",
  SAD: "#3b82f6",
  OVERWHELMED: "#8b5cf6",
  ANGRY: "#ef4444",
  FEARFUL: "#ec4899",
};

interface Props {
  distribution: Record<string, number>;
}

export function MoodDistributionChart({ distribution }: Props) {
  const data = Object.entries(distribution).map(([name, value]) => ({
    name,
    value,
  }));

  if (data.length === 0) {
    return (
      <div className="h-40 flex items-center justify-center text-sm text-slate-400 italic">
        No distribution data yet.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={180}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={45}
          outerRadius={70}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry) => (
            <Cell
              key={entry.name}
              fill={MOOD_COLOURS[entry.name] ?? "#94a3b8"}
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: any, name: any) => [value, name]}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          formatter={(v) =>
            v.charAt(0) + v.slice(1).toLowerCase()
          }
          wrapperStyle={{ fontSize: "11px" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
```

## src/components/mood/MoodTrendChart.tsx

```typescript
"use client";

// src/components/mood/MoodTrendChart.tsx
// ============================================================
// Weekly Mood Trend Bar Chart using recharts.
// recharts must be added: pnpm add recharts
// ============================================================

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

type TrendPoint = {
  date: string;
  label: string;
  average: number | null;
  count: number;
};

interface MoodTrendChartProps {
  data: TrendPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload as TrendPoint;
    return (
      <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm text-sm">
        <p className="font-medium text-slate-800">{d.label}</p>
        {d.average !== null ? (
          <p className="text-teal-600 mt-0.5">Avg intensity: {d.average}/10</p>
        ) : (
          <p className="text-slate-400 mt-0.5 italic">No entries</p>
        )}
        {d.count > 0 && (
          <p className="text-slate-400 mt-0.5">{d.count} log{d.count === 1 ? "" : "s"}</p>
        )}
      </div>
    );
  }
  return null;
};

export function MoodTrendChart({ data }: MoodTrendChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-40 flex items-center justify-center text-sm text-slate-400 italic">
        No mood data yet. Start logging to see your trend.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} barSize={28}>
        <CartesianGrid vertical={false} stroke="#f1f5f9" />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 12, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[0, 10]}
          ticks={[0, 2, 4, 6, 8, 10]}
          tick={{ fontSize: 11, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
          width={24}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
        <Bar dataKey="average" radius={[6, 6, 0, 0]}>
          {data.map((entry, i) => (
            <Cell
              key={i}
              fill={entry.average === null ? "#e2e8f0" : "#0d9488"}
              opacity={entry.average === null ? 0.4 : 1}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

```

## src/hooks/use-chat-logic.ts

```typescript
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  useChatStore,
  selectActiveMessages,
  type ChatMessage,
} from '@/store/useChatStore';

export function useChatLogic(sessionId?: string) {
  const router = useRouter();

  const messages = useChatStore(selectActiveMessages);
  const setMessages = useChatStore((s) => s.setMessages);
  const startDraftSession = useChatStore((s) => s.startDraftSession);
  const promoteDraftToSession = useChatStore((s) => s.promoteDraftToSession);
  const loadHistoryForSession = useChatStore((s) => s.loadHistoryForSession);
  const isHydrated = useChatStore((s) => s.isHydrated);
  const triggerSidebarRefresh = useChatStore((s) => s.triggerRefresh);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);

  const draftKeyRef = useRef<string | null>(null);

  useEffect(() => {
    const isNewChat = !sessionId || sessionId === 'new';

    if (isNewChat) {
      if (!draftKeyRef.current) {
        setMessages([]);
      }
      setIsHistoryLoading(false);
      return;
    }
    if (isHydrated(sessionId)) {
      setIsHistoryLoading(false);
      draftKeyRef.current = null; // promotion complete, clear the draft marker
      return;
    }

    let cancelled = false;
    const fetchHistory = async () => {
      setIsHistoryLoading(true);
      try {
        const res = await fetch(`/api/chat/history?sessionId=${sessionId}`, {
          credentials: 'include',
        });
        if (res.ok && !cancelled) {
          const data: ChatMessage[] = await res.json();
          loadHistoryForSession(sessionId, data);
        }
      } catch (err) {
        console.error('Failed to load history:', err);
      } finally {
        if (!cancelled) setIsHistoryLoading(false);
      }
    };

    fetchHistory();
    return () => {
      cancelled = true;
    };
  }, [sessionId, isHydrated, loadHistoryForSession, setMessages]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const currentInput = input.trim();
      if (!currentInput) return;

      const isNewChat = !sessionId || sessionId === 'new';

      if (isNewChat && !draftKeyRef.current) {
        draftKeyRef.current = startDraftSession();
      }

      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: currentInput,
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...messages, userMessage],
            sessionId: sessionId || 'new',
          }),
          credentials: 'include',
        });

        if (!response.ok) throw new Error('Server error');

        const newSessionId = response.headers.get('X-Session-Id');

        if (isNewChat && newSessionId) {
          promoteDraftToSession(newSessionId);
          draftKeyRef.current = newSessionId;

          router.replace(`/chat/${newSessionId}`, { scroll: false });
          triggerSidebarRefresh();
        }

        if (!response.body) throw new Error('No response body');

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        const assistantMessageId = (Date.now() + 1).toString();

        setMessages((prev) => [
          ...prev,
          { id: assistantMessageId, role: 'assistant', content: '' },
        ]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMessageId ? { ...m, content: m.content + chunk } : m
            )
          );
        }
      } catch (err) {
        console.error('Chat Error:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [input, messages, sessionId, router, triggerSidebarRefresh, setMessages, startDraftSession, promoteDraftToSession]
  );

  return {
    messages,
    input,
    handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value),
    handleSubmit,
    isLoading,
    isHistoryLoading,
  };
}
```

## src/lib/prisma.ts

```typescript
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
export default prisma;
```

## src/lib/services/ai-analysis.service.ts

```typescript
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

```

## src/lib/services/analytics.service.ts

```typescript
import prisma from "@/lib/prisma";

/** Retrieve recent message analyses for a user */
export async function getRecentAnalyses(userId: string, limit = 50) {
  return prisma.messageAnalysis.findMany({
    where: {
      message: { userId },
    },
    include: { message: { select: { createdAt: true } } },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export type EmotionFrequency = {
  emotion: string;
  count: number;
  percentage: number;
};

/** Compute emotion frequency distribution from recent analyses */
export async function getEmotionFrequencies(
  userId: string,
  days = 30
): Promise<EmotionFrequency[]> {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const analyses = await prisma.messageAnalysis.findMany({
    where: {
      message: {
        userId,
        createdAt: { gte: since },
      },
    },
    select: { emotion: true },
  });

  if (analyses.length === 0) return [];

  const counts: Record<string, number> = {};
  for (const a of analyses) {
    counts[a.emotion] = (counts[a.emotion] ?? 0) + 1;
  }

  const total = analyses.length;
  return Object.entries(counts)
    .map(([emotion, count]) => ({
      emotion,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}

export type StressScore = {
  score: number;  // 0-100
  label: string;  // "Low" | "Moderate" | "High" | "Critical"
  trend: "up" | "down" | "stable";
};

/**
 * Compute a stress score (0-100) from recent analyses.
 * Uses HIGH/CRISIS risk levels and negative emotions as signals.
 */
export async function getStressScore(userId: string): Promise<StressScore> {
  const [recent, older] = await Promise.all([
    prisma.messageAnalysis.findMany({
      where: {
        message: { userId },
        createdAt: { gte: nDaysAgo(7) },
      },
      select: { riskLevel: true, intensity: true, emotion: true },
    }),
    prisma.messageAnalysis.findMany({
      where: {
        message: { userId },
        createdAt: { gte: nDaysAgo(14), lt: nDaysAgo(7) },
      },
      select: { riskLevel: true, intensity: true, emotion: true },
    }),
  ]);

  const scoreOf = (analyses: typeof recent) => {
    if (analyses.length === 0) return 0;
    const negativeEmotions = new Set(["ANXIOUS", "SAD", "ANGRY", "FEARFUL", "OVERWHELMED", "LONELY"]);
    const weights = { LOW: 0.2, MODERATE: 0.5, HIGH: 0.8, CRISIS: 1.0 };
    const base =
      analyses.reduce((sum, a) => {
        const riskWeight = weights[a.riskLevel as keyof typeof weights] ?? 0.2;
        const isNeg = negativeEmotions.has(a.emotion) ? 1 : 0;
        return sum + (a.intensity / 10) * riskWeight * (isNeg ? 1.2 : 0.5);
      }, 0) / analyses.length;
    return Math.min(100, Math.round(base * 100));
  };

  const currentScore = scoreOf(recent);
  const previousScore = scoreOf(older);

  const trend: StressScore["trend"] =
    currentScore > previousScore + 5
      ? "up"
      : currentScore < previousScore - 5
      ? "down"
      : "stable";

  const label =
    currentScore >= 70
      ? "Critical"
      : currentScore >= 50
      ? "High"
      : currentScore >= 25
      ? "Moderate"
      : "Low";

  return { score: currentScore, label, trend };
}

/** Get dominant emotions in the last N days */
export async function getDominantEmotions(
  userId: string,
  days = 14
): Promise<string[]> {
  const freqs = await getEmotionFrequencies(userId, days);
  return freqs.slice(0, 3).map((f) => f.emotion);
}

// ── Helpers ──────────────────────────────────────────────────

function nDaysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

```

## src/lib/services/insight.service.ts

```typescript
import OpenAI from "openai";
import prisma from "@/lib/prisma";
import { getMoodEntriesInRange } from "./mood.service";
import { getEmotionFrequencies } from "./analytics.service";

const groq = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

const INSIGHT_PROMPT = `
You are a compassionate mental wellness analyst.

You will receive a summary of a user's mood and emotional data from the past week.
Generate 2 to 4 meaningful, supportive observations.

Rules:
- Never diagnose the user with any condition.
- Use gentle, supportive language: "you may have noticed", "it seems", "you might find".
- Focus on patterns, not problems.
- Be specific and grounded in the data provided.
- Each insight should be a single clear sentence.
- Return ONLY a JSON array of strings. No preamble, no markdown.

Example:
["Anxiety appears to peak on weekday mornings, which may reflect work-related pressure.","Sleep scores tend to be lower when stress intensity is higher — these two are often connected."]
`.trim();

/** Get the Monday of the current week */
function getWeekStart(date = new Date()): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sun
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Generate (or retrieve cached) weekly insights for a user.
 * Safe to call multiple times — returns cached if already generated this week.
 */
export async function generateWeeklyInsights(userId: string) {
  const weekStart = getWeekStart();

  // Return cached insight for this week if it exists
  const existing = await prisma.weeklyInsight.findUnique({
    where: { userId_weekStart: { userId, weekStart } },
  });
  if (existing) return existing;

  // Gather data for the past 7 days
  const weekEnd = new Date();
  const [moodEntries, emotionFreqs] = await Promise.all([
    getMoodEntriesInRange(userId, weekStart, weekEnd),
    getEmotionFrequencies(userId, 7),
  ]);

  // Build a compact data summary for the AI
  const avgMood =
    moodEntries.length > 0
      ? (moodEntries.reduce((s, e) => s + (e.intensity ?? e.value), 0) /
          moodEntries.length).toFixed(1)
      : "N/A";

  const avgSleep =
    moodEntries.filter((e) => e.sleepScore).length > 0
      ? (
          moodEntries.reduce((s, e) => s + (e.sleepScore ?? 0), 0) /
          moodEntries.filter((e) => e.sleepScore).length
        ).toFixed(1)
      : "N/A";

  const topEmotions = emotionFreqs
    .slice(0, 3)
    .map((e) => `${e.emotion} (${e.percentage}%)`)
    .join(", ");

  const moodByDay = moodEntries
    .reduce((acc: Record<string, number[]>, e) => {
      const day = e.createdAt.toLocaleDateString("en-US", { weekday: "long" });
      if (!acc[day]) acc[day] = [];
      acc[day].push(e.intensity ?? e.value);
      return acc;
    }, {});

  const dailySummary = Object.entries(moodByDay)
    .map(([day, vals]) => `${day}: avg ${(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1)}`)
    .join(", ");

  const dataSummary = `
Week: ${weekStart.toDateString()} to ${weekEnd.toDateString()}
Mood entries logged: ${moodEntries.length}
Average intensity/mood: ${avgMood}/10
Average sleep score: ${avgSleep}/10
Top emotions from chat: ${topEmotions || "N/A"}
Daily mood averages: ${dailySummary || "N/A"}
  `.trim();

  if (moodEntries.length === 0 && emotionFreqs.length === 0) {
    // Not enough data — store a placeholder
    return prisma.weeklyInsight.upsert({
      where: { userId_weekStart: { userId, weekStart } },
      update: {},
      create: {
        userId,
        weekStart,
        content:
          "Log your mood daily to start seeing personalised weekly insights.",
        tags: [],
      },
    });
  }

  // Ask Groq to generate insights
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: INSIGHT_PROMPT },
        { role: "user", content: dataSummary },
      ],
      temperature: 0.6,
      max_tokens: 300,
    });

    const raw = completion.choices[0]?.message?.content?.trim() ?? "[]";
    const insights: string[] = JSON.parse(raw);

    // Derive tags from top emotions
    const tags = emotionFreqs.slice(0, 3).map((e) => e.emotion.toLowerCase());

    return prisma.weeklyInsight.upsert({
      where: { userId_weekStart: { userId, weekStart } },
      update: { content: insights.join(" "), tags },
      create: {
        userId,
        weekStart,
        content: insights.join(" "),
        tags,
      },
    });
  } catch (err) {
    console.error("[Insight Service] Failed to generate insights:", err);
    return null;
  }
}

/** Fetch the most recent insight for a user */
export async function getLatestInsight(userId: string) {
  return prisma.weeklyInsight.findFirst({
    where: { userId },
    orderBy: { weekStart: "desc" },
  });
}

```

## src/lib/services/mood.service.ts

```typescript
import prisma from "@/lib/prisma";

export type MoodType =
  | "HAPPY"
  | "SAD"
  | "ANXIOUS"
  | "ANGRY"
  | "CALM"
  | "NEUTRAL"
  | "OVERWHELMED"
  | "HOPEFUL"
  | "LONELY"
  | "FEARFUL";

export type CreateMoodInput = {
  userId: string;
  value: number;      // 1-10 (kept for backward compat)
  moodType?: MoodType;
  intensity?: number; // 1-10
  note?: string;
  sleepScore?: number;
  energyScore?: number;
};

/** Create a new mood entry */
export async function createMoodEntry(input: CreateMoodInput) {
  return prisma.moodEntry.create({ data: input });
}

/** Fetch recent mood entries for a user (defaults to last 30) */
export async function getRecentMoodEntries(userId: string, limit = 30) {
  return prisma.moodEntry.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

/** Fetch mood entries within a date range */
export async function getMoodEntriesInRange(
  userId: string,
  from: Date,
  to: Date
) {
  return prisma.moodEntry.findMany({
    where: {
      userId,
      createdAt: { gte: from, lte: to },
    },
    orderBy: { createdAt: "asc" },
  });
}

/** Get the last N days of entries (for charts) */
export async function getMoodEntriesLastNDays(userId: string, days = 7) {
  const from = new Date();
  from.setDate(from.getDate() - days);
  return getMoodEntriesInRange(userId, from, new Date());
}

export type MoodSummary = {
  totalEntries: number;
  averageIntensity: number;
  averageValue: number;
  averageSleepScore: number | null;
  averageEnergyScore: number | null;
  moodDistribution: Record<string, number>;
  currentStreak: number;
};

/** Calculate summary stats for a user's mood history */
export async function getMoodSummary(userId: string): Promise<MoodSummary> {
  const entries = await getRecentMoodEntries(userId, 90);

  if (entries.length === 0) {
    return {
      totalEntries: 0,
      averageIntensity: 0,
      averageValue: 0,
      averageSleepScore: null,
      averageEnergyScore: null,
      moodDistribution: {},
      currentStreak: 0,
    };
  }

  const withIntensity = entries.filter((e) => e.intensity !== null);
  const withSleep = entries.filter((e) => e.sleepScore !== null);
  const withEnergy = entries.filter((e) => e.energyScore !== null);

  const averageValue =
    entries.reduce((sum, e) => sum + e.value, 0) / entries.length;

  const averageIntensity =
    withIntensity.length > 0
      ? withIntensity.reduce((sum, e) => sum + (e.intensity ?? 0), 0) /
        withIntensity.length
      : 0;

  const averageSleepScore =
    withSleep.length > 0
      ? withSleep.reduce((sum, e) => sum + (e.sleepScore ?? 0), 0) /
        withSleep.length
      : null;

  const averageEnergyScore =
    withEnergy.length > 0
      ? withEnergy.reduce((sum, e) => sum + (e.energyScore ?? 0), 0) /
        withEnergy.length
      : null;

  // Build mood distribution
  const moodDistribution: Record<string, number> = {};
  for (const entry of entries) {
    if (entry.moodType) {
      moodDistribution[entry.moodType] =
        (moodDistribution[entry.moodType] ?? 0) + 1;
    }
  }

  // Calculate streak (consecutive days with at least one entry)
  const streak = calculateStreak(entries.map((e) => e.createdAt));

  return {
    totalEntries: entries.length,
    averageIntensity: Math.round(averageIntensity * 10) / 10,
    averageValue: Math.round(averageValue * 10) / 10,
    averageSleepScore: averageSleepScore
      ? Math.round(averageSleepScore * 10) / 10
      : null,
    averageEnergyScore: averageEnergyScore
      ? Math.round(averageEnergyScore * 10) / 10
      : null,
    moodDistribution,
    currentStreak: streak,
  };
}

/** Compute consecutive-day streak from a list of timestamps (desc order OK) */
function calculateStreak(dates: Date[]): number {
  if (dates.length === 0) return 0;

  // Deduplicate to unique day strings
  const uniqueDays = [
    ...new Set(dates.map((d) => d.toISOString().split("T")[0])),
  ].sort((a, b) => b.localeCompare(a)); // desc

  const today = new Date().toISOString().split("T")[0];

  let streak = 0;
  let cursor = today;

  for (const day of uniqueDays) {
    if (day === cursor) {
      streak++;
      // Go back one day
      const d = new Date(cursor);
      d.setDate(d.getDate() - 1);
      cursor = d.toISOString().split("T")[0];
    } else if (day < cursor) {
      // Gap found
      break;
    }
  }

  return streak;
}

/** Weekly mood trend: average value per day for the last 7 days */
export async function getWeeklyMoodTrend(userId: string) {
  const entries = await getMoodEntriesLastNDays(userId, 7);

  // Group by day
  const byDay: Record<string, number[]> = {};
  for (const entry of entries) {
    const day = entry.createdAt.toISOString().split("T")[0];
    if (!byDay[day]) byDay[day] = [];
    byDay[day].push(entry.intensity ?? entry.value);
  }

  // Build a 7-day array
  const result = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    const values = byDay[key] ?? [];
    result.push({
      date: key,
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      average: values.length
        ? Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10
        : null,
      count: values.length,
    });
  }

  return result;
}

```

## src/lib/services/specialist-recommendation.service.ts

```typescript
import prisma from "@/lib/prisma";

/** Maps a dominant emotion to relevant specialist tags and a reason */
const EMOTION_TO_TAGS: Record<
  string,
  { tags: string[]; reason: string }
> = {
  ANXIOUS: {
    tags: ["anxiety", "CBT", "GAD"],
    reason:
      "Frequent anxiety-related themes in your conversations suggest speaking with an anxiety specialist or CBT therapist may be beneficial.",
  },
  FEARFUL: {
    tags: ["anxiety", "trauma", "PTSD"],
    reason:
      "Patterns suggesting fear and worry may benefit from support from an anxiety specialist or trauma-informed therapist.",
  },
  SAD: {
    tags: ["depression", "counselling", "mood disorders"],
    reason:
      "Recurring low mood themes suggest you might find it helpful to speak with a counsellor or psychologist who specialises in mood.",
  },
  OVERWHELMED: {
    tags: ["stress", "burnout", "CBT"],
    reason:
      "Signs of sustained overwhelm may indicate that speaking with a stress management therapist or counsellor could be valuable.",
  },
  ANGRY: {
    tags: ["stress", "emotional regulation", "CBT"],
    reason:
      "Elevated frustration patterns may benefit from support with emotional regulation from a licensed therapist.",
  },
  LONELY: {
    tags: ["counselling", "interpersonal therapy", "relationships"],
    reason:
      "Themes around connection and loneliness suggest that speaking with a counsellor may provide meaningful support.",
  },
  HOPEFUL: {
    tags: ["mindfulness", "wellbeing", "positive psychology"],
    reason:
      "Maintaining your positive momentum with a mindfulness or wellbeing coach may help sustain your progress.",
  },
  CALM: {
    tags: ["mindfulness", "wellbeing"],
    reason:
      "Consider exploring sessions with a mindfulness practitioner to deepen your sense of balance.",
  },
  NEUTRAL: {
    tags: ["counselling", "wellbeing"],
    reason:
      "Speaking with a counsellor can provide space for reflection and personal growth.",
  },
};

/** High-risk level -> always surface crisis-appropriate specialists */
const CRISIS_TAGS = ["psychiatry", "trauma", "depression", "crisis support"];

export type RecommendedSpecialist = {
  id: string;
  name: string;
  title: string;
  specialization: string;
  bio: string;
  yearsOfExperience: number;
  location: string;
  languages: string[];
  imageUrl: string | null;
  rating: number;
  availability: string;
  consultationType: string;
  tags: string[];
  verified: boolean;
};

export type RecommendationResult = {
  specialists: RecommendedSpecialist[];
  reason: string;
};

/**
 * Return specialist recommendations based on the user's dominant emotions
 * and highest risk level observed.
 * Does NOT diagnose the user.
 */
export async function getSpecialistRecommendations(
  dominantEmotions: string[],
  highestRiskLevel: string
): Promise<RecommendationResult> {
  // If in crisis/high-risk, prioritise crisis-appropriate specialists
  const isCrisis =
    highestRiskLevel === "CRISIS" || highestRiskLevel === "HIGH";

  const tagsToSearch = isCrisis
    ? CRISIS_TAGS
    : dominantEmotions.flatMap(
        (e) => EMOTION_TO_TAGS[e]?.tags ?? ["counselling"]
      );

  const uniqueTags = [...new Set(tagsToSearch)];

  // Build reason string from top emotion
  const topEmotion = dominantEmotions[0] ?? "NEUTRAL";
  const reason = isCrisis
    ? "Recent conversations suggest elevated distress. Speaking with a mental health professional may provide important support."
    : (EMOTION_TO_TAGS[topEmotion]?.reason ??
      "Based on your recent conversations, speaking with a mental health professional may be beneficial.");

  // Query specialists whose tags overlap with the derived tag list
  const specialists = await prisma.specialist.findMany({
    where: {
      tags: {
        hasSome: uniqueTags,
      },
    },
    orderBy: [{ rating: "desc" }, { verified: "desc" }],
    take: 5,
  });

  // If nothing matches, fall back to top-rated verified specialists
  if (specialists.length === 0) {
    const fallback = await prisma.specialist.findMany({
      where: { verified: true },
      orderBy: { rating: "desc" },
      take: 3,
    });
    return { specialists: fallback, reason };
  }

  return { specialists, reason };
}

/** Fetch all specialists with optional filters */
export async function getAllSpecialists(filters?: {
  specialization?: string;
  consultationType?: string;
  tag?: string;
}) {
  return prisma.specialist.findMany({
    where: {
      ...(filters?.specialization && {
        specialization: { contains: filters.specialization, mode: "insensitive" },
      }),
      ...(filters?.consultationType && {
        consultationType: filters.consultationType,
      }),
      ...(filters?.tag && {
        tags: { has: filters.tag },
      }),
    },
    orderBy: [{ rating: "desc" }, { verified: "desc" }],
  });
}

```

## src/middleware.ts

```typescript
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname === "/";

    if (isAuth && isAuthPage) {
      return NextResponse.redirect(new URL("/chat", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname === "/") return true;
        return !!token;
      },
    },
    pages: {
      signIn: "/",
    },
  }
);

export const config = {
  matcher: [
    "/",
    "/chat/:path*",
    "/dashboard/:path*",
    "/support/:path*",
    "/mood/:path*"
  ],
};
```

## src/store/useChatStore.ts

```typescript
import { create } from 'zustand';

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

interface ActiveChatSlice {
  activeKey: string | null;
  messages: ChatMessage[];

  hydratedSessionIds: Set<string>;

  isAwaitingSessionId: boolean;

  startDraftSession: () => string;
  setMessages: (updater: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])) => void;
  promoteDraftToSession: (realSessionId: string) => void;
  loadHistoryForSession: (sessionId: string, messages: ChatMessage[]) => void;
  markAwaitingSessionId: (waiting: boolean) => void;
  resetActiveChat: () => void;
  isHydrated: (sessionId: string) => boolean;
}

interface SidebarSlice {
  shouldRefresh: boolean;
  triggerRefresh: () => void;
  resetRefresh: () => void;
}

type ChatStore = ActiveChatSlice & SidebarSlice;

export const useChatStore = create<ChatStore>((set, get) => ({
  activeKey: null,
  messages: [],
  hydratedSessionIds: new Set(),
  isAwaitingSessionId: false,

  startDraftSession: () => {
    const draftKey = `draft-${Date.now()}`;
    set({ activeKey: draftKey, messages: [], isAwaitingSessionId: false });
    return draftKey;
  },

  setMessages: (updater) =>
    set((state) => ({
      messages: typeof updater === 'function' ? (updater as (prev: ChatMessage[]) => ChatMessage[])(state.messages) : updater,
    })),

  promoteDraftToSession: (realSessionId) =>
    set((state) => ({
      activeKey: realSessionId,
      hydratedSessionIds: new Set(state.hydratedSessionIds).add(realSessionId),
      isAwaitingSessionId: false,
    })),

  loadHistoryForSession: (sessionId, messages) =>
    set((state) => ({
      activeKey: sessionId,
      messages,
      hydratedSessionIds: new Set(state.hydratedSessionIds).add(sessionId),
    })),

  markAwaitingSessionId: (waiting) => set({ isAwaitingSessionId: waiting }),

  resetActiveChat: () => set({ activeKey: null, messages: [], isAwaitingSessionId: false }),

  isHydrated: (sessionId) => get().hydratedSessionIds.has(sessionId),

  shouldRefresh: false,
  triggerRefresh: () => set({ shouldRefresh: true }),
  resetRefresh: () => set({ shouldRefresh: false }),
}));

export const selectActiveMessages = (s: ChatStore) => s.messages;
export const selectActiveKey = (s: ChatStore) => s.activeKey;
export const selectSidebarRefresh = (s: ChatStore) => s.shouldRefresh;
```

## src/types/mindbridge.ts

```typescript
export type MoodType =
  | "HAPPY"
  | "SAD"
  | "ANXIOUS"
  | "ANGRY"
  | "CALM"
  | "NEUTRAL"
  | "OVERWHELMED"
  | "HOPEFUL"
  | "LONELY"
  | "FEARFUL";

export type MoodEntry = {
  id: string;
  userId: string;
  value: number;
  moodType: MoodType | null;
  intensity: number | null;
  note: string | null;
  sleepScore: number | null;
  energyScore: number | null;
  createdAt: string; // ISO string from JSON response
};

export type MoodSummary = {
  totalEntries: number;
  averageIntensity: number;
  averageValue: number;
  averageSleepScore: number | null;
  averageEnergyScore: number | null;
  moodDistribution: Record<string, number>;
  currentStreak: number;
};

export type WeeklyTrendPoint = {
  date: string;
  label: string;         // "Mon", "Tue", etc.
  average: number | null;
  count: number;
};

// ── Analysis ─────────────────────────────────────────────────

export type RiskLevel = "LOW" | "MODERATE" | "HIGH" | "CRISIS";

export type MessageAnalysis = {
  id: string;
  messageId: string;
  emotion: string;
  intensity: number;
  riskLevel: RiskLevel;
  createdAt: string;
};

export type EmotionFrequency = {
  emotion: string;
  count: number;
  percentage: number;
};

export type StressScore = {
  score: number;
  label: "Low" | "Moderate" | "High" | "Critical";
  trend: "up" | "down" | "stable";
};

// ── Insights ─────────────────────────────────────────────────

export type WeeklyInsight = {
  id: string;
  userId: string;
  weekStart: string;
  content: string;
  tags: string[];
  generatedAt: string;
};

// ── Specialists ──────────────────────────────────────────────

export type ConsultationType = "virtual" | "physical" | "both";

export type Specialist = {
  id: string;
  name: string;
  title: string;
  specialization: string;
  bio: string;
  yearsOfExperience: number;
  location: string;
  languages: string[];
  email: string | null;
  phone: string | null;
  imageUrl: string | null;
  rating: number;
  availability: string;
  consultationType: ConsultationType;
  tags: string[];
  verified: boolean;
  createdAt: string;
};

export type RecommendationResult = {
  specialists: Specialist[];
  reason: string;
};

// ── Dashboard ────────────────────────────────────────────────

export type DashboardData = {
  moodSummary: MoodSummary;
  weeklyTrend: WeeklyTrendPoint[];
  recentMoodEntries: MoodEntry[];
  stressScore: StressScore;
  dominantEmotions: string[];
  latestInsight: WeeklyInsight | null;
  recentSessions: { id: string; title: string | null; updatedAt: string }[];
  recommendedSpecialists: Specialist[];
  recommendationReason: string;
};

```

## src/types/next-auth.d.ts

```typescript
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string;
  }
}
```

## tailwind.config.ts

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: { DEFAULT: '#7a9e7e', light: '#a8c5ac', dark: '#4a7a4f' },
        cream: '#faf7f2',
        'warm-white': '#fffef9',
        earth: { DEFAULT: '#8b6f47', light: '#c4a882' },
        forest: '#2d5a3d',
        blush: '#e8b4a0',
        text: { dark: '#2a2a2a', mid: '#5a5a5a', light: '#8a8a8a' },
      },
      fontFamily: {
        sans: ['var(--font-nunito)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
```

## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}

```

