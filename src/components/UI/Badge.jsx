import styles from './UI.module.css'

function Badge({ label, tone = 'neutral' }) {
  return <span className={`${styles.badge} ${styles[tone] ?? ''}`}>{label}</span>
}

export default Badge
