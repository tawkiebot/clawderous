/** @type {import('@dewey/cli').DeweyConfig} */
export default {
  project: {
    name: 'clawderous',
    tagline: 'Email-to-anything for OpenClaw. Claude on Claw, via Email.',
    type: 'cli-tool',
  },

  agent: {
    criticalContext: [
      'Backend code is in landing/ folder, frontend in src/',
      'Deployed to GitHub Pages at tawkiebot.github.io/clawderous/',
      'Use npm run build:frontend to build the React app',
      'Deploy by pushing to gh-pages branch with built files',
      'Email commands: /memo, /blog, /run, /reply, /status, /help',
    ],

    entryPoints: {
      'backend': 'landing/index.ts',
      'frontend': 'src/App.tsx',
      'commands': 'landing/handlers/commands.ts',
      'parser': 'landing/parse/command.ts',
    },

    rules: [
      { pattern: 'email', instruction: 'Check landing/ingest/ for email handling' },
      { pattern: 'commands', instruction: 'See landing/handlers/commands.ts for /memo, /blog, etc.' },
      { pattern: 'deploy', instruction: 'Push to gh-pages branch, see .github/workflows/' },
    ],

    sections: ['overview', 'quickstart', 'commands', 'architecture', 'api', 'workflows'],
  },

  docs: {
    path: './landing/docs',
    output: './',
    required: ['overview', 'getting-started'],
  },
}
