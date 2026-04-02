import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import locations from '../data/locations.json'

function makeIcon(type) {
  const color = type === 'dragon' ? '#e84545' : '#c9a227'
  const border = type === 'dragon' ? '#8a1010' : '#8a6a10'
  const glow = type === 'dragon' ? 'rgba(232,69,69,0.7)' : 'rgba(201,162,39,0.6)'
  return L.divIcon({
    className: '',
    html: `<div style="
      width: 12px; height: 12px;
      background: ${color};
      border: 2px solid ${border};
      border-radius: 50%;
      box-shadow: 0 0 8px ${glow};
    "></div>`,
    iconAnchor: [6, 6]
  })
}

function MapPage() {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (mapInstanceRef.current) return

    const img = new Image()
    img.src = '/images/westeros-map.jpg'
    img.onload = () => {
      const W = img.naturalWidth
      const H = img.naturalHeight

      const map = L.map(mapRef.current, {
        crs: L.CRS.Simple,
        minZoom: -2,
        maxZoom: 2,
        zoomSnap: 0.25,
        attributionControl: false,
      })

      mapInstanceRef.current = map

      const bounds = [[0, 0], [H, W]]
      L.imageOverlay('/images/westeros-map.jpg', bounds).addTo(map)
      map.fitBounds(bounds)
      map.setMaxBounds(bounds)

      locations.forEach(loc => {
        const x = (loc.x / 100) * W
        const y = H - (loc.y / 100) * H
        const marker = L.marker([y, x], { icon: makeIcon(loc.type) })
          .addTo(map)
          .on('click', (e) => {
            L.DomEvent.stopPropagation(e)
            setSelected(loc)
          })
        marker.locationType = loc.type
        markersRef.current.push(marker)
      })
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  function handleFilter(value) {
    setFilter(value)
    markersRef.current.forEach(marker => {
      const map = mapInstanceRef.current
      if (!map) return
      if (value === 'all' || marker.locationType === value) {
        if (!map.hasLayer(marker)) marker.addTo(map)
      } else {
        if (map.hasLayer(marker)) marker.remove()
      }
    })
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
            onClick={() => handleFilter('all')}
          >All</button>
          <button
            className={`map-filter-btn ${filter === 'location' ? 'active' : ''}`}
            onClick={() => handleFilter('location')}
          >
            <span className="dot gold"></span> Locations
          </button>
          <button
            className={`map-filter-btn ${filter === 'dragon' ? 'active' : ''}`}
            onClick={() => handleFilter('dragon')}
          >
            <span className="dot red"></span> Dragon Sites
          </button>
        </div>

        <div ref={mapRef} className="map-container" />

        {selected && (
          <div className="map-popup">
            <button className="map-popup-close" onClick={() => setSelected(null)}>✕</button>
            <div className={`map-popup-type ${selected.type}`}>
              {selected.type === 'dragon' ? 'Dragon Site' : 'Location'}
            </div>
            <h3>{selected.name}</h3>
            <p>{selected.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MapPage