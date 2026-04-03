import { useState, useRef } from 'react'
import locations from '../data/locations.json'

function MapPage() {
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const lastTouchDist = useRef(null)
  const lastTouchPos = useRef(null)
  const isDragging = useRef(false)
  const mapRef = useRef(null)

  const filtered = locations.filter(loc =>
    filter === 'all' || loc.type === filter
  )

  function handlePinClick(e, loc) {
    e.stopPropagation()
    const pin = e.currentTarget
    const container = pin.closest('.static-map-container')
    const pinRect = pin.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    const x = ((pinRect.left + pinRect.width / 2) - containerRect.left) / containerRect.width * 100
    const y = ((pinRect.top + pinRect.height / 2) - containerRect.top) / containerRect.height * 100
    setSelected({ ...loc, popupX: x, popupY: y })
  }

  function getTouchDist(touches) {
    const dx = touches[0].clientX - touches[1].clientX
    const dy = touches[0].clientY - touches[1].clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

  function handleTouchStart(e) {
    if (e.touches.length === 2) {
      lastTouchDist.current = getTouchDist(e.touches)
    } else if (e.touches.length === 1) {
      lastTouchPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      isDragging.current = false
    }
  }

  function handleTouchMove(e) {
    if (e.touches.length === 2) {
      e.preventDefault()
      const dist = getTouchDist(e.touches)
      if (lastTouchDist.current) {
        const delta = dist / lastTouchDist.current
        setScale(prev => Math.min(Math.max(prev * delta, 1), 4))
      }
      lastTouchDist.current = dist
    } else if (e.touches.length === 1 && scale > 1) {
      e.preventDefault()
      const touch = e.touches[0]
      if (lastTouchPos.current) {
        const dx = touch.clientX - lastTouchPos.current.x
        const dy = touch.clientY - lastTouchPos.current.y
        isDragging.current = true
        setOffset(prev => ({
          x: prev.x + dx,
          y: prev.y + dy
        }))
      }
      lastTouchPos.current = { x: touch.clientX, y: touch.clientY }
    }
  }

  function handleTouchEnd() {
    lastTouchDist.current = null
    lastTouchPos.current = null
  }

  function resetZoom() {
    setScale(1)
    setOffset({ x: 0, y: 0 })
  }

  return (
    <div>
      <div className="page-hero">
        <h2>Interactive Map</h2>
        <p>The Known World — from Westeros to Essos</p>
      </div>

      <div className="map-wrapper">
        <div className="map-controls">
          <button
            className={`map-filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >All</button>
          <button
            className={`map-filter-btn ${filter === 'location' ? 'active' : ''}`}
            onClick={() => setFilter('location')}
          >
            <span className="dot gold"></span> Locations
          </button>
          <button
            className={`map-filter-btn ${filter === 'dragon' ? 'active' : ''}`}
            onClick={() => setFilter('dragon')}
          >
            <span className="dot red"></span> Dragon Sites
          </button>
          {scale > 1 && (
            <button className="map-filter-btn" onClick={resetZoom}>
              ↺ Reset zoom
            </button>
          )}
        </div>

        <div
          className="static-map-container"
          onClick={() => setSelected(null)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: scale > 1 ? 'none' : 'pan-y' }}
        >
          <div
            ref={mapRef}
            className="map-inner"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
              transformOrigin: '0 0',
              transition: lastTouchDist.current ? 'none' : 'transform 0.1s ease',
            }}
          >
            <img
              src="/images/westeros-map.jpg"
              alt="Map of the Known World"
              className="static-map-image"
              draggable={false}
            />

            {filtered.map(loc => (
              <div
                key={loc.id}
                className={`map-pin ${loc.type}`}
                style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                onClick={(e) => handlePinClick(e, loc)}
              >
                <div className="pin-dot" />
                <div className="pin-tooltip">{loc.name}</div>
              </div>
            ))}
          </div>

          {selected && (
            <div
              className={`map-card ${selected.popupX > 70 ? 'anchor-right' : ''} ${selected.popupY > 70 ? 'anchor-bottom' : ''}`}
              style={{
                left: selected.popupX > 70 ? 'auto' : `${selected.popupX}%`,
                right: selected.popupX > 70 ? `${100 - selected.popupX}%` : 'auto',
                top: selected.popupY > 70 ? 'auto' : `${selected.popupY}%`,
                bottom: selected.popupY > 70 ? `${100 - selected.popupY}%` : 'auto',
              }}
              onClick={e => e.stopPropagation()}
            >
              <div className={`map-card-tag ${selected.type}`}>
                {selected.type === 'dragon' ? '🔥 Dragon Site' : '📍 Location'}
              </div>
              <h3 className="map-card-name">{selected.name}</h3>
              <p className="map-card-desc">{selected.description}</p>
              <button className="map-card-close" onClick={() => setSelected(null)}>✕</button>
            </div>
          )}
        </div>

        <p className="map-hint">Pinch to zoom · Drag to pan · Tap a pin for details</p>
      </div>
    </div>
  )
}

export default MapPage