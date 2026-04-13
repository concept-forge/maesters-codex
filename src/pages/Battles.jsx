import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import battles from '../data/battles.json'
import dragons from '../data/dragons.json'
import locations from '../data/locations.json'

function Battles() {
  const [selected, setSelected] = useState(null)
  const navigate = useNavigate()

  function getDragons(dragonIds) {
    return dragonIds.map(id => dragons.find(d => d.id === id)).filter(Boolean)
  }

  function getLocations(locationIds) {
    return (locationIds || []).map(id => locations.find(l => l.id === id)).filter(Boolean)
  }

  function getSides(commanders) {
    const sides = [...new Set(commanders.map(c => c.side))]
    return sides
  }

  function getCommandersBySide(commanders, side) {
    return commanders.filter(c => c.side === side)
  }

  if (selected) {
    const battleDragons = getDragons(selected.dragons)
    const battleLocations = getLocations(selected.map_location_ids)
    const sides = getSides(selected.commanders)

    return (
      <div>
        <div className="page-hero">
          <h2>{selected.name}</h2>
          <p>{selected.conflict} · {selected.year}</p>
        </div>

        <div className="battle-detail">
          <button className="house-back" onClick={() => setSelected(null)}>
            ← Back to Battles
          </button>

          {/* Outcome banner */}
          <div className={`battle-outcome-banner ${selected.outcome_type}`}>
            <span className="battle-outcome-label">
              {selected.outcome_type === 'victory' ? '⚔️' : '💀'} {selected.outcome}
            </span>
            <span className="battle-outcome-location">📍 {selected.location} · {selected.year}</span>
          </div>

          {/* Summary */}
          <div className="battle-section">
            <h3 className="battle-section-title">Battle Summary</h3>
            <p className="battle-summary">{selected.summary}</p>
          </div>

          {/* Commanders — dynamic sides */}
          <div className="battle-commanders-grid" style={{ gridTemplateColumns: `repeat(${sides.length}, 1fr)` }}>
            {sides.map(side => (
              <div key={side} className="battle-section">
                <h3 className="battle-section-title">⚔️ {side}</h3>
                <div className="battle-commanders">
                  {getCommandersBySide(selected.commanders, side).map((c, i) => (
                    <div key={i} className={`battle-commander ${i === 0 ? 'targaryen' : 'opposing'}`}>
                      <span className="commander-name">{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Dragons */}
          {battleDragons.length > 0 && (
            <div className="battle-section">
              <h3 className="battle-section-title">🐉 Dragons Involved</h3>
              <div className="battle-dragons">
                {battleDragons.map(dragon => (
                  <div key={dragon.id} className="battle-dragon-card">
                    {dragon.image && (
                      <img src={dragon.image} alt={dragon.name} className="battle-dragon-img" />
                    )}
                    <div className="battle-dragon-info">
                      <p className="battle-dragon-name">{dragon.name}</p>
                      <p className="battle-dragon-sub">{dragon.also_known_as}</p>
                      <p className="battle-dragon-sub">Colour: {dragon.color}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Casualties + Significance */}
          <div className="battle-two-col">
            <div className="battle-section">
              <h3 className="battle-section-title">💀 Casualties</h3>
              <p className="battle-summary">{selected.casualties}</p>
            </div>
            <div className="battle-section">
              <h3 className="battle-section-title">📜 Historical Significance</h3>
              <p className="battle-summary">{selected.significance}</p>
            </div>
          </div>

          {/* Locations */}
          {battleLocations.length > 0 && (
            <div className="battle-section">
              <h3 className="battle-section-title">🗺 Key Locations</h3>
              <div className="battle-locations">
                {battleLocations.map(loc => (
                  <div
                    key={loc.id}
                    className="battle-location clickable"
                    onClick={() => navigate('/map', { state: { highlightId: loc.id } })}
                  >
                    <div className={`connection-dot ${loc.type}`} />
                    <div className="battle-location-text">
                      <p className="connection-name">{loc.name}</p>
                      <p className="connection-sub">{loc.description}</p>
                      <span className="battle-location-link">View on map →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="page-hero">
        <h2>Battles</h2>
        <p>The conflicts that shaped the Known World</p>
      </div>

      <div className="battles-conflict-groups">
        {[...new Set(battles.map(b => b.conflict))].map(conflict => (
          <div key={conflict} className="conflict-group">
            <h3 className="conflict-group-title">{conflict}</h3>
            <div className="battle-grid">
              {battles.filter(b => b.conflict === conflict).map(battle => (
                <div
                  key={battle.id}
                  className={`battle-card ${battle.outcome_type}`}
                  onClick={() => setSelected(battle)}
                >
                  <div className="battle-card-header">
                    <span className="battle-card-conflict">{battle.conflict}</span>
                    <span className="battle-card-year">{battle.year}</span>
                  </div>
                  <h3 className="battle-card-name">{battle.name}</h3>
                  <p className="battle-card-location">📍 {battle.location}</p>
                  <p className="battle-card-summary">{battle.summary.slice(0, 120)}...</p>
                  <div className="battle-card-footer">
                    <span className={`battle-outcome-tag ${battle.outcome_type}`}>
                      {battle.outcome_type === 'victory' ? '⚔️' : '💀'} {battle.outcome}
                    </span>
                    {battle.dragons.length > 0 && (
                      <span className="battle-card-dragons">
                        🐉 {battle.dragons.length} dragon{battle.dragons.length !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Battles