"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Bot } from "lucide-react";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      // Create a new conversation and redirect
      const createAndRedirect = async () => {
        try {
          const res = await fetch("/api/chats", { method: "POST" });
          if (res.ok) {
            const conversation = await res.json();
            router.push(`/${conversation.id}`);
          }
        } catch (error) {
          console.error("Failed to create conversation:", error);
        }
      };
      createAndRedirect();
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0d0d0d]">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Bot className="h-8 w-8 text-white" />
          </div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return null;
}
