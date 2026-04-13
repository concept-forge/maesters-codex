import dragons from '../data/dragons.json'
import houses from '../data/houses.json'
import events from '../data/events.json'
import locations from '../data/locations.json'

function ConnectionsPanel({ character, onClose }) {
  if (!character) return null

  const dragon = dragons.find(d => d.id === character.dragon_id)

  const house = houses.find(h =>
    h.name.toLowerCase().includes(
      character.house.toLowerCase().split('/')[0].trim()
    )
  )

  const relatedEvents = (character.event_ids || [])
    .map(id => events.find(e => e.id === id))
    .filter(Boolean)

  const relatedLocations = locations.filter(l =>
    dragon && l.description.toLowerCase().includes(dragon.name.toLowerCase())
  )

  return (
    <div className="connections-overlay" onClick={onClose}>
      <div className="connections-panel" onClick={e => e.stopPropagation()}>

        <div className="connections-header">
          <div>
            <h3>{character.name}</h3>
            <p className="connections-alias">{character.alias}</p>
          </div>
          <button className="connections-close" onClick={onClose}>✕</button>
        </div>

        <div className="connections-body">

          {dragon && (
            <div className="connection-section">
              <div className="connection-section-title">🐉 Dragon</div>
              <div className="connection-item dragon-item">
                {dragon.image && (
                  <img src={dragon.image} alt={dragon.name} className="connection-img" />
                )}
                <div>
                  <p className="connection-name">{dragon.name}</p>
                  <p className="connection-sub">{dragon.also_known_as}</p>
                  <p className="connection-sub">Colour: {dragon.color}</p>
                  <span className={`status-badge ${dragon.status === 'Alive' ? 'status-alive' : 'status-dead'}`}>
                    {dragon.status}
                  </span>
                </div>
              </div>
            </div>
          )}

          {house && (
            <div className="connection-section">
              <div className="connection-section-title">🏰 House</div>
              <div className="connection-item">
                <span className="connection-sigil">{house.sigil}</span>
                <div>
                  <p className="connection-name">{house.name}</p>
                  <p className="connection-sub">"{house.words}"</p>
                  <p className="connection-sub">{house.seat} — {house.region}</p>
                </div>
              </div>
            </div>
          )}

          {relatedEvents.length > 0 && (
            <div className="connection-section">
              <div className="connection-section-title">📜 Timeline Events</div>
              {relatedEvents.map(event => (
                <div key={event.id} className="connection-item connection-event">
                  <div className="connection-event-year">{event.year}</div>
                  <div>
                    <p className="connection-name">{event.title}</p>
                    <p className="connection-sub">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {relatedLocations.length > 0 && (
            <div className="connection-section">
              <div className="connection-section-title">🗺 Locations</div>
              {relatedLocations.map(loc => (
                <div key={loc.id} className="connection-item">
                  <div className={`connection-dot ${loc.type}`} />
                  <div>
                    <p className="connection-name">{loc.name}</p>
                    <p className="connection-sub">{loc.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!dragon && !house && relatedEvents.length === 0 && relatedLocations.length === 0 && (
            <p className="connections-empty">No connections found for this character.</p>
          )}

        </div>
      </div>
    </div>
  )
}

export default ConnectionsPanel