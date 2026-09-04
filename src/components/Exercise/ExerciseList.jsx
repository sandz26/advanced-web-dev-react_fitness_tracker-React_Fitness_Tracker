import PropTypes from 'prop-types'
import Loading from '../common/Loading'
import ExerciseCard from './ExerciseCard'
import styles from './Exercise.module.css'

const ExerciseList = ({
  exercises = [],
  isLoading = false,
  error,
  workoutPlan = {},
  onSelect,
  onAdd,
}) => {
  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <p className={styles.error}>{error}</p>
  }

  if (exercises.length === 0) {
    return <p>No exercises found</p>
  }

  return (
    <div className={styles.list}>
      {exercises.map((exercise) => (
        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
          onSelect={onSelect}
          onAdd={onAdd}
          isInPlan={Object.values(workoutPlan).some((day) =>
            // An exercise is "in plan" if any weekday already contains its id.
            day.some((item) => item.id === exercise.id),
          )}
        />
      ))}
    </div>
  )
}

ExerciseList.propTypes = {
  exercises: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  workoutPlan: PropTypes.object,
  onSelect: PropTypes.func,
  onAdd: PropTypes.func,
}

export default ExerciseList
