// ========================
// AI Teacher's Toolkit Types
// ========================

/** Tools backed by the generic text-generation endpoint. */
export const TOOL_TYPES = ["quiz", "concept", "doubt"] as const;
export type ToolType = (typeof TOOL_TYPES)[number];

export interface ToolGenerateResult {
  /** Markdown-ish text output from the model (or deterministic mock). */
  text: string;
  source: "gemini" | "mock";
}
