import { useState } from 'react'
import { NavLink } from 'react-router'
import styles from './Navbar.module.css'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/exercises', label: 'Exercises' },
  { to: '/workout-planner', label: 'Workout Planner' },
  { to: '/history', label: 'History' },
  { to: '/progress', label: 'Progress' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setMenuOpen(false)
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.brand} end style={{ letterSpacing: '0.02em' }}>
          FitTrack
        </NavLink>
        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((open) => !open)}
          onKeyDown={handleKeyDown}
        >
          Menu
        </button>
        <nav
          className={`${styles.nav} ${menuOpen ? styles.open : ''}`}
          aria-label="Main"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
