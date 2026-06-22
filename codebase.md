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


## pnpm-workspace.yaml

```yaml
ignoredBuiltDependencies:
  - sharp
  - unrs-resolver

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

