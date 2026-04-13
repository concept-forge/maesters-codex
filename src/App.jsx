import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { useState } from 'react'

import Dragons from './pages/Dragons'
import Characters from './pages/Characters'
import Timeline from './pages/Timeline'
import MapPage from './pages/Map'
import Home from './pages/Home'
import Houses from './pages/Houses'
import NavMenu from './components/NavMenu'
import Battles from './pages/Battles'


function Footer({ setAboutOpen }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <img src="/images/Logo.png" alt="Maesters Codex" className="footer-logo" />
        
        <div className="footer-middle">
          <p className="footer-title">Maesters Codex</p>
          <p className="footer-sub">A fan-made compendium of the Known World</p>
        </div>

        <div className="footer-social">
          <a
            href="https://instagram.com/maestercodex"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-instagram"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            @maestercodex
          </a>
        </div>
      </div>

      <div className="footer-disclaimer">
        <p>
          Maesters Codex is an unofficial fan project. Not affiliated with HBO, George R.R. Martin, or any rights holders.
          All characters, locations, dragons and events are the intellectual property of their respective owners.
          Lore accuracy is our goal but errors and omissions may occur — we welcome corrections.
        </p>

        <button className="footer-about-btn" onClick={() => setAboutOpen(true)}>
          About this project
        </button>
      </div>
    </footer>
  )
}


function App() {
  const [aboutOpen, setAboutOpen] = useState(false)

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
          <NavLink to="/houses">Houses</NavLink>
          <NavLink to="/timeline">Timeline</NavLink>
          <NavLink to="/map">Map</NavLink>
          <NavLink to="/battles">Battles</NavLink>
        </div>

        <NavMenu />
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dragons" element={<Dragons />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/houses" element={<Houses />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/battles" element={<Battles />} />
        </Routes>
      </main>

      <Footer setAboutOpen={setAboutOpen} />

      {aboutOpen && (
        <div className="modal-overlay" onClick={() => setAboutOpen(false)}>
          <div
            className="modal-content"
            style={{ maxWidth: '560px' }}
            onClick={e => e.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setAboutOpen(false)}>✕</button>

            <div className="modal-body">
              <h3>About Maesters Codex</h3>
              <p className="also-known">A fan-made compendium of the Known World</p>

              <p className="description">
                Maesters Codex is a passion project created by fans of George R.R. Martin's A Song of Ice and Fire
                universe and HBO's Game of Thrones and House of the Dragon.
              </p>

              <p className="description">
                <strong style={{color:'#c9a227'}}>Disclaimer:</strong> This site is not affiliated with, endorsed by,
                or connected to HBO or any rights holders.
              </p>

              <p className="description">
                Follow us on Instagram{' '}
                <a href="https://instagram.com/maestercodex" target="_blank" rel="noopener noreferrer"
                   style={{color:'#c9a227'}}>
                  @maestercodex
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </BrowserRouter>
  )
}

export default App