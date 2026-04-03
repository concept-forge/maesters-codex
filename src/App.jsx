import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Dragons from './pages/Dragons'
import Characters from './pages/Characters'
import Timeline from './pages/Timeline'
import MapPage from './pages/Map'
import Home from './pages/Home'
import NavMenu from './components/NavMenu'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <img src="/images/Logo.png" alt="Maesters Codex" className="footer-logo" />
        <div className="footer-middle">
          <p className="footer-title">Maesters Codex</p>
          <p className="footer-sub">A guide to the world of George R.R. Martin</p>
        </div>
        <div className="footer-social">
          <a
            href="https://instagram.com/maestercodex"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-instagram"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
            </svg>
            @maestercodex
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Fan project — not affiliated with HBO or George R.R. Martin</p>
      </div>
    </footer>
  )
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/" end>
          <img src="/images/Logo.png" alt="Maesters Codex" className="nav-logo" />
        </NavLink>
        <div className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/dragons">Dragons</NavLink>
          <NavLink to="/characters">Characters</NavLink>
          <NavLink to="/timeline">Timeline</NavLink>
          <NavLink to="/map">Map</NavLink>
        </div>
        <NavMenu />
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dragons" element={<Dragons />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}

export default App