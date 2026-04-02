import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Dragons from './pages/Dragons'
import Characters from './pages/Characters'
import Timeline from './pages/Timeline'
import MapPage from './pages/Map'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/dragons">Dragons</NavLink>
        <NavLink to="/characters">Characters</NavLink>
        <NavLink to="/timeline">Timeline</NavLink>
        <NavLink to="/map">Map</NavLink>
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
    </BrowserRouter>
  )
}

export default App