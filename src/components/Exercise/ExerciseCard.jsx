import PropTypes from 'prop-types'
import Badge from '../UI/Badge'
import Button from '../UI/Button'
import Card from '../UI/Card'
import { formatDuration } from '../../utils/helpers'
import ExerciseIcon from './ExerciseIcon'
import styles from './Exercise.module.css'

const ExerciseCard = ({
  exercise,
  onSelect,
  onAdd,
  isInPlan = false,
}) => {
  if (!exercise) {
    return null
  }

  return (
    <Card title={exercise.name} selected={isInPlan} className={styles.exerciseCard}>
      <ExerciseIcon name={exercise.name} size={64} />
      <div className={styles.cardMeta}>
        <Badge label={exercise.category} />
        <Badge label={exercise.difficulty} />
      </div>
      <p className={styles.stats}>
        {formatDuration(exercise.duration)} · {exercise.sets} sets × {exercise.reps} reps
      </p>
      <p className={styles.calories}>{exercise.caloriesBurn} cal</p>
      <div className={styles.cardActions}>
        {onSelect ? (
          <Button variant="secondary" onClick={() => onSelect(exercise)}>
            View details
          </Button>
        ) : null}
        {onAdd ? (
          <Button onClick={() => onAdd(exercise)} disabled={isInPlan}>
            {isInPlan ? 'In plan' : 'Add to Workout Plan'}
          </Button>
        ) : null}
      </div>
    </Card>
  )
}

ExerciseCard.propTypes = {
  exercise: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    muscleGroups: PropTypes.arrayOf(PropTypes.string),
    difficulty: PropTypes.string,
    duration: PropTypes.number,
    sets: PropTypes.number,
    reps: PropTypes.number,
    image: PropTypes.string,
    caloriesBurn: PropTypes.number,
  }).isRequired,
  onSelect: PropTypes.func,
  onAdd: PropTypes.func,
  isInPlan: PropTypes.bool,
}

export default ExerciseCard
