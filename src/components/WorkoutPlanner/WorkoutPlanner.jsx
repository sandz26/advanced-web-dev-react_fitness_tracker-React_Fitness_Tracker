import { DAYS } from '../../data/constants'
import DayCard from './DayCard'
import styles from './WorkoutPlanner.module.css'

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
