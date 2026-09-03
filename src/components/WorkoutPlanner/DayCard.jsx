import Card from '../UI/Card'
import styles from './WorkoutPlanner.module.css'

function DayCard({ day, exercises = [], onRemoveExercise, onClearDay }) {
  return (
    <Card title={day}>
      {exercises.length === 0 ? (
        <p>No exercises planned</p>
      ) : (
        <ul className={styles.dayList}>
          {exercises.map((exercise) => (
            <li key={exercise.id}>
              <span>{exercise.name}</span>
              {onRemoveExercise ? (
                <button type="button" onClick={() => onRemoveExercise(day, exercise.id)}>
                  Remove
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      )}
      {onClearDay ? (
        <button type="button" onClick={() => onClearDay(day)}>
          Clear day
        </button>
      ) : null}
    </Card>
  )
}

export default DayCard
