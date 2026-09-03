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
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.brand} end>
          FitTrack
        </NavLink>
        <nav className={styles.nav} aria-label="Main">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
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
