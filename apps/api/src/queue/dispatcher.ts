import { isMemoryMode } from "../config/env";
import { getGenerationQueue } from "./queue";
import { runGeneration } from "../jobs/runGeneration";
import { emitJobUpdate } from "../socket/socket";

/**
 * Enqueue (or, in memory mode, immediately run) a paper-generation job for an
 * assignment. Returns the job id so callers can store it on the assignment.
 */
export async function dispatchGeneration(assignmentId: string): Promise<string> {
  if (isMemoryMode) {
    const jobId = `inline-${assignmentId}-${Date.now()}`;
    // Run on the next tick so the HTTP response returns first.
    setImmediate(() => {
      runGeneration(assignmentId, jobId, emitJobUpdate).catch((err) =>
        console.error("[inline-queue] generation failed:", err)
      );
    });
    return jobId;
  }

  const job = await getGenerationQueue().add("generate", { assignmentId });
  return job.id ?? "";
}
