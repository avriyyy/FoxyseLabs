import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";

// Multi-provider AI configuration
// Users can switch between providers by setting the appropriate API key

export type AIProvider = "openai" | "anthropic";

export interface AIModel {
  id: string;
  name: string;
  provider: AIProvider;
}

export const availableModels: AIModel[] = [
  // OpenAI models
  { id: "gpt-4o", name: "GPT-4o", provider: "openai" },
  { id: "gpt-4o-mini", name: "GPT-4o Mini", provider: "openai" },
  { id: "gpt-4-turbo", name: "GPT-4 Turbo", provider: "openai" },
  // Anthropic models
  { id: "claude-sonnet-4-20250514", name: "Claude Sonnet 4", provider: "anthropic" },
  { id: "claude-haiku-4-20250414", name: "Claude Haiku 4", provider: "anthropic" },
];

export function getProvider(provider: AIProvider) {
  switch (provider) {
    case "openai":
      return createOpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    case "anthropic":
      return createAnthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}

export function getDefaultModel(): AIModel {
  // Return the first available model based on configured API keys
  if (process.env.OPENAI_API_KEY) {
    return availableModels.find((m) => m.id === "gpt-4o")!;
  }
  if (process.env.ANTHROPIC_API_KEY) {
    return availableModels.find((m) => m.id === "claude-sonnet-4-20250514")!;
  }
  // Fallback to OpenAI
  return availableModels[0];
}
