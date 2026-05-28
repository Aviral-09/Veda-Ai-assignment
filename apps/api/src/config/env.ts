import "dotenv/config";
import { z } from "zod";

const EnvSchema = z.object({
  PORT: z.coerce.number().default(4000),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
  MONGODB_URI: z.string().default("mongodb://localhost:27017/vedaai"),
  REDIS_URL: z.string().default("redis://localhost:6379"),
  GEMINI_API_KEY: z.string().optional().default(""),
  GEMINI_MODEL: z.string().default("gemini-3.5-flash"),
  // Memory mode avoids Docker overhead during rapid local iteration.
  INFRA_MODE: z.enum(["docker", "memory"]).default("docker"),
});

export const env = EnvSchema.parse(process.env);

// Toggles the local mock fallback when a real API key is absent.
export const hasGemini = env.GEMINI_API_KEY.trim().length > 0;

// Enables in-memory DB and inline queueing for zero-dependency local dev.
export const isMemoryMode = env.INFRA_MODE === "memory";
