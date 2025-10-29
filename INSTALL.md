# Installation Guide

## Prerequisites

Before installing qwen-mcp-tool, you need:

1. **Node.js v16 or higher**
   ```bash
   node --version  # Should show v16.0.0 or higher
   ```

2. **Qwen CLI installed**
   ```bash
   npm install -g @qwen/cli
   # or follow https://github.com/QwenLM/qwen-code
   ```

3. **Claude Code** (if using with Claude)

## Installation Methods

### Method 1: Claude MCP Add (Easiest - Recommended)

Use Claude Code's built-in MCP installer for automatic setup:

```bash
claude mcp add qwen-cli -- npx -y @jaggerxtrm/qwen-mcp-tool
```

This single command:
- ✅ Automatically configures the MCP server
- ✅ Adds it to your Claude Code settings
- ✅ No manual JSON editing needed
- ✅ Uses npx (always up-to-date)

**That's it! Restart Claude Code and you're done.**

---

### Method 2: Global npm Install

The package is published as `@jaggerxtrm/qwen-mcp-tool`:

**Step 1: Install globally**
```bash
npm install -g @jaggerxtrm/qwen-mcp-tool
```

**Step 2: Add to Claude Code MCP settings**

Edit `~/.config/claude/mcp_settings.json`:
```json
{
  "mcpServers": {
    "qwen-cli": {
      "command": "qwen-mcp-tool"
    }
  }
}
```

**Step 3: Restart Claude Code**

---

### Method 3: Manual npx Configuration

Run directly without installing:

Edit `~/.config/claude/mcp_settings.json`:
```json
{
  "mcpServers": {
    "qwen-cli": {
      "command": "npx",
      "args": ["-y", "@jaggerxtrm/qwen-mcp-tool"]
    }
  }
}
```

---

### Method 4: Local Development Installation

For contributors or local development:

**Step 1: Link the package globally**
```bash
cd /home/dawid/qwen-mcp-tool
npm link
```

**Step 2: Add to Claude Code MCP settings**

Edit `~/.config/claude/mcp_settings.json` (or your Claude config file):
```json
{
  "mcpServers": {
    "qwen-cli": {
      "command": "qwen-mcp-tool"
    }
  }
}
```

**Step 3: Restart Claude Code**
```bash
# Restart Claude Code to pick up the new MCP server
```

---

### Method 5: Direct Path (Advanced)

If you want to use a specific local build:

**Add to Claude Code MCP settings** with absolute path:
```json
{
  "mcpServers": {
    "qwen-cli": {
      "command": "node",
      "args": ["/absolute/path/to/qwen-mcp-tool/dist/index.js"]
    }
  }
}
```

---

## Verification

After installation, verify it works:

**Step 1: Check the command is available**
```bash
# If using npm link or global install
which qwen-mcp-tool

# Should output: /usr/local/bin/qwen-mcp-tool (or similar)
```

**Step 2: Test the server manually**
```bash
# Start the server (it will wait for MCP input)
qwen-mcp-tool

# Or if using direct path
node /home/dawid/qwen-mcp-tool/dist/index.js
```

You should see log output like:
```
[QMCPT] [INFO] Starting Qwen MCP Tool server...
[QMCPT] [INFO] Server connected and ready
[QMCPT] [INFO] Available tools: 3
```

**Step 3: Test in Claude Code**

In Claude, try:
```
Use the ping tool to test the connection
```

Or:
```
Use ask-qwen to explain what you can do
```

---

## Troubleshooting

### "command not found: qwen-mcp-tool"

If using npm link and getting this error:

1. Check npm global bin location:
   ```bash
   npm bin -g
   ```

2. Make sure it's in your PATH:
   ```bash
   echo $PATH
   ```

3. Add npm global bin to PATH if needed:
   ```bash
   export PATH="$(npm bin -g):$PATH"
   # Add to ~/.bashrc or ~/.zshrc to make permanent
   ```

### "Cannot find module"

Rebuild the project:
```bash
cd /home/dawid/qwen-mcp-tool
npm run build
```

### "Qwen CLI not found"

Install Qwen CLI:
```bash
npm install -g @qwen/cli
# or
npm install -g qwen-code
```

### Claude Code doesn't see the tool

1. Check MCP settings file location:
   ```bash
   # Common locations:
   # ~/.config/claude/mcp_settings.json
   # ~/.config/Claude/mcp_settings.json
   # ~/Library/Application Support/Claude/mcp_settings.json (macOS)
   ```

2. Verify JSON syntax is correct (no trailing commas, proper quotes)

3. Restart Claude Code completely

4. Check Claude Code logs for errors

---

## Recommended Method

**Easiest (one command):**
```bash
claude mcp add qwen-cli -- npx -y @jaggerxtrm/qwen-mcp-tool
```

**Or traditional install:**
```bash
npm install -g @jaggerxtrm/qwen-mcp-tool
```

Then add to Claude Code config:
```json
{
  "mcpServers": {
    "qwen-cli": {
      "command": "qwen-mcp-tool"
    }
  }
}
```

---

## Uninstallation

**If using npm link:**
```bash
cd /home/dawid/qwen-mcp-tool
npm unlink -g
```

**If installed globally:**
```bash
npm uninstall -g @jaggerxtrm/qwen-mcp-tool
```

**Remove from Claude Code:**

Edit MCP settings and remove the `qwen-cli` entry, then restart Claude Code.
