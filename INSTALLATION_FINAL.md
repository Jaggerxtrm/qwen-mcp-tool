# How Users Install qwen-mcp-tool

The package is now published on npm as **`@jaggerxtrm/qwen-mcp-tool`**

npm link: https://www.npmjs.com/package/@jaggerxtrm/qwen-mcp-tool

---

## For End Users (Easiest Methods)

### Method 1: Claude MCP Add (Easiest - Recommended)

```bash
# One command to rule them all!
claude mcp add qwen-cli -- npx -y @jaggerxtrm/qwen-mcp-tool
```

Then restart Claude Code.

**Pros:**
- ✅ Single command setup
- ✅ Automatic configuration
- ✅ No manual JSON editing
- ✅ Always uses latest version
- ✅ No disk space used

**Cons:**
- Requires Claude Code CLI installed

---

### Method 2: Global Install

```bash
# Install globally
npm install -g @jaggerxtrm/qwen-mcp-tool
```

Then configure Claude Code (`~/.config/claude/mcp_settings.json`):
```json
{
  "mcpServers": {
    "qwen-cli": {
      "command": "qwen-mcp-tool"
    }
  }
}
```

**Pros:**
- ✅ Fast startup (no download on each run)
- ✅ Simple configuration
- ✅ Easy to update with `npm update -g @jaggerxtrm/qwen-mcp-tool`

**Cons:**
- Requires disk space for installation

---

### Method 3: Using npx Manually (No Installation)

Configure Claude Code directly with npx:
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

**Pros:**
- ✅ No installation needed
- ✅ Always uses latest version
- ✅ No disk space used

**Cons:**
- ⚠️ Slower first startup (downloads on demand)
- ⚠️ May download on each Claude restart (depending on npx cache)

---

## Complete Setup Instructions

### Easiest Way (Recommended)

**Step 1: Install Qwen CLI**
```bash
npm install -g @qwen/cli
```

**Step 2: Run Claude MCP Add**
```bash
claude mcp add qwen-cli -- npx -y @jaggerxtrm/qwen-mcp-tool
```

**Step 3: Restart Claude Code**

Done! 🎉

---

## Manual Setup Instructions

### Step 1: Install Qwen CLI (Prerequisite)

```bash
npm install -g @qwen/cli
```

Or follow: https://github.com/QwenLM/qwen-code

### Step 2: Install qwen-mcp-tool

**Option A - Global Install:**
```bash
npm install -g @jaggerxtrm/qwen-mcp-tool
```

**Option B - Skip (use npx instead)**

### Step 3: Configure Claude Code Manually

Find your MCP settings file:
- **Linux:** `~/.config/claude/mcp_settings.json`
- **macOS:** `~/Library/Application Support/Claude/mcp_settings.json`
- **Windows:** `%APPDATA%\Claude\mcp_settings.json`

Add the configuration:

**If you did global install:**
```json
{
  "mcpServers": {
    "qwen-cli": {
      "command": "qwen-mcp-tool"
    }
  }
}
```

**If using npx:**
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

### Step 4: Restart Claude Code

The tools should now be available!

---

## Testing the Installation

In Claude, try:
```
Use the ping tool
```

Should respond with:
```
Pong!
```

Or:
```
Use ask-qwen with prompt "What can you do?"
```

---

## Updating

**If globally installed:**
```bash
npm update -g @jaggerxtrm/qwen-mcp-tool
```

**If using npx:**
- Updates automatically on each run (uses latest from npm)

---

## Uninstalling

**If globally installed:**
```bash
npm uninstall -g @jaggerxtrm/qwen-mcp-tool
```

**If using npx:**
- Just remove from MCP settings, nothing to uninstall

Then remove from Claude Code MCP settings and restart.

---

## For Developers

If you want to contribute or modify:

```bash
# Clone the repo
git clone <repo-url>
cd qwen-mcp-tool

# Install dependencies
npm install

# Build
npm run build

# Link locally for testing
npm link

# Now it's available as 'qwen-mcp-tool' command
```

---

## Summary

**Easiest way (recommended):**
```bash
claude mcp add qwen-cli -- npx -y @jaggerxtrm/qwen-mcp-tool
```

**Traditional way:**
1. Install the package: `npm install -g @jaggerxtrm/qwen-mcp-tool`
2. Add to Claude config with command: `"qwen-mcp-tool"`
3. Restart Claude
4. Done!

**No-install way:**
- Use npx in Claude config: `"command": "npx", "args": ["-y", "@jaggerxtrm/qwen-mcp-tool"]`
