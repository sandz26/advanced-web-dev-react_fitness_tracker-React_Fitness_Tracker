import PropTypes from 'prop-types'
import { Trophy } from 'lucide-react'
import styles from './AchievementCard.module.css'

export default function AchievementCard({
  title = 'New record',
  badgeText = 'Achievement',
  description = 'Best set of push-ups this month',
  streakDays = 5,
  className = '',
}) {
  return (
    <article className={`${styles.card} ${className}`.trim()}>
      <div className={styles.iconTile} aria-hidden="true">
        <Trophy size={28} color="var(--highlight)" strokeWidth={2} />
      </div>
      <div className={styles.textGroup}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.badgeRow}>
          <span className={styles.badge}>{badgeText}</span>
        </div>
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.streakPill}>
        <span className={styles.streakDot} aria-hidden="true">●</span>
        <span>Streak: {streakDays} day{streakDays === 1 ? '' : 's'} active</span>
      </div>
    </article>
  )
}

AchievementCard.propTypes = {
  title: PropTypes.string,
  badgeText: PropTypes.string,
  description: PropTypes.string,
  streakDays: PropTypes.number,
  className: PropTypes.string,
}
