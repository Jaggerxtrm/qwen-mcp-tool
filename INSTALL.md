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

### Method 1: Local Installation (Current State)

Since the tool isn't published to npm yet, use it locally:

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

### Method 2: Direct Path (No npm link)

If you don't want to use npm link:

**Add to Claude Code MCP settings** with absolute path:
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

---

### Method 3: Publish to npm (For Distribution)

To make it available to other users:

**Step 1: Update package.json**

Make sure you have proper metadata:
```json
{
  "name": "qwen-mcp-tool",
  "author": "Your Name",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/qwen-mcp-tool"
  }
}
```

**Step 2: Create npm account** (if needed)
```bash
npm login
```

**Step 3: Publish**
```bash
cd /home/dawid/qwen-mcp-tool
npm publish
```

**Step 4: Users can then install via**:
```bash
# For Claude Code
claude mcp add qwen-cli -- npx -y qwen-mcp-tool

# Or globally
npm install -g qwen-mcp-tool
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

## Current Recommended Method

**For the developer (you):**
```bash
cd /home/dawid/qwen-mcp-tool
npm link
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

**For other users (after publishing to npm):**
```bash
claude mcp add qwen-cli -- npx -y qwen-mcp-tool
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
npm uninstall -g qwen-mcp-tool
```

**Remove from Claude Code:**

Edit MCP settings and remove the `qwen-cli` entry, then restart Claude Code.
