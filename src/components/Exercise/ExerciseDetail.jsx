import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate, useParams } from 'react-router'
import Header from '../common/Header'
import Badge from '../UI/Badge'
import Button from '../UI/Button'
import Modal from '../UI/Modal'
import Select from '../UI/Select'
import ExerciseIcon from './ExerciseIcon'
import { DAYS } from '../../data/constants'
import { exercisesData } from '../../data/exercisesData'
import { formatDuration, titleCase } from '../../utils/helpers'
import { fetchExerciseDemo, getYouTubeEmbedUrl } from '../../utils/ascendApi'
import styles from './Exercise.module.css'

function ExerciseDetail({ workoutPlan = {}, onAddToPlan }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [selectedDay, setSelectedDay] = useState('Monday')
  const [mediaState, setMediaState] = useState({ loading: true, media: null })

  const exerciseId = Number(id)
  const exercise = exercisesData.find((item) => item.id === exerciseId)

  useEffect(() => {
    let canceled = false

    if (!exercise) {
      setMediaState({ loading: false, media: null })
      return undefined
    }

    const override = exercise.demoOverride
    if (override && override.demoUrl && typeof override.demoUrl === 'string' && override.demoUrl.trim()) {
      const type = (override.type || 'gif').toLowerCase()
      const url =
        type === 'youtube'
          ? getYouTubeEmbedUrl(override.demoUrl)
          : override.demoUrl.trim()
      setMediaState({
        loading: false,
        media: {
          type,
          url,
          source: 'override',
          caption: null,
        },
      })
      return undefined
    }

    if (exercise.gifUrl) {
      setMediaState({
        loading: false,
        media: {
          type: 'gif',
          url: exercise.gifUrl,
          source: 'AscendAPI',
          caption: 'Source: AscendAPI',
        },
      })
      return undefined
    }

    setMediaState({ loading: true, media: null })

    fetchExerciseDemo(exercise)
      .then((result) => {
        if (!canceled) {
          setMediaState({ loading: false, media: result })
        }
      })
      .catch(() => {
        if (!canceled) {
          setMediaState({ loading: false, media: null })
        }
      })

    return () => {
      canceled = true
    }
  }, [exerciseId, exercise])

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

      <div className={styles.mediaContainer} data-testid="exercise-media-slot">
        {mediaState.loading ? (
          <div
            className={styles.mediaSkeleton}
            data-testid="media-skeleton"
            role="progressbar"
            aria-label="Loading demonstration"
          />
        ) : mediaState.media ? (
          mediaState.media.type === 'youtube' ? (
            <div className={styles.videoWrapper}>
              <iframe
                src={mediaState.media.url}
                title={`${exercise.name} demonstration`}
                className={styles.youtubeEmbed}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <figure className={styles.mediaFigure}>
              <img
                src={mediaState.media.url}
                alt={`${exercise.name} demonstration`}
                className={styles.demoMedia}
              />
              {mediaState.media.caption ? (
                <figcaption className={styles.mediaCaption}>
                  {mediaState.media.caption}
                </figcaption>
              ) : null}
            </figure>
          )
        ) : (
          <div className={styles.fallbackContainer} data-testid="media-fallback">
            <ExerciseIcon name={exercise.name} size={96} />
            <p className={styles.fallbackLabel}>Demo not available yet</p>
          </div>
        )}
      </div>

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
          <div className={styles.modalContent}>
            <label htmlFor="detail-day-select">Choose a day</label>
            <Select
              id="detail-day-select"
              value={selectedDay}
              options={DAYS.map((day) => ({
                value: day,
                label: `${day} (${workoutPlan[day]?.length ?? 0})`,
              }))}
              onChange={(event) => setSelectedDay(event.target.value)}
            />
          </div>
          <Button onClick={handleAdd}>Confirm add</Button>
        </Modal>
      )}
    </section>
  )
}

ExerciseDetail.propTypes = {
  workoutPlan: PropTypes.object,
  onAddToPlan: PropTypes.func,
}

export default ExerciseDetail
