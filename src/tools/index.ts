/**
 * Tool exports and registration
 */
import { registerTool } from "./registry.js";
import { askQwenTool } from "./ask-qwen.tool.js";
import { pingTool, helpTool } from "./simple-tools.js";

// Register all tools
registerTool(askQwenTool);
registerTool(pingTool);
registerTool(helpTool);

// Export everything
export * from "./registry.js";
export { askQwenTool } from "./ask-qwen.tool.js";
export { pingTool, helpTool } from "./simple-tools.js";
