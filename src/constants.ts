/**
 * Constants and configuration for Qwen MCP Tool
 */

export const LOG_PREFIX = "[QMCPT]";

export const QWEN_MODELS = {
  PRIMARY: "qwen3-coder-plus",
  FALLBACK: "qwen3-coder-turbo",
  // Other available models
  PLUS: "qwen3-coder-plus",
  TURBO: "qwen3-coder-turbo",
  PRO: "qwen3-coder-pro"
} as const;

export const CLI = {
  COMMANDS: {
    QWEN: "qwen",
    ECHO: "echo"
  },
  FLAGS: {
    PROMPT: "-p",
    MODEL: "--model",
    SANDBOX: "--sandbox",
    APPROVAL_MODE: "--approval-mode",
    YOLO: "--yolo",
    ALL_FILES: "--all-files",
    DEBUG: "--debug"
  }
} as const;

export const ERROR_MESSAGES = {
  NO_PROMPT_PROVIDED: "No prompt provided. Please include a prompt in your request.",
  QWEN_CLI_NOT_FOUND: "Qwen CLI not found. Please install it first: npm install -g @qwen/cli",
  TOOL_NOT_FOUND: "Tool not found in registry",
  INVALID_ARGUMENTS: "Invalid tool arguments",
  EXECUTION_FAILED: "Tool execution failed",
  QUOTA_EXCEEDED: "Quota exceeded for primary model, attempting fallback...",
  VALIDATION_FAILED: "Tool response validation failed"
} as const;

export const STATUS_MESSAGES = {
  STARTING_ANALYSIS: "🔍 Starting analysis (may take time for large files)...",
  PROCESSING: "📊 Processing your request...",
  THINKING: "🧠 Analyzing...",
  SEARCHING: "🔎 Searching codebase...",
  SWITCHING_MODEL: "⚡ Switching to fallback model...",
  COMPLETED: "✅ Analysis complete",
  FAILED: "❌ Analysis failed"
} as const;

export const MCP_CONFIG = {
  SERVER_NAME: "qwen-cli-mcp",
  VERSION: "1.0.0",
  CAPABILITIES: {
    tools: {},
    prompts: {},
    logging: {}
  },
  KEEP_ALIVE_INTERVAL: 25000 // 25 seconds
} as const;

export const APPROVAL_MODES = {
  PLAN: "plan",
  DEFAULT: "default",
  AUTO_EDIT: "auto-edit",
  YOLO: "yolo"
} as const;

export type QwenModel = typeof QWEN_MODELS[keyof typeof QWEN_MODELS];
export type ApprovalMode = typeof APPROVAL_MODES[keyof typeof APPROVAL_MODES];
