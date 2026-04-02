import { useState } from 'react'
import characters from '../data/characters.json'
import dragons from '../data/dragons.json'
import CardModal from '../components/CardModal'

function Characters() {
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  function getDragon(dragonId) {
    const dragon = dragons.find(d => d.id === dragonId)
    return dragon ? dragon.name : 'None'
  }

  function getStatusClass(status) {
    if (status === 'Alive') return 'status-badge status-alive'
    if (status === 'Dead') return 'status-badge status-dead'
    return 'status-badge status-unknown'
  }

  const filtered = characters.filter(character => {
    const matchesSearch =
      character.name.toLowerCase().includes(search.toLowerCase()) ||
      character.alias.toLowerCase().includes(search.toLowerCase()) ||
      character.house.toLowerCase().includes(search.toLowerCase())
    const matchesStatus =
      statusFilter === 'all' || character.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div>
      <div className="page-hero">
        <h2>Characters</h2>
        <p>The dragonriders of House Targaryen</p>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search characters..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />
        <div className="filter-btns">
          {['all', 'alive', 'dead', 'unknown'].map(s => (
            <button
              key={s}
              className={`filter-btn ${statusFilter === s ? 'active' : ''}`}
              onClick={() => setStatusFilter(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <p className="no-results">No characters found.</p>
      )}

      <div className="card-grid">
        {filtered.map(character => (
          <div key={character.id} className="card" onClick={() => setSelected(character)}>
            {character.image ? (
              <img src={character.image} alt={character.name} className="card-image" />
            ) : (
              <div className="card-image-placeholder">No image yet</div>
            )}
            <div className="card-body">
              <h3>{character.name}</h3>
              <p className="also-known">{character.alias}</p>
              <p><span>House:</span> {character.house}</p>
              <p><span>Dragon:</span> {getDragon(character.dragon_id)}</p>
              <p>
                <span>Status: </span>
                <span className={getStatusClass(character.status)}>{character.status}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <CardModal onClose={() => setSelected(null)}>
          {selected.image ? (
            <img src={selected.image} alt={selected.name} className="modal-image" />
          ) : (
            <div className="modal-image-placeholder">No image yet</div>
          )}
          <div className="modal-body">
            <h3>{selected.name}</h3>
            <p className="also-known">{selected.alias}</p>
            <p><span>House:</span> {selected.house}</p>
            <p><span>Dragon:</span> {getDragon(selected.dragon_id)}</p>
            <p>
              <span>Status: </span>
              <span className={getStatusClass(selected.status)}>{selected.status}</span>
            </p>
            <p className="description">{selected.description}</p>
          </div>
        </CardModal>
      )}
    </div>
  )
}

export default Characters