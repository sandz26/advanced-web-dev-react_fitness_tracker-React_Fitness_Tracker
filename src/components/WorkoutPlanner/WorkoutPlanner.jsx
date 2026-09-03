import DayCard from './DayCard'
import styles from './WorkoutPlanner.module.css'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function WorkoutPlanner({ plan = {}, onRemoveExercise, onClearDay }) {
  return (
    <div className={styles.grid}>
      {DAYS.map((day) => (
        <DayCard
          key={day}
          day={day}
          exercises={plan[day] ?? []}
          onRemoveExercise={onRemoveExercise}
          onClearDay={onClearDay}
        />
      ))}
    </div>
  )
}

export default WorkoutPlanner
