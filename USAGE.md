# Qwen MCP Tool - Usage Guide

## Setup for Claude Code

1. **Install the Qwen CLI** (prerequisite):
   ```bash
   npm install -g @qwen/cli
   # or follow https://github.com/QwenLM/qwen-code
   ```

2. **Add to Claude Code** (easiest method):
   ```bash
   claude mcp add qwen-cli -- npx -y qwen-mcp-tool
   ```

3. **Manual setup** (if you prefer):

   Build the tool:
   ```bash
   cd /home/dawid/qwen-mcp-tool
   npm install
   npm run build
   ```

   Add to your Claude Code MCP settings (`~/.config/claude/mcp_settings.json`):
   ```json
   {
     "mcpServers": {
       "qwen-cli": {
         "command": "node",
         "args": ["/home/dawid/qwen-mcp-tool/dist/index.js"]
       }
     }
   }
   ```

## Using the Tools

### Basic Queries

Ask Qwen to analyze code or answer questions:
```
Use ask-qwen to explain what this repository does
```

### File Analysis

Reference specific files using `@` syntax:
```
Use ask-qwen with prompt "@src/main.ts Explain this code"
```

### Directory Analysis

Analyze entire directories:
```
Use ask-qwen with prompt "@src/ Summarize the architecture"
```

### Sandbox Mode

Run code safely:
```
Use ask-qwen with prompt "Fix the failing tests" and sandbox=true
```

### Auto-Approval Modes

For automated workflows:
```
Use ask-qwen with prompt "Refactor this code" and approvalMode="auto-edit"
```

## Tool Parameters

### ask-qwen

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `prompt` | string | Yes | Your question or instruction. Use `@file` or `@dir` for file refs |
| `model` | string | No | Model name (qwen3-coder-plus, qwen3-coder-turbo, etc.) |
| `sandbox` | boolean | No | Enable sandbox mode for safe execution |
| `approvalMode` | string | No | Control approvals: plan/default/auto-edit/yolo |
| `yolo` | boolean | No | Auto-approve everything (shortcut) |
| `allFiles` | boolean | No | Include all files as context |
| `debug` | boolean | No | Enable debug output |

### ping

Simple connectivity test:
```
Use ping tool
```

### Help

Get Qwen CLI help:
```
Use Help tool
```

## Examples

### Example 1: Code Review
```
Use ask-qwen to review the authentication logic in @src/auth/login.ts
```

### Example 2: Bug Fix with Sandbox
```json
{
  "tool": "ask-qwen",
  "parameters": {
    "prompt": "Find and fix the bug causing test failures",
    "sandbox": true,
    "approvalMode": "auto-edit"
  }
}
```

### Example 3: Architecture Analysis
```json
{
  "tool": "ask-qwen",
  "parameters": {
    "prompt": "@. Explain the overall architecture and list all main components",
    "model": "qwen3-coder-plus"
  }
}
```

### Example 4: Refactoring
```json
{
  "tool": "ask-qwen",
  "parameters": {
    "prompt": "@src/utils/helpers.ts Refactor this file to use modern ES6+ syntax",
    "approvalMode": "auto-edit"
  }
}
```

## Troubleshooting

### Server Not Starting

1. Check that Node.js v16+ is installed:
   ```bash
   node --version
   ```

2. Verify the build succeeded:
   ```bash
   cd /home/dawid/qwen-mcp-tool
   npm run build
   ```

3. Test the server manually:
   ```bash
   node dist/index.js
   ```

### Qwen CLI Not Found

Make sure Qwen CLI is in your PATH:
```bash
which qwen
# or
qwen --version
```

If not found, install it:
```bash
npm install -g @qwen/cli
```

### Timeout Errors

For large codebases:
1. Use `.qwenignore` to exclude unnecessary files
2. Break down queries into smaller chunks
3. Use specific file references instead of entire directories

### Permission Errors

Make sure the executable has correct permissions:
```bash
chmod +x /home/dawid/qwen-mcp-tool/dist/index.js
```

## Advanced Usage

### Custom Models

Specify different Qwen models based on your needs:
- `qwen3-coder-plus`: Best quality, slower
- `qwen3-coder-turbo`: Faster, good quality
- `qwen3-coder-pro`: Highest capabilities

### Approval Modes Explained

- **plan**: Only analyze what would be done, don't execute
- **default**: Prompt user for each tool/edit (safest)
- **auto-edit**: Auto-approve file edits, prompt for others
- **yolo**: Auto-approve everything (use with caution!)

### File References

The `@` syntax is powerful:
- `@file.txt`: Include one file
- `@directory/`: Include all files in directory (recursive)
- `@directory/*.js`: Include only JavaScript files
- Multiple refs: `@src/a.ts @src/b.ts Explain both`

### Environment Variables

You can set these in your shell:
- `DEBUG=1`: Enable debug logging
- `OPENAI_MODEL`: Set default Qwen model

## Tips

1. **Start small**: Test with small files before analyzing entire codebases
2. **Use .qwenignore**: Speed up analysis by excluding node_modules, build artifacts, etc.
3. **Leverage approval modes**: Use `plan` mode to preview changes before applying
4. **Combine with Claude**: Let Claude orchestrate multiple Qwen queries for complex tasks
5. **Check logs**: Errors are logged to stderr for debugging

## Next Steps

- Explore the [gemini-mcp-tool](https://github.com/jamubc/gemini-mcp-tool) for additional patterns
- Check [Qwen Code docs](https://github.com/QwenLM/qwen-code) for CLI features
- Contribute improvements to this tool!
