import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// GET all conversations for the current user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    const conversations = await db.conversation.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: "desc" },
      include: {
        messages: {
          take: 1,
          orderBy: { createdAt: "desc" },
        },
      },
    });

    return NextResponse.json(conversations);
  } catch (error) {
    console.error("Get conversations error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// POST create a new conversation
export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    const conversation = await db.conversation.create({
      data: {
        userId: session.user.id,
      },
    });

    return NextResponse.json(conversation);
  } catch (error) {
    console.error("Create conversation error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// DELETE a conversation
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response("Missing conversation id", { status: 400 });
    }

    // Verify ownership
    const conversation = await db.conversation.findUnique({
      where: { id },
    });

    if (!conversation || conversation.userId !== session.user.id) {
      return new Response("Conversation not found", { status: 404 });
    }

    await db.conversation.delete({
      where: { id },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Delete conversation error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
