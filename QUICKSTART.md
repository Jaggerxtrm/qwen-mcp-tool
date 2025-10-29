# Quick Start Guide

## TL;DR - Get Running in 2 Steps

### Step 1: Install Qwen CLI (if not already installed)
```bash
npm install -g @qwen/cli
```

### Step 2: Add to Claude Code (One Command!)
```bash
claude mcp add qwen-cli -- npx -y @jaggerxtrm/qwen-mcp-tool
```

Restart Claude Code, and you're done! 🎉

---

## Alternative: Manual Installation (3 Steps)

### Step 1: Install Qwen CLI (if not already installed)
```bash
npm install -g @qwen/cli
```

### Step 2: Install qwen-mcp-tool
```bash
npm install -g @jaggerxtrm/qwen-mcp-tool
```

### Step 3: Configure Claude Code

Find your Claude Code MCP settings file:
- Linux: `~/.config/claude/mcp_settings.json`
- macOS: `~/Library/Application Support/Claude/mcp_settings.json`
- Windows: `%APPDATA%\Claude\mcp_settings.json`

Add this configuration:
```json
{
  "mcpServers": {
    "qwen-cli": {
      "command": "qwen-mcp-tool"
    }
  }
}
```

Restart Claude Code, and you're done! 🎉

---

## Testing It Works

In Claude Code, try:
```
Use the ping tool
```

Expected response:
```
Pong!
```

Or try a real query:
```
Use ask-qwen with prompt "What models are available?"
```

---

## First Real Use

Try analyzing a file:
```
Use ask-qwen with prompt "@README.md Summarize this file"
```

Or analyze code:
```
Use ask-qwen with prompt "@src/ What's the architecture of this codebase?"
```

---

## Common Issues

### "qwen: command not found"
Install Qwen CLI: `npm install -g @qwen/cli`

### "qwen-mcp-tool: command not found"
Install the package: `npm install -g @jaggerxtrm/qwen-mcp-tool`

### Claude doesn't recognize the tools
1. Check your MCP settings file path
2. Verify JSON syntax (no trailing commas!)
3. Restart Claude Code completely

---

## Where to Go Next

- See [USAGE.md](USAGE.md) for detailed examples
- See [INSTALL.md](INSTALL.md) for alternative installation methods
- See [README.md](README.md) for full documentation

---

## Package Information

This package is published on npm as `@jaggerxtrm/qwen-mcp-tool`

- npm: https://www.npmjs.com/package/@jaggerxtrm/qwen-mcp-tool
- Install: `npm install -g @jaggerxtrm/qwen-mcp-tool`
