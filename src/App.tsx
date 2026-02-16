import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { About } from './pages/About'
import Posterous from './pages/Posterous'
import { GettingStarted } from './pages/GettingStarted'
import { API } from './pages/API'
import { Workflows } from './pages/Workflows'

function Nav() {
  const location = useLocation()
  
  return (
    <nav>
      <a href="/" className="logo">Clawederous<span>.</span></a>
      <ul className="nav-links">
        <li><a href="/" className={location.pathname === '/' ? 'active' : ''}>Home</a></li>
        <li><a href="/about" className={location.pathname === '/about' ? 'active' : ''}>About</a></li>
        <li><a href="/posterous" className={location.pathname === '/posterous' ? 'active' : ''}>Posterous</a></li>
        <li><a href="/docs/getting-started" className={location.pathname.startsWith('/docs') ? 'active' : ''}>Docs</a></li>
        <li><a href="https://github.com/tawkiebot/clawderous">GitHub</a></li>
      </ul>
      <a href="https://github.com/tawkiebot/clawderous" className="nav-cta">Get Started</a>
    </nav>
  )
}

function Footer() {
  return (
    <footer>
      <p>Built with 🦞 by <a href="https://github.com/tawkiebot">Tawkie</a></p>
    </footer>
  )
}

export default function App() {
  return (
    <BrowserRouter basename="/clawderous">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/posterous" element={<Posterous />} />
        <Route path="/docs/getting-started" element={<GettingStarted />} />
        <Route path="/docs/api" element={<API />} />
        <Route path="/docs/workflows" element={<Workflows />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
