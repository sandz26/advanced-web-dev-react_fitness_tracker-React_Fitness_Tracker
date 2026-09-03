import ExerciseCard from './ExerciseCard'
import Loading from '../common/Loading'
import styles from './Exercise.module.css'

function ExerciseList({ exercises = [], isLoading = false, error, onSelect }) {
  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <p>{error}</p>
  }

  if (exercises.length === 0) {
    return <p>No exercises found</p>
  }

  return (
    <div className={styles.list}>
      {exercises.map((exercise) => (
        <ExerciseCard key={exercise.id} exercise={exercise} onSelect={onSelect} />
      ))}
    </div>
  )
}

export default ExerciseList
