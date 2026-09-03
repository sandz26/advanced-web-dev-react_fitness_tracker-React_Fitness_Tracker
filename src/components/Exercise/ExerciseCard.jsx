import Card from '../UI/Card'
import Badge from '../UI/Badge'
import styles from './Exercise.module.css'

function ExerciseCard({ exercise, onSelect }) {
  if (!exercise) {
    return null
  }

  return (
    <Card title={exercise.name}>
      <div className={styles.cardMeta}>
        <Badge label={exercise.category} />
        <Badge label={exercise.difficulty} tone="neutral" />
      </div>
      {onSelect ? (
        <button type="button" onClick={() => onSelect(exercise)}>
          View details
        </button>
      ) : null}
    </Card>
  )
}

export default ExerciseCard
