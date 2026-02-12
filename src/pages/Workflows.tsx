export function Workflows() {
  return (
    <div className="page">
      <div className="page-content">
        <h1>Workflows</h1>
        <p>Real-world patterns for automating your life with email commands.</p>
        
        <div style={{marginTop: '2rem'}}>
          <h2 style={{fontFamily: 'Playfair Display', fontSize: '1.5rem', marginBottom: '1rem'}}>Quick Capture</h2>
          <div style={{background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem'}}>
            <p style={{fontFamily: 'JetBrains Mono', fontSize: '0.9rem', color: 'var(--text-secondary)'}}>
              <span style={{color: '#ff7b72'}}>To:</span> you@agentmail.to<br/>
              <span style={{color: '#a5d6ff'}}>Subject:</span> /note Idea for the project<br/>
              <br/>
              Could use a different approach with Clawederous...
            </p>
          </div>
          <p style={{color: 'var(--text-secondary)', marginBottom: '2rem'}}>Saved to your knowledge base, searchable later.</p>
        </div>
        
        <div>
          <h2 style={{fontFamily: 'Playfair Display', fontSize: '1.5rem', marginBottom: '1rem'}}>Meeting Notes</h2>
          <div style={{background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem'}}>
            <p style={{fontFamily: 'JetBrains Mono', fontSize: '0.9rem', color: 'var(--text-secondary)'}}>
              <span style={{color: '#ff7b72'}}>To:</span> you@agentmail.to<br/>
              <span style={{color: '#a5d6ff'}}>Subject:</span> /note Meeting with Gary<br/>
              <br/>
              Key takeaways:<br/>
              - Timeline confirmed<br/>
              - Budget approved<br/>
              - Next steps: Sarah to draft proposal
            </p>
          </div>
        </div>
        
        <div>
          <h2 style={{fontFamily: 'Playfair Display', fontSize: '1.5rem', marginBottom: '1rem'}}>Daily Journal</h2>
          <div style={{background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem'}}>
            <p style={{fontFamily: 'JetBrains Mono', fontSize: '0.9rem', color: 'var(--text-secondary)'}}>
              <span style={{color: '#ff7b72'}}>To:</span> you@agentmail.to<br/>
              <span style={{color: '#a5d6ff'}}>Subject:</span> /log<br/>
              <br/>
              Wins: Shipped Clawederous homepage<br/>
              Learnings: Typography matters more than I thought<br/>
              Tomorrow: API docs and workflow examples
            </p>
          </div>
        </div>
        
        <div>
          <h2 style={{fontFamily: 'Playfair Display', fontSize: '1.5rem', marginBottom: '1rem'}}>Reminders</h2>
          <div style={{background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem'}}>
            <p style={{fontFamily: 'JetBrains Mono', fontSize: '0.9rem', color: 'var(--text-secondary)'}}>
              <span style={{color: '#ff7b72'}}>To:</span> you@agentmail.to<br/>
              <span style={{color: '#a5d6ff'}}>Subject:</span> /remind tomorrow 9am Email Sarah about the timeline<br/>
              <br/>
              Need to confirm the milestone dates.
            </p>
          </div>
        </div>
        
        <div>
          <h2 style={{fontFamily: 'Playfair Display', fontSize: '1.5rem', marginBottom: '1rem'}}>Team Updates</h2>
          <div style={{background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem'}}>
            <p style={{fontFamily: 'JetBrains Mono', fontSize: '0.9rem', color: 'var(--text-secondary)'}}>
              <span style={{color: '#ff7b72'}}>To:</span> you@agentmail.to<br/>
              <span style={{color: '#a5d6ff'}}>Subject:</span> /claris Weekly update<br/>
              <br/>
              Here's this week's progress on the Clawederous project...
            </p>
          </div>
          <p style={{color: 'var(--text-secondary)'}}>Automatically routed to your designated recipient (e.g., Claris).</p>
        </div>
        
        <div>
          <h2 style={{fontFamily: 'Playfair Display', fontSize: '1.5rem', marginBottom: '1rem'}}>Social Sharing</h2>
          <div style={{background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem'}}>
            <p style={{fontFamily: 'JetBrains Mono', fontSize: '0.9rem', color: 'var(--text-secondary)'}}>
              <span style={{color: '#ff7b72'}}>To:</span> you@agentmail.to<br/>
              <span style={{color: '#a5d6ff'}}>Subject:</span> /tweet Just shipped Clawederous! 🚀<br/>
              <br/>
              Check it out: https://github.com/tawkiebot/clawederous
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
