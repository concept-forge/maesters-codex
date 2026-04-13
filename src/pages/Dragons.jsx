import { useState } from 'react'
import dragons from '../data/dragons.json'
import characters from '../data/characters.json'
import CardModal from '../components/CardModal'

function Dragons() {
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  function getRiders(riderIds) {
    return riderIds.map(id => {
      const character = characters.find(c => c.id === id)
      return character ? character.name : 'Unknown'
    })
  }

  function getStatusClass(status) {
    if (status === 'Alive') return 'status-badge status-alive'
    if (status === 'Dead') return 'status-badge status-dead'
    return 'status-badge status-unknown'
  }

  const filtered = dragons.filter(dragon => {
    const matchesSearch =
      dragon.name.toLowerCase().includes(search.toLowerCase()) ||
      dragon.also_known_as.toLowerCase().includes(search.toLowerCase())
    const matchesStatus =
      statusFilter === 'all' || dragon.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div>
      <div className="page-hero">
        <h2>Dragons</h2>
        <p>The fires that shaped a dynasty</p>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search dragons..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />
      
      </div>

      {filtered.length === 0 && (
        <p className="no-results">No dragons found.</p>
      )}

      <div className="card-grid">
        {filtered.map(dragon => (
          <div key={dragon.id} className="card" onClick={() => setSelected(dragon)}>
            {dragon.image ? (
              <img src={dragon.image} alt={dragon.name} className="card-image" />
            ) : (
              <div className="card-image-placeholder">No image</div>
            )}
            <div className="card-body">
              <h3>{dragon.name}</h3>
              <p className="also-known">{dragon.also_known_as}</p>
              <p><span>Colour:</span> {dragon.color}</p>
              <div className="riders">
                <span>Riders:</span>
                <ul>
                  {getRiders(dragon.rider_ids).map((name, index) => (
                    <li key={index}>{name}</li>
                  ))}
                </ul>
              </div>
            
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <CardModal onClose={() => setSelected(null)}>
          {selected.image ? (
            <img src={selected.image} alt={selected.name} className="modal-image" />
          ) : (
            <div className="modal-image-placeholder">No image</div>
          )}
          <div className="modal-body">
            <h3>{selected.name}</h3>
            <p className="also-known">{selected.also_known_as}</p>
            <p><span>Colour:</span> {selected.color}</p>
            <p><span>Flame:</span> {selected.flame_color}</p>
            <div className="riders">
              <span>Riders:</span>
              <ul>
                {getRiders(selected.rider_ids).map((name, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ul>
            </div>
          
            <p className="description">{selected.description}</p>
          </div>
        </CardModal>
      )}
    </div>
  )
}

export default Dragons