import { streamText } from "ai";
import { getProvider, availableModels } from "@/lib/ai/provider";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { messages, conversationId, modelId } = await req.json();

    if (!messages || !conversationId) {
      return new Response("Missing required fields", { status: 400 });
    }

    // Verify conversation belongs to user
    const conversation = await db.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation || conversation.userId !== session.user.id) {
      return new Response("Conversation not found", { status: 404 });
    }

    // Find the model configuration
    const model = availableModels.find((m) => m.id === modelId) || availableModels[0];
    const provider = getProvider(model.provider);

    // Save the user message to database
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === "user") {
      await db.message.create({
        data: {
          role: "user",
          content: lastMessage.content,
          conversationId,
        },
      });

      // Update conversation title if it's the first message
      const messageCount = await db.message.count({
        where: { conversationId },
      });
      if (messageCount === 1) {
        const title =
          lastMessage.content.slice(0, 50) +
          (lastMessage.content.length > 50 ? "..." : "");
        await db.conversation.update({
          where: { id: conversationId },
          data: { title },
        });
      }
    }

    // Stream the AI response
    const result = streamText({
      model: provider(model.id),
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant" | "system",
        content: m.content,
      })),
      onFinish: async ({ text }) => {
        // Save assistant message to database
        await db.message.create({
          data: {
            role: "assistant",
            content: text,
            conversationId,
          },
        });
      },
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
