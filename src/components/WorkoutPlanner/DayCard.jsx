import PropTypes from 'prop-types'
import Button from '../UI/Button'
import Card from '../UI/Card'
import styles from './WorkoutPlanner.module.css'

const DayCard = ({ day, exercises = [], onRemoveExercise, onClearDay }) => {
  const hasExercises = exercises.length > 0

  return (
    <Card title={day} selected={hasExercises}>
      {hasExercises ? (
        <ul className={styles.dayList}>
          {exercises.map((exercise) => (
            <li key={`${day}-${exercise.id}`}>
              <span>{exercise.name}</span>
              {onRemoveExercise ? (
                <button type="button" onClick={() => onRemoveExercise(day, exercise.id)}>
                  Remove
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <p>No exercises planned</p>
      )}
      {hasExercises && onClearDay ? (
        <Button variant="danger" onClick={() => onClearDay(day)}>
          Clear day
        </Button>
      ) : null}
    </Card>
  )
}

DayCard.propTypes = {
  day: PropTypes.string.isRequired,
  exercises: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
  onRemoveExercise: PropTypes.func,
  onClearDay: PropTypes.func,
}

export default DayCard
