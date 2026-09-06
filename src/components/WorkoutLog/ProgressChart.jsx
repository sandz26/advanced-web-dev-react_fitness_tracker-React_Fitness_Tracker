import styles from './WorkoutLog.module.css'

function ProgressChart({ totals }) {
  const workouts = totals?.workouts ?? 0
  const planned = totals?.planned ?? 0
  const calories = totals?.calories ?? 0
  const streak = totals?.streak ?? 0
  const bars = [
    { label: 'Workouts completed', value: workouts, cap: 7 },
    { label: 'Exercises in current plan', value: planned, cap: 14 },
    { label: 'Estimated calories burned', value: calories, cap: 400 },
    { label: 'Workout streak (days)', value: streak, cap: 7, isStreak: true },
  ]

  return (
    <section className={styles.chart}>
      {bars.map((bar) => (
        <div key={bar.label} className={styles.barItem}>
          <p className={bar.isStreak ? styles.streakLabel : styles.barText}>
            {bar.label}: {bar.value}
          </p>
          <div className={styles.track}>
            <div
              className={`${styles.fill} ${bar.isStreak ? styles.fillStreak : ''}`}
              style={{ width: `${Math.min(100, (bar.value / bar.cap) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </section>
  )
}

export default ProgressChart
