import events from '../data/events.json'

const typeColors = {
  Conquest: '#c9a227',
  Battle: '#e84545',
  Political: '#6a8caf',
  Death: '#666',
  War: '#a83232',
  Dragon: '#2e8b57'
}

function Timeline() {
  return (
    <div>
      <div className="page-hero">
        <h2>Timeline</h2>
        <p>From the Conquest to the Long Night</p>
      </div>
      <div className="timeline-wrapper">
        <div className="timeline">
          {events.map(event => (
            <div key={event.id} className="timeline-item">
              <div className="timeline-year">{event.year}</div>
              <div className="timeline-dot" style={{ backgroundColor: typeColors[event.type] || '#c9b28f' }}></div>
              <div className="timeline-content">
                <div className="timeline-type" style={{ color: typeColors[event.type] || '#c9b28f' }}>{event.type}</div>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Timeline