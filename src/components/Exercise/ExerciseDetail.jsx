import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Header from '../common/Header'
import Badge from '../UI/Badge'
import Button from '../UI/Button'
import Modal from '../UI/Modal'
import VideoPlayer from '../Media/VideoPlayer'
import { DAYS } from '../../data/constants'
import { exercisesData } from '../../data/exercisesData'
import { formatDuration, titleCase } from '../../utils/helpers'
import styles from './Exercise.module.css'

function ExerciseDetail({ workoutPlan = {}, onAddToPlan }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [selectedDay, setSelectedDay] = useState('Monday')
  const exerciseId = Number(id)
  const exercise = exercisesData.find((item) => item.id === exerciseId)

  if (!exercise) {
    return (
      <section className="page">
        <Header title="Exercise not found" subtitle="This exercise is not in the catalog." />
        <Button onClick={() => navigate('/exercises')}>Back to Exercises</Button>
      </section>
    )
  }

  const previousId = exerciseId > 1 ? exerciseId - 1 : null
  const nextId = exerciseId < exercisesData.length ? exerciseId + 1 : null

  // Adding from the detail page also jumps to the planner so the new card is visible.
  const handleAdd = () => {
    onAddToPlan?.(selectedDay, exercise)
    setShowModal(false)
    navigate('/workout-planner')
  }

  return (
    <section className="page">
      <Header
        title={exercise.name}
        subtitle={`${titleCase(exercise.category)} · ${titleCase(exercise.difficulty)}`}
      />
      <img src={exercise.image} alt={exercise.name} className={styles.heroImage} />
      <div className={styles.cardMeta}>
        {exercise.muscleGroups.map((muscle) => (
          <Badge key={muscle} label={muscle} tone="neutral" />
        ))}
      </div>
      <p>
        Duration: {formatDuration(exercise.duration)} · {exercise.sets} sets × {exercise.reps}{' '}
        reps · {exercise.caloriesBurn} cal
      </p>
      <p>Equipment: {exercise.equipment}</p>
      <ol>
        {exercise.instructions.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <VideoPlayer
        videoUrl={exercise.videoUrl}
        title={`${exercise.name} demonstration`}
        description="Watch the movement, then add it to a training day."
      />
      <div className={styles.cardActions}>
        <Button variant="secondary" onClick={() => navigate('/exercises')}>
          Back to Exercises
        </Button>
        {previousId ? (
          <Button variant="secondary" onClick={() => navigate(`/exercises/${previousId}`)}>
            Previous Exercise
          </Button>
        ) : null}
        {nextId ? (
          <Button variant="secondary" onClick={() => navigate(`/exercises/${nextId}`)}>
            Next Exercise
          </Button>
        ) : null}
        <Button onClick={() => setShowModal(true)}>Add to Workout Plan</Button>
      </div>
      {showModal && (
        <Modal title="Add to weekly plan" isOpen onClose={() => setShowModal(false)}>
          <label>
            Choose a day
            <select value={selectedDay} onChange={(event) => setSelectedDay(event.target.value)}>
              {DAYS.map((day) => (
                <option key={day} value={day}>
                  {day} ({workoutPlan[day]?.length ?? 0})
                </option>
              ))}
            </select>
          </label>
          <Button onClick={handleAdd}>Confirm add</Button>
        </Modal>
      )}
    </section>
  )
}

export default ExerciseDetail
