import { useNavigate } from 'react-router-dom'

const sections = [
  {
    path: '/dragons',
    title: 'Dragons',
    subtitle: 'The fires that shaped a dynasty',
    description: 'From Balerion the Black Dread to Drogon — explore every dragon in the Targaryen lineage.',
  },
  {
    path: '/characters',
    title: 'Characters',
    subtitle: 'The dragonriders of old',
    description: 'Kings, queens, and warriors who bonded with dragons and changed the course of history.',
  },
  {
    path: '/timeline',
    title: 'Timeline',
    subtitle: 'From conquest to Long Night',
    description: 'Follow the full history of Westeros from Aegon\'s Landing to the fall of the Night King.',
  },
  {
    path: '/map',
    title: 'Interactive Map',
    subtitle: 'The Known World',
    description: 'Explore every castle, city and dragon site across Westeros and Essos.',
  },
]

function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">

      {/* Hero */}
      <div className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">The Known World Awaits</p>
          <h1 className="hero-title">Maesters<br />Codex</h1>
          <p className="hero-subtitle">
            A complete guide to the dragons, characters, history and geography
            of George R.R. Martin's universe.
          </p>
          <button className="hero-cta" onClick={() => navigate('/dragons')}>
            Enter the Codex
          </button>
        </div>
        <div className="hero-sigil">☽</div>
      </div>

      {/* Divider */}
      <div className="home-divider">
        <span>✦</span>
      </div>

      {/* Section cards */}
      <div className="home-sections">
        {sections.map(section => (
          <div
            key={section.path}
            className="home-card"
            onClick={() => navigate(section.path)}
          >
            <div className="home-card-inner">
              <p className="home-card-subtitle">{section.subtitle}</p>
              <h3 className="home-card-title">{section.title}</h3>
              <p className="home-card-desc">{section.description}</p>
              <span className="home-card-arrow">→</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer quote */}
      <div className="home-quote">
        <p>"Fire and Blood"</p>
        <span>— Words of House Targaryen</span>
      </div>

    </div>
  )
}

export default Home