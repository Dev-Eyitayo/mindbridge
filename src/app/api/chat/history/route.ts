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