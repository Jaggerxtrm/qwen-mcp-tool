# Qwen MCP Tool

Model Context Protocol server for Qwen CLI integration. This tool enables AI assistants like Claude to leverage Qwen's powerful code analysis and large context window capabilities through the MCP protocol.

## Features

- **Large Context Windows**: Leverage Qwen's massive token capacity for analyzing large files and entire codebases
- **File Analysis**: Use `@filename` or `@directory` syntax to include file contents in your queries
- **Sandbox Mode**: Safely execute code and run tests in isolated environments
- **Multiple Models**: Support for various Qwen models (qwen3-coder-plus, qwen3-coder-turbo, etc.)
- **Flexible Approval Modes**: Control tool execution with plan/default/auto-edit/yolo modes
- **MCP Protocol**: Seamless integration with MCP-compatible AI assistants

## Prerequisites

- Node.js v16 or higher
- Qwen CLI installed and configured ([qwen-code](https://github.com/QwenLM/qwen-code))

## Installation

### Quick Setup (via Claude Code)

```bash
claude mcp add qwen-cli -- npx -y qwen-mcp-tool
```

### Manual Installation

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

3. Run the server:
```bash
npm start
```

### Development

```bash
npm run dev
```

## Available Tools

### ask-qwen

The main tool for interacting with Qwen AI.

**Parameters:**
- `prompt` (required): Your question or instruction
  - Use `@filename` to include a file's contents
  - Use `@directory` to include all files in a directory
- `model` (optional): Model to use (qwen3-coder-plus, qwen3-coder-turbo, etc.)
- `sandbox` (optional): Enable sandbox mode for safe code execution
- `approvalMode` (optional): Control tool execution approval
  - `plan`: Analyze tool calls without executing
  - `default`: Prompt for approval (default behavior)
  - `auto-edit`: Auto-approve file edits
  - `yolo`: Auto-approve all tool calls
- `yolo` (optional): Shortcut for approvalMode='yolo'
- `allFiles` (optional): Include all files in current directory as context
- `debug` (optional): Enable debug mode

**Examples:**
```javascript
// Analyze a specific file
{
  "prompt": "@src/main.ts Explain what this code does"
}

// Analyze entire codebase
{
  "prompt": "@src/ Summarize the architecture of this codebase"
}

// Use specific model with sandbox
{
  "prompt": "Run the test suite and fix any failures",
  "model": "qwen3-coder-plus",
  "sandbox": true,
  "approvalMode": "auto-edit"
}
```

### ping

Simple echo test to verify the connection.

**Parameters:**
- `prompt` (optional): Message to echo (defaults to "Pong!")

### Help

Display Qwen CLI help information.

**Parameters:** None

## Configuration

The tool uses the following default models:
- **Primary**: qwen3-coder-plus
- **Fallback**: qwen3-coder-turbo (used if primary hits quota limits)

You can override these by specifying the `model` parameter in your requests.

## Usage with Claude Code

Once installed as an MCP server, you can use it within Claude Code:

```
Ask Qwen to analyze the authentication system in @src/auth/
```

Claude will automatically use the ask-qwen tool with the appropriate parameters.

## Project Structure

```
qwen-mcp-tool/
├── src/
│   ├── index.ts              # MCP server entry point
│   ├── constants.ts          # Configuration and constants
│   ├── tools/
│   │   ├── registry.ts       # Tool registration system
│   │   ├── ask-qwen.tool.ts  # Main Qwen interaction tool
│   │   ├── simple-tools.ts   # Utility tools (ping, help)
│   │   └── index.ts          # Tool exports
│   └── utils/
│       ├── commandExecutor.ts # Command execution utility
│       ├── qwenExecutor.ts    # Qwen CLI wrapper
│       └── logger.ts          # Logging utility
├── package.json
├── tsconfig.json
└── README.md
```

## How It Works

1. The MCP server listens for tool calls via stdio transport
2. When a tool is called, the server validates the arguments using Zod schemas
3. For `ask-qwen`, the prompt is passed to the Qwen CLI with appropriate flags
4. File references (`@filename`) are handled by Qwen's built-in file processing
5. Output is captured and returned to the MCP client
6. If quota limits are hit, the server automatically falls back to the turbo model

## Comparison with Gemini MCP Tool

This tool is inspired by [gemini-mcp-tool](https://github.com/jamubc/gemini-mcp-tool) but adapted for Qwen CLI:

| Feature | Gemini MCP | Qwen MCP |
|---------|-----------|----------|
| File references | ✅ | ✅ (more advanced) |
| Sandbox mode | ✅ | ✅ |
| Multiple models | ✅ | ✅ |
| Approval modes | ❌ | ✅ |
| Directory traversal | Basic | Advanced (git-aware) |
| Multimodal support | Limited | Images, PDFs, audio, video |

## Troubleshooting

### "Qwen CLI not found"

Make sure the Qwen CLI is installed and available in your PATH:
```bash
npm install -g @qwen/cli
# or follow instructions at https://github.com/QwenLM/qwen-code
```

### "Command timed out"

For very large files or codebases, the analysis may take longer than the default 10-minute timeout. Consider:
- Using `.qwenignore` to exclude unnecessary files
- Breaking down large queries into smaller chunks
- Using `approvalMode: "plan"` to analyze without executing

### "Invalid tool arguments"

Check that your arguments match the tool schema. Use the `Help` tool to see available options.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## Credits

Inspired by [gemini-mcp-tool](https://github.com/jamubc/gemini-mcp-tool) by jamubc.
Built for use with [Qwen Code](https://github.com/QwenLM/qwen-code).
