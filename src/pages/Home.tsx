export function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-badge">
          ✨ A homage to <a href="/about">Posterous</a> (2008)
        </div>
        <h1>Email as the<br /><span>Universal Interface</span></h1>
        <p className="hero-description">
          Send an email, get things done. No apps, no logins, no friction.
          Your inbox is your terminal.
        </p>
        <div className="hero-buttons">
          <a href="https://github.com/tawkiebot/clawederous" className="btn-primary">Start Building</a>
          <a href="/docs/getting-started" className="btn-secondary">Learn More</a>
        </div>
      </section>

      <section className="features" id="features">
        <div className="section-header">
          <h2>Why Email?</h2>
          <p>The universal protocol, reimagined for agents.</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i data-lucide="globe" style={{width: 24, height: 24}}></i>
            </div>
            <h3>Universal Access</h3>
            <p>Everyone has email. No new accounts, no lock-in. Works on any device, any client.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i data-lucide="cpu" style={{width: 24, height: 24}}></i>
            </div>
            <h3>Agent-Ready</h3>
            <p>Perfect interface for AI to parse and act on. Structured commands, natural language.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i data-lucide="lock" style={{width: 24, height: 24}}></i>
            </div>
            <h3>No Lock-In</h3>
            <p>Your data, your inbox, your rules. Portable, open, and under your control.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i data-lucide="zap" style={{width: 24, height: 24}}></i>
            </div>
            <h3>Instant Setup</h3>
            <p>AgentMail inbox in seconds. Configure once, use everywhere. Zero friction.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i data-lucide="message-circle" style={{width: 24, height: 24}}></i>
            </div>
            <h3>Two-Way Flow</h3>
            <p>Read, understand, reply. Unlike notifications, email is truly conversational.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i data-lucide="terminal" style={{width: 24, height: 24}}></i>
            </div>
            <h3>Command Bus</h3>
            <p>Short syntax → structured actions. Your inbox becomes an automation hub.</p>
          </div>
        </div>
      </section>

      <section className="commands" id="commands">
        <div className="section-header">
          <h2>Commands</h2>
          <p>Shorthand power. Email as your terminal.</p>
        </div>
        <div className="commands-grid">
          <div className="command-item">
            <span className="command-slash">/tweet</span>
            <span className="command-name">Tweet</span>
            <span className="command-desc">Post to X</span>
          </div>
          <div className="command-item">
            <span className="command-slash">/note</span>
            <span className="command-name">Note</span>
            <span className="command-desc">Save to knowledge base</span>
          </div>
          <div className="command-item">
            <span className="command-slash">/claris</span>
            <span className="command-name">Claris</span>
            <span className="command-desc">Forward to recipient</span>
          </div>
          <div className="command-item">
            <span className="command-slash">/log</span>
            <span className="command-name">Log</span>
            <span className="command-desc">Daily journal</span>
          </div>
          <div className="command-item">
            <span className="command-slash">/remind</span>
            <span className="command-name">Remind</span>
            <span className="command-desc">Create reminder</span>
          </div>
          <div className="command-item">
            <span className="command-slash">/summarize</span>
            <span className="command-name">Summarize</span>
            <span className="command-desc">AI summary</span>
          </div>
        </div>
      </section>
    </>
  )
}
