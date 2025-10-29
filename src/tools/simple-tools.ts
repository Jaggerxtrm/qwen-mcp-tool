import { z } from "zod";
import { CLI } from "../constants.js";
import { executeSimpleCommand } from "../utils/qwenExecutor.js";
import type { UnifiedTool } from "./registry.js";

/**
 * Ping tool - simple echo test
 */
export const pingTool: UnifiedTool = {
  name: "ping",
  description: "Echo a message to test the connection",
  category: "simple",
  zodSchema: z.object({
    prompt: z.string().optional().default("Pong!").describe("Message to echo")
  }),
  execute: async (args) => {
    const message = args.prompt || "Pong!";
    return executeSimpleCommand(CLI.COMMANDS.ECHO, [message]);
  },
  prompt: {
    name: "ping",
    description: "Test the connection with a simple echo",
    arguments: [
      {
        name: "prompt",
        description: "Optional message to echo (defaults to 'Pong!')",
        required: false
      }
    ]
  }
};

/**
 * Help tool - show Qwen CLI help
 */
export const helpTool: UnifiedTool = {
  name: "Help",
  description: "Display Qwen CLI help information",
  category: "simple",
  zodSchema: z.object({}),
  execute: async () => {
    return executeSimpleCommand(CLI.COMMANDS.QWEN, ["--help"]);
  },
  prompt: {
    name: "help",
    description: "Show Qwen CLI help and available options",
    arguments: []
  }
};
