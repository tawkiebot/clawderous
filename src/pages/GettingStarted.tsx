export function GettingStarted() {
  return (
    <div className="page">
      <div className="page-content">
        <h1>Getting Started</h1>
        <p>Send an email, get things done. Here's how to set up Clawederous in minutes.</p>
        
        <h2 style={{fontFamily: 'Playfair Display', fontSize: '1.75rem', marginTop: '3rem', marginBottom: '1rem'}}>Prerequisites</h2>
        <ul style={{color: 'var(--text-secondary)', marginLeft: '1.5rem', marginBottom: '2rem'}}>
          <li>Node.js 18+</li>
          <li>An AgentMail inbox (or any IMAP provider)</li>
          <li>Git</li>
        </ul>
        
        <h2 style={{fontFamily: 'Playfair Display', fontSize: '1.75rem', marginTop: '2rem', marginBottom: '1rem'}}>Quick Setup</h2>
        
        <div style={{marginBottom: '1.5rem'}}>
          <h3 style={{fontSize: '1.1rem', marginBottom: '0.5rem'}}>1. Clone the Repository</h3>
          <pre style={{background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', overflow: 'auto'}}>
            <code>git clone https://github.com/tawkiebot/clawederous
cd clawederous</code>
          </pre>
        </div>
        
        <div style={{marginBottom: '1.5rem'}}>
          <h3 style={{fontSize: '1.1rem', marginBottom: '0.5rem'}}>2. Install Dependencies</h3>
          <pre style={{background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', overflow: 'auto'}}>
            <code>npm install</code>
          </pre>
        </div>
        
        <div style={{marginBottom: '1.5rem'}}>
          <h3 style={{fontSize: '1.1rem', marginBottom: '0.5rem'}}>3. Configure Environment</h3>
          <pre style={{background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', overflow: 'auto'}}>
            <code>cp .env.example .env
# Edit .env with your credentials</code>
          </pre>
        </div>
        
        <div style={{background: 'var(--bg-secondary)', padding: '1rem 1.5rem', borderRadius: '8px', marginBottom: '1.5rem', borderLeft: '3px solid var(--accent)'}}>
          <strong>Required in .env:</strong>
          <ul style={{marginTop: '0.5rem', marginLeft: '1.5rem'}}>
            <li><code>AGENTMAIL_API_KEY</code> — Your AgentMail API key</li>
            <li><code>AGENTMAIL_INBOX</code> — Your inbox address (e.g., you@agentmail.to)</li>
          </ul>
        </div>
        
        <div style={{marginBottom: '1.5rem'}}>
          <h3 style={{fontSize: '1.1rem', marginBottom: '0.5rem'}}>4. Start the Agent</h3>
          <pre style={{background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', overflow: 'auto'}}>
            <code>npm run dev</code>
          </pre>
        </div>
        
        <h2 style={{fontFamily: 'Playfair Display', fontSize: '1.75rem', marginTop: '3rem', marginBottom: '1rem'}}>Available Commands</h2>
        <ul style={{color: 'var(--text-secondary)', marginLeft: '1.5rem'}}>
          <li><code>/ping</code> — Health check</li>
          <li><code>/tweet</code> — Post to X/Twitter</li>
          <li><code>/note</code> — Save to knowledge base</li>
          <li><code>/claris</code> — Forward to recipient</li>
          <li><code>/log</code> — Daily journal entry</li>
          <li><code>/remind</code> — Create reminder</li>
          <li><code>/summarize</code> — AI summary</li>
        </ul>
      </div>
    </div>
  )
}
