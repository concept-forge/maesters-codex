import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function NavMenu() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        className={`hamburger ${open ? 'open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <div className="mobile-menu" onClick={() => setOpen(false)}>
          <NavLink to="/" end onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/dragons" onClick={() => setOpen(false)}>Dragons</NavLink>
          <NavLink to="/characters" onClick={() => setOpen(false)}>Characters</NavLink>
          <NavLink to="/timeline" onClick={() => setOpen(false)}>Timeline</NavLink>
          <NavLink to="/map" onClick={() => setOpen(false)}>Map</NavLink>
        </div>
      )}
    </>
  )
}

export default NavMenu