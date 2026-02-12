# Dewey Documentation

**Documentation toolkit for AI-agent-ready docs. Audits, scores, and generates optimized documentation for LLM consumption.**

- **npm**: [@arach/dewey](https://npmjs.com/package/@arach/dewey)
- **GitHub**: [arach/dewey](https://github.com/arach/dewey)
- **Author**: Arach

## What is Dewey?

Dewey is a **docs agent, not a docs framework**. It focuses on preparation and judgment rather than being a documentation website generator.

### Core Philosophy

Dewey recognizes that AI agents need different documentation than humans. While humans prefer narrative, explanatory content, AI agents need:
- **Dense, structured information**
- **Clear patterns and rules**
- **Self-contained examples**
- **Critical context upfront**

## Installation

```bash
pnpm add -D @arach/dewey
# or
npm install -D @arach/dewey
```

## Quick Start

```bash
# Initialize docs structure
npx dewey init

# Generate agent-ready files
npx dewey generate

# Check your score
npx dewey agent
```

## CLI Commands

| Command | Purpose |
|---------|---------|
| `dewey init` | Scaffold docs structure + dewey.config.ts |
| `dewey audit` | Validate documentation completeness |
| `dewey generate` | Create AGENTS.md, llms.txt, docs.json, install.md |
| `dewey agent` | Score agent-readiness (0-100 scale) |
| `dewey agent-coach --fix` | Auto-create missing files |

## Configuration

Create `dewey.config.ts`:

```typescript
export default {
  project: {
    name: 'your-project',
    tagline: 'What your project does',
    type: 'npm-package', // 'generic', 'npm-package', 'cli'
  },

  agent: {
    criticalContext: [
      'NEVER do X when Y',
      'Always check Z before modifying W',
    ],
    entryPoints: {
      main: 'src/',
      config: 'config/',
    },
    rules: [
      { pattern: 'database', instruction: 'Check src/db/' },
    ],
    sections: ['overview', 'quickstart', 'api'],
  },

  install: {
    objective: 'Install and configure your-project.',
    steps: [
      { description: 'Install', command: 'pnpm add your-project' },
    ],
  },

  docs: {
    path: './docs',
    output: './',
    required: ['overview', 'quickstart'],
  },
}
```

## Generated Files

| File | Purpose |
|------|---------|
| `AGENTS.md` | Combined context for AI agents |
| `llms.txt` | Plain text summary for LLMs |
| `docs.json` | Structured documentation |
| `install.md` | LLM-executable installation guide |

## Agent Content Pattern

Each doc page should have two versions:

| Version | Audience | Style |
|---------|----------|-------|
| `.md` | Humans | Narrative, explanatory |
| `.agent.md` | AI agents | Dense, structured, self-contained |

## Skills

Skills are LLM prompts that guide agents through specific tasks:

### Built-in Skills

| Skill | Purpose |
|-------|---------|
| `docsReviewAgent` | Review docs quality, catch drift from codebase |
| `promptSlideoutGenerator` | Generate AI-consumable prompt configs |
| `installMdGenerator` | Create LLM-executable installation |

### Custom Skills

Add custom skills to `.claude/skills/` as markdown files.

## React Components

Dewey includes 22 React components for building documentation sites:

```typescript
import { DocsApp, MarkdownContent, Callout } from '@arach/dewey'
import '@arach/dewey/css'
```

### Available Components

- `DocsLayout` - Main layout wrapper
- `Sidebar` - Navigation sidebar
- `TableOfContents` - Auto-generated TOC
- `CodeBlock` - Syntax highlighted code
- `Callout` - Info/warning boxes
- `Tabs` - Tabbed content
- `Steps` - Numbered steps
- `Card` - Feature cards
- `FileTree` - File structure visualization
- `ApiTable` - API documentation tables
- `Badge` - Status badges
- `AgentContext` - AI-specific context blocks
- `PromptSlideout` - Slide-out prompts

### Theming

```typescript
// Use built-in themes
import '@arach/dewey/css/colors/ocean.css'
import '@arach/dewey/css/colors/emerald.css'
import '@arach/dewey/css/colors/purple.css'
import '@arach/dewey/css/colors/dusk.css'
import '@arach/dewey/css/colors/rose.css'
import '@arach/dewey/css/colors/warm.css'
import '@arach/dewey/css/colors/github.css'
```

## Agent Readiness Score

Dewey scores your documentation on a 0-100 scale:

| Score | Grade | Meaning |
|-------|-------|---------|
| 90-100 | A | Excellent agent-readiness |
| 80-89 | B | Good, minor gaps |
| 70-79 | C | Needs work |
| 60-69 | D | Significant gaps |
| 0-59 | F | Poor agent-readiness |

### Scoring Categories

- **Project Context** (25 pts) - Basic project info
- **Agent-Optimized Files** (30 pts) - AGENTS.md, llms.txt quality
- **Human-to-Agent Handoff** (25 pts) - Clear patterns and rules
- **Content Quality** (20 pts) - Completeness and accuracy

## Best Practices

### 1. Critical Context First

Always lead with information AI agents MUST know:

```markdown
**IMPORTANT:** 
- The project lives at `/path/to/project/`
- NEVER modify `production.json`
- Always run tests before committing
```

### 2. Pattern-Based Navigation

Help agents find their way:

```typescript
rules: [
  { pattern: 'database', instruction: 'Check src/db/' },
  { pattern: 'api', instruction: 'Check src/api/' },
  { pattern: 'tests', instruction: 'Check tests/' },
]
```

### 3. Self-Contained Examples

Include imports and context:

```typescript
// ✅ Good
import { Client } from './client'
const client = new Client()

// ❌ Bad
const client = new Client() // Where's Client from?
```

### 4. Two-Layer Documentation

Human version (narrative):
```markdown
# Overview

This project does X by doing Y. It uses Z under the hood...
```

Agent version (dense):
```markdown
# Overview

**Purpose:** X  
**Key Files:** src/main.ts, src/config.ts  
**Critical Rules:** Never modify production config  
**Patterns:** Check src/{feature}/ for features
```

## Comparison with Other Tools

| Feature | Dewey | VitePress | Starlight |
|---------|-------|-----------|-----------|
| Agent-ready docs | ✅ Primary | ❌ | ❌ |
| AI scoring | ✅ | ❌ | ❌ |
| Skill prompts | ✅ | ❌ | ❌ |
| Docs website | ✅ | ✅ | ✅ |
| React components | ✅ 22 | ⚠️ | ✅ |

## Related Projects

- [installmd.org](https://installmd.org) - LLM-executable installation guides
- [AGENTS.md pattern](https://github.com/paul-hampton/agents-dot-md) - Combined agent context

## License

MIT
