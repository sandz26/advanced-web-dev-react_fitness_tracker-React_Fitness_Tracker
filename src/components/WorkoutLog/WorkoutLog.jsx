import LogEntry from './LogEntry'
import styles from './WorkoutLog.module.css'

function WorkoutLog({ entries = [], onSubmit }) {
  return (
    <section className={styles.log}>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit?.(event)
        }}
      >
        <p>Workout logging form will be connected here.</p>
        <button type="submit">Save log</button>
      </form>
      {entries.length === 0 ? (
        <p>No workouts logged yet</p>
      ) : (
        entries.map((entry) => <LogEntry key={entry.id} entry={entry} />)
      )}
    </section>
  )
}

export default WorkoutLog
