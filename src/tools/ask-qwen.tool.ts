import { z } from "zod";
import { QWEN_MODELS, APPROVAL_MODES, ERROR_MESSAGES } from "../constants.js";
import { executeQwenCLI } from "../utils/qwenExecutor.js";
import type { UnifiedTool } from "./registry.js";

/**
 * Ask Qwen tool - main interaction with Qwen CLI
 */
export const askQwenTool: UnifiedTool = {
  name: "ask-qwen",
  description: "Query Qwen AI with support for file analysis (@file syntax), codebase exploration, and large context windows. Supports various models and execution modes.",
  category: "primary",
  zodSchema: z.object({
    prompt: z
      .string()
      .min(1)
      .describe(
        "The query or instruction for Qwen. Use @filename or @directory to include file contents. Example: '@src/ Explain this codebase structure'"
      ),
    model: z
      .enum([
        QWEN_MODELS.PRIMARY,
        QWEN_MODELS.FALLBACK,
        QWEN_MODELS.PLUS,
        QWEN_MODELS.TURBO,
        QWEN_MODELS.PRO
      ])
      .optional()
      .describe(
        `Optional model to use (e.g., '${QWEN_MODELS.PRIMARY}'). If not specified, uses the default model (${QWEN_MODELS.PRIMARY}).`
      ),
    sandbox: z
      .boolean()
      .default(false)
      .describe(
        "Use sandbox mode (-s flag) to safely test code changes, execute scripts, or run potentially risky operations in an isolated environment"
      ),
    approvalMode: z
      .enum([
        APPROVAL_MODES.PLAN,
        APPROVAL_MODES.DEFAULT,
        APPROVAL_MODES.AUTO_EDIT,
        APPROVAL_MODES.YOLO
      ])
      .optional()
      .describe(
        "Control tool execution approval: 'plan' (analyze only), 'default' (prompt for approval), 'auto-edit' (auto-approve edits), 'yolo' (auto-approve all)"
      ),
    yolo: z
      .boolean()
      .default(false)
      .describe(
        "Enable YOLO mode to automatically approve all tool calls without prompting (equivalent to approvalMode='yolo')"
      ),
    allFiles: z
      .boolean()
      .default(false)
      .describe(
        "Include all files in the current directory as context (use with caution for large directories)"
      ),
    debug: z
      .boolean()
      .default(false)
      .describe("Enable debug mode for more verbose output")
  }),
  execute: async (args, onProgress) => {
    const { prompt, model, sandbox, approvalMode, yolo, allFiles, debug } = args;

    // Validate prompt
    if (!prompt || !prompt.trim()) {
      throw new Error(ERROR_MESSAGES.NO_PROMPT_PROVIDED);
    }

    // Execute Qwen CLI
    const result = await executeQwenCLI({
      prompt,
      model,
      sandbox,
      approvalMode,
      yolo,
      allFiles,
      debug,
      onProgress
    });

    return result;
  },
  prompt: {
    name: "ask-qwen",
    description:
      "Interact with Qwen AI for code analysis, file exploration, and general queries. Supports @file references for including file contents.",
    arguments: [
      {
        name: "prompt",
        description:
          "Your question or instruction. Use @filename or @directory to reference files.",
        required: true
      },
      {
        name: "model",
        description: `Optional model selection (${QWEN_MODELS.PRIMARY}, ${QWEN_MODELS.TURBO}, etc.)`,
        required: false
      },
      {
        name: "sandbox",
        description: "Enable sandbox mode for safe code execution",
        required: false
      },
      {
        name: "approvalMode",
        description: "Control approval for tool execution (plan/default/auto-edit/yolo)",
        required: false
      }
    ]
  }
};
