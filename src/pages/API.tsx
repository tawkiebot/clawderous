export function API() {
  return (
    <div className="page">
      <div className="page-content">
        <h1>API Reference</h1>
        <p>Complete reference for Clawederous commands, environment variables, and programmatic usage.</p>
        
        <h2 style={{fontFamily: 'Playfair Display', fontSize: '1.75rem', marginTop: '3rem', marginBottom: '1rem'}}>Commands</h2>
        
        <div style={{display: 'grid', gap: '1rem'}}>
          <div style={{background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px'}}>
            <div style={{fontFamily: 'JetBrains Mono', fontSize: '1.1rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.5rem'}}>/ping</div>
            <p style={{color: 'var(--text-secondary)', marginBottom: 0}}>Health check. Returns a confirmation reply.</p>
          </div>
          
          <div style={{background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px'}}>
            <div style={{fontFamily: 'JetBrains Mono', fontSize: '1.1rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.5rem'}}>/tweet [message]</div>
            <p style={{color: 'var(--text-secondary)', marginBottom: 0}}>Post a tweet to X/Twitter. Message can be in subject or body.</p>
          </div>
          
          <div style={{background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px'}}>
            <div style={{fontFamily: 'JetBrains Mono', fontSize: '1.1rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.5rem'}}>/note [content]</div>
            <p style={{color: 'var(--text-secondary)', marginBottom: 0}}>Save content to your knowledge base as a markdown note.</p>
          </div>
          
          <div style={{background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px'}}>
            <div style={{fontFamily: 'JetBrains Mono', fontSize: '1.1rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.5rem'}}>/claris [message]</div>
            <p style={{color: 'var(--text-secondary)', marginBottom: 0}}>Forward content to a designated recipient (Claris).</p>
          </div>
          
          <div style={{background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px'}}>
            <div style={{fontFamily: 'JetBrains Mono', fontSize: '1.1rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.5rem'}}>/log [entry]</div>
            <p style={{color: 'var(--text-secondary)', marginBottom: 0}}>Add an entry to your daily journal.</p>
          </div>
          
          <div style={{background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px'}}>
            <div style={{fontFamily: 'JetBrains Mono', fontSize: '1.1rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.5rem'}}>/remind [when] [what]</div>
            <p style={{color: 'var(--text-secondary)', marginBottom: 0}}>Create a reminder for later.</p>
          </div>
          
          <div style={{background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px'}}>
            <div style={{fontFamily: 'JetBrains Mono', fontSize: '1.1rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.5rem'}}>/summarize</div>
            <p style={{color: 'var(--text-secondary)', marginBottom: 0}}>Generate an AI summary of the email thread.</p>
          </div>
        </div>
        
        <h2 style={{fontFamily: 'Playfair Display', fontSize: '1.75rem', marginTop: '3rem', marginBottom: '1rem'}}>Environment Variables</h2>
        
        <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '1rem'}}>
          <thead>
            <tr style={{borderBottom: '1px solid var(--border)'}}>
              <th style={{textAlign: 'left', padding: '1rem', color: 'var(--text-primary)'}}>Variable</th>
              <th style={{textAlign: 'left', padding: '1rem', color: 'var(--text-primary)'}}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{borderBottom: '1px solid var(--border)'}}>
              <td style={{padding: '1rem', fontFamily: 'JetBrains Mono', color: 'var(--accent)'}}>AGENTMAIL_API_KEY</td>
              <td style={{padding: '1rem', color: 'var(--text-secondary)'}}>Your AgentMail API key (required)</td>
            </tr>
            <tr style={{borderBottom: '1px solid var(--border)'}}>
              <td style={{padding: '1rem', fontFamily: 'JetBrains Mono', color: 'var(--accent)'}}>AGENTMAIL_INBOX</td>
              <td style={{padding: '1rem', color: 'var(--text-secondary)'}}>Your AgentMail inbox address (required)</td>
            </tr>
            <tr style={{borderBottom: '1px solid var(--border)'}}>
              <td style={{padding: '1rem', fontFamily: 'JetBrains Mono', color: 'var(--accent)'}}>TWITTER_API_KEY</td>
              <td style={{padding: '1rem', color: 'var(--text-secondary)'}}>Twitter API key (optional, for /tweet)</td>
            </tr>
            <tr style={{borderBottom: '1px solid var(--border)'}}>
              <td style={{padding: '1rem', fontFamily: 'JetBrains Mono', color: 'var(--accent)'}}>DATA_DIR</td>
              <td style={{padding: '1rem', color: 'var(--text-secondary)'}}>Directory for notes and logs (default: ./data)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
