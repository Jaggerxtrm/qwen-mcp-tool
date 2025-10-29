# Quick Start Guide

## TL;DR - Get Running in 3 Steps

### Step 1: Install Qwen CLI (if not already installed)
```bash
npm install -g @qwen/cli
```

### Step 2: Link this tool
```bash
cd /home/dawid/qwen-mcp-tool
npm link
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
Run `npm link` again in the project directory

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

## Publishing to npm (Optional)

Want to share this with others?

1. Create a GitHub repo
2. Update package.json with your details
3. Run `npm publish`
4. Users can then install via: `npm install -g qwen-mcp-tool`
