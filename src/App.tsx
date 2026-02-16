import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom'
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
      <Link to="/" className="logo">Clawderous<span>.</span></Link>
      <ul className="nav-links">
        <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
        <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link></li>
        <li><Link to="/posterous" className={location.pathname === '/posterous' ? 'active' : ''}>Posterous</Link></li>
        <li><Link to="/docs/getting-started" className={location.pathname.startsWith('/docs') ? 'active' : ''}>Docs</Link></li>
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
