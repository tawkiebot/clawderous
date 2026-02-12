import { ArrowLeft, Mail, Smartphone, Globe, Share2, Clock, Calendar, Link, Camera } from 'lucide-react';

export default function Posterous() {
  const timeline = [
    {
      year: '2008',
      month: 'July',
      event: 'Posterous founded',
      description: 'Posterous launched by Garry Tan and Sachin Agarwal with a simple premise: "Post by email."',
      icon: Mail
    },
    {
      year: '2008',
      month: 'December',
      event: 'Viral growth begins',
      description: 'Featured on TechCrunch, exponential user growth starts. Simple email-to-blog wins hearts.',
      icon: Share2
    },
    {
      year: '2009',
      month: 'March',
      event: 'Auto-tweet integration',
      description: 'Posts automatically cross-post to Twitter, Facebook. Social syndication built-in.',
      icon: Share2
    },
    {
      year: '2009',
      month: 'August',
      event: 'Mobile apps launch',
      description: 'iOS and Android apps enable posting from anywhere. Photos, video, audio support.',
      icon: Smartphone
    },
    {
      year: '2010',
      month: 'April',
      event: 'Series A funding',
      description: '$4.4M raised from investors including Andreessen Horowitz. Team grows to 15.',
      icon: Calendar
    },
    {
      year: '2010',
      month: 'October',
      event: 'Autopost API launches',
      description: 'Third-party apps can post to your blog via API. Ecosystem begins forming.',
      icon: Link
    },
    {
      year: '2011',
      month: 'February',
      event: 'Custom domains',
      description: 'Map your own domain to a Posterous blog. Professional publishing for everyone.',
      icon: Globe
    },
    {
      year: '2011',
      month: 'December',
      event: 'Acquired by Twitter',
      description: 'Twitter acquires Posterous for $50M. Team joins Twitter, service continues operating.',
      icon: Share2
    },
    {
      year: '2013',
      month: 'April',
      event: 'Service shutdown announced',
      description: 'Twitter announces Posterous will shut down in 6 months. Community devastated.',
      icon: Clock
    },
    {
      year: '2013',
      month: 'December',
      event: 'Posterous closes',
      description: 'Service goes offline. Users migrate to alternatives like Tumblr, WordPress, Medium.',
      icon: Mail
    }
  ];

  const features = [
    {
      name: 'Post by Email',
      icon: Mail,
      description: 'Send an email, get a blog post. No login, no dashboard, no CMS. Just email.'
    },
    {
      name: 'Auto-Formatting',
      icon: Camera,
      description: 'Images, videos, embedded content extracted and formatted automatically from email.'
    },
    {
      name: 'Cross-Posting',
      icon: Share2,
      description: 'Automatically share to Twitter, Facebook, LinkedIn when you post via email.'
    },
    {
      name: 'Mobile First',
      icon: Smartphone,
      description: 'Native apps for iOS and Android made mobile posting frictionless.'
    },
    {
      name: 'Custom Domains',
      icon: Globe,
      description: 'Map your own domain. Professional presence without managing hosting.'
    },
    {
      name: 'Simple API',
      icon: Link,
      description: 'Programmatic posting via REST API. Build automation on top of email.'
    }
  ];

  const influences = [
    {
      concept: 'Email as CMS',
      posterous: 'Send email → published blog post',
      clawederous: 'Send email → parsed command → structured action'
    },
    {
      concept: 'Frictionless publishing',
      posterous: 'No login required, just email',
      clawederous: 'No accounts, just AgentMail inbox'
    },
    {
      concept: 'Cross-platform',
      posterous: 'Works on any email client',
      clawederous: 'Works on any device with email'
    },
    {
      concept: 'Programmable',
      posterous: 'API for third-party posting',
      clawederous: 'Commands for structured workflows'
    }
  ];

  return (
    <div className="page">
      <nav className="nav">
        <div className="nav-brand">
          <a href="/">Clawederous</a>
        </div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/posterous" className="active">Posterous</a>
          <a href="/docs/getting-started">Docs</a>
          <a href="https://github.com/tawkiebot/clawederous" target="_blank" rel="noopener">GitHub</a>
        </div>
      </nav>

      <main className="main">
        <section className="hero small">
          <div className="container">
            <a href="/about" className="back-link">
              <ArrowLeft size={16} />
              Back to About
            </a>
            <h1>The Posterous Archive</h1>
            <p className="subtitle">
              A timeline and reference guide to the service that inspired Clawederous
            </p>
          </div>
        </section>

        <section className="content">
          <div className="container">
            <div className="intro-card">
              <h2>What Was Posterous?</h2>
              <p>
                Posterous (2008-2013) was a blogging platform that let you post simply by 
                sending an email. No login, no dashboard, no CMS—just send an email and 
                your post was live. It was elegant, simple, and brilliant.
              </p>
              <p>
                Clawederous is a spiritual successor built for the AI agent era. We believe 
                email should be your command center, not just for blogging, but for 
                automation, workflows, and agent orchestration.
              </p>
            </div>

            <h2 className="section-title">Timeline</h2>
            <div className="timeline">
              {timeline.map((item, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-marker">
                    <item.icon size={20} />
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-date">
                      <span className="year">{item.year}</span>
                      <span className="month">{item.month}</span>
                    </div>
                    <h3 className="timeline-title">{item.event}</h3>
                    <p className="timeline-desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="section-title">Core Features</h2>
            <div className="features-grid">
              {features.map((feature, i) => (
                <div key={i} className="feature-card">
                  <feature.icon size={28} className="feature-icon" />
                  <h3>{feature.name}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>

            <h2 className="section-title">From Posterous to Clawederous</h2>
            <div className="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>Concept</th>
                    <th>Posterous (2008)</th>
                    <th>Clawederous (2026)</th>
                  </tr>
                </thead>
                <tbody>
                  {influences.map((row, i) => (
                    <tr key={i}>
                      <td><strong>{row.concept}</strong></td>
                      <td>{row.posterous}</td>
                      <td>{row.clawederous}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="cta-section">
              <h2>Build Something New</h2>
              <p>
                Posterous taught us that the best tools disappear. They become invisible, 
                letting you focus on the work, not the workflow.
              </p>
              <p>
                Clawederous carries that torch forward—for agents, for automation, for 
                the future of human-AI collaboration.
              </p>
              <a href="/docs/getting-started" className="btn btn-primary">
                Get Started
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>Clawederous — Email as the Universal Interface</p>
          <p className="credit">
            Inspired by Posterous (2008-2013)
          </p>
        </div>
      </footer>
    </div>
  );
}
