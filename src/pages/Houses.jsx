import { useState } from 'react'
import houses from '../data/houses.json'

const ROLE_COLORS = {
  king:    { border: '#c9a227', text: '#d4a830', bg: '#120e04' },
  queen:   { border: '#c96a8a', text: '#d4809a', bg: '#120810' },
  prince:  { border: '#6a8ac9', text: '#8aaad4', bg: '#08100f' },
  default: { border: '#2a1010', text: '#c9b28f', bg: '#0f0808' },
}

function getRole(member) {
  const t = (member.title || '').toLowerCase()
  if (t.includes('king') || t.includes('conqueror') || t.includes('cruel') || t.includes('conciliator') || t.includes('peaceful') || t.includes('dragonbane') || t.includes('unworthy') || t.includes('unlikely') || t.includes('mad') || t.includes('young dragon') || t.includes('blessed')) return 'king'
  if (t.includes('queen consort') || t.includes('good queen') || t.includes('consort')) return 'queen'
  if (t.includes('queen')) return 'queen'
  if (t.includes('prince') || t.includes('princess')) return 'prince'
  return 'default'
}

function MemberCard({ member, allMembers, onClick, isSelected }) {
  const role = getRole(member)
  const colors = ROLE_COLORS[role]
  const children = allMembers.filter(m => m.parentIds?.includes(member.id))

  return (
    <div
      className={`hcard ${isSelected ? 'hcard-selected' : ''}`}
      style={{
        borderColor: isSelected ? '#e84545' : colors.border,
        background: colors.bg,
      }}
      onClick={() => onClick(member)}
    >
      <div className="hcard-name" style={{ color: colors.text }}>{member.name}</div>
      {member.reign && <div className="hcard-reign">{member.reign}</div>}
      <div className="hcard-title">{member.title}</div>
      {children.length > 0 && (
        <div className="hcard-children-count">{children.length} child{children.length > 1 ? 'ren' : ''} ▼</div>
      )}
    </div>
  )
}

function FamilyExplorer({ members }) {
  const [focus, setFocus] = useState(null)

  const focused = focus ? members.find(m => m.id === focus) : null
  const parents = focused
    ? (focused.parentIds || []).map(pid => members.find(m => m.id === pid)).filter(Boolean)
    : []
  const siblings = focused
    ? members.filter(m =>
        m.id !== focused.id &&
        m.parentIds?.some(pid => focused.parentIds?.includes(pid))
      )
    : []
  const children = focused
    ? members.filter(m => m.parentIds?.includes(focused.id))
    : []

  function handleClick(member) {
    setFocus(focus === member.id ? null : member.id)
  }

  const generations = {}
  members.forEach(m => {
    const g = m.generation ?? 1
    if (!generations[g]) generations[g] = []
    generations[g].push(m)
  })
  const sortedGens = Object.keys(generations).map(Number).sort((a, b) => a - b)

  if (!focused) {
    return (
      <div className="fexplorer">
        <div className="fexplorer-hint">Click any person to explore their family connections</div>
        <div className="fexplorer-all">
          {sortedGens.map(gen => (
            <div key={gen} className="fexplorer-timeline-row">
              <div className="fexplorer-gen-label">Gen {gen}</div>
              <div className="fexplorer-gen-cards">
                {generations[gen].map(m => (
                  <MemberCard
                    key={m.id}
                    member={m}
                    allMembers={members}
                    onClick={handleClick}
                    isSelected={false}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="fexplorer">
      <button className="fexplorer-reset" onClick={() => setFocus(null)}>← All members</button>

      {parents.length > 0 && (
        <div className="fexplorer-section">
          <div className="fexplorer-label">Parents</div>
          <div className="fexplorer-row">
            {parents.map(p => (
              <MemberCard key={p.id} member={p} allMembers={members} onClick={handleClick} isSelected={focus === p.id} />
            ))}
          </div>
          <div className="fexplorer-line-down" />
        </div>
      )}

      <div className="fexplorer-section fexplorer-focus-section">
        <div className="fexplorer-label">Selected</div>
        <div className="fexplorer-focus-wrap">
          <div
            className="hcard hcard-focus"
            style={{
              borderColor: '#e84545',
              background: ROLE_COLORS[getRole(focused)].bg,
              boxShadow: '0 0 20px rgba(232,69,69,0.2)',
            }}
          >
            <div className="hcard-name" style={{ color: ROLE_COLORS[getRole(focused)].text }}>
              {focused.name}
            </div>
            {focused.reign && <div className="hcard-reign">{focused.reign}</div>}
            <div className="hcard-title">{focused.title}</div>
            {parents.length > 0 && (
              <div className="hcard-detail">
                <span>Parents:</span> {parents.map(p => p.name).join(' & ')}
              </div>
            )}
          </div>
        </div>
      </div>

      {siblings.length > 0 && (
        <div className="fexplorer-section">
          <div className="fexplorer-label">Siblings</div>
          <div className="fexplorer-row">
            {siblings.map(s => (
              <MemberCard key={s.id} member={s} allMembers={members} onClick={handleClick} isSelected={focus === s.id} />
            ))}
          </div>
        </div>
      )}

      {children.length > 0 && (
        <div className="fexplorer-section">
          <div className="fexplorer-line-down" />
          <div className="fexplorer-label">Children</div>
          <div className="fexplorer-row">
            {children.map(c => (
              <MemberCard key={c.id} member={c} allMembers={members} onClick={handleClick} isSelected={focus === c.id} />
            ))}
          </div>
        </div>
      )}

      {children.length === 0 && siblings.length === 0 && parents.length === 0 && (
        <div className="fexplorer-hint">No known family connections</div>
      )}
    </div>
  )
}

function Houses() {
  const [selected, setSelected] = useState(null)

  return (
    <div>
      <div className="page-hero">
        <h2>Houses</h2>
        <p>The great houses of Westeros</p>
      </div>

      {!selected ? (
        <div className="card-grid">
          {houses.map(house => (
            <div
              key={house.id}
              className="house-card"
              onClick={() => setSelected(house)}
              style={{ '--house-color': house.color }}
            >
              {house.image ? (
                <div className="house-sigil-img-wrap">
                  <img src={house.image} alt={house.name} className="house-sigil-img" />
                </div>
              ) : (
                <div className="house-sigil">{house.sigil}</div>
              )}
              <div className="house-card-body">
                <h3>{house.name}</h3>
                <p className="house-words">"{house.words}"</p>
                <p className="house-seat"><span>Seat:</span> {house.seat}</p>
                <p className="house-region"><span>Region:</span> {house.region}</p>
                <p className="house-desc">{house.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="house-detail">
          <button className="house-back" onClick={() => setSelected(null)}>
            ← Back to Houses
          </button>

          <div className="house-detail-header" style={{ '--house-color': selected.color }}>
            {selected.image ? (
              <img src={selected.image} alt={selected.name} className="house-detail-sigil-img" />
            ) : (
              <span className="house-detail-sigil">{selected.sigil}</span>
            )}
            <div>
              <h2>{selected.name}</h2>
              <p className="house-words">"{selected.words}"</p>
              <p>{selected.description}</p>
            </div>
          </div>

          <div className="house-tree-section">
            <h3 className="tree-heading">Family Tree</h3>
            <div className="tree-legend">
              <div className="legend-item">
                <div className="legend-dot" style={{ borderColor: '#c9a227', background: '#120e04' }} />
                King / Queen
              </div>
              <div className="legend-item">
                <div className="legend-dot" style={{ borderColor: '#c96a8a', background: '#120810' }} />
                Consort
              </div>
              <div className="legend-item">
                <div className="legend-dot" style={{ borderColor: '#6a8ac9', background: '#08100f' }} />
                Prince / Princess
              </div>
              <div className="legend-item">
                <div className="legend-dot" style={{ borderColor: '#3a2010', background: '#0f0808' }} />
                Other
              </div>
            </div>
            <FamilyExplorer members={selected.members} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Houses