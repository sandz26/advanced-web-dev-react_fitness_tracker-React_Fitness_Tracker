import { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../UI/Button'
import Select from '../UI/Select'
import LogEntry from './LogEntry'
import { exercisesData } from '../../data/exercisesData'
import styles from './WorkoutLog.module.css'

function WorkoutLog({ entries = [], onSubmit }) {
  const today = new Date().toISOString().slice(0, 10)
  const [form, setForm] = useState({
    exerciseId: String(exercisesData[0]?.id ?? ''),
    date: today,
    sets: 3,
    reps: 10,
    weight: 0,
  })
  const [weightError, setWeightError] = useState('')

  const exerciseOptions = useMemo(
    () =>
      exercisesData.map((exercise) => ({
        value: String(exercise.id),
        label: exercise.name,
      })),
    [],
  )

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const weight = Number(form.weight)
    if (Number.isNaN(weight) || weight < 0) {
      setWeightError('Weight must be 0 or more')
      return
    }

    const exercise = exercisesData.find((item) => item.id === Number(form.exerciseId))
    onSubmit?.({
      id: `${Date.now()}`,
      date: form.date,
      exerciseId: Number(form.exerciseId),
      exerciseName: exercise?.name ?? 'Workout',
      sets: Number(form.sets),
      reps: Number(form.reps),
      weight,
      caloriesBurn: exercise?.caloriesBurn ?? 0,
    })
  }

  return (
    <section className={styles.log}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="log-date">Date</label>
          <input id="log-date" type="date" name="date" value={form.date} onChange={handleChange} />
        </div>
        <div className={styles.field}>
          <label htmlFor="log-exercise">Exercise</label>
          <Select
            id="log-exercise"
            name="exerciseId"
            value={form.exerciseId}
            options={exerciseOptions}
            onChange={handleChange}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="log-sets">Sets</label>
          <input id="log-sets" type="number" name="sets" min="1" value={form.sets} onChange={handleChange} />
        </div>
        <div className={styles.field}>
          <label htmlFor="log-reps">Reps</label>
          <input id="log-reps" type="number" name="reps" min="1" value={form.reps} onChange={handleChange} />
        </div>
        <div className={styles.field}>
          <label htmlFor="log-weight">Weight (kg)</label>
          <input
            id="log-weight"
            type="number"
            name="weight"
            min="0"
            value={form.weight}
            onChange={handleChange}
            onBlur={() => {
              setWeightError(Number(form.weight) < 0 ? 'Weight must be 0 or more' : '')
            }}
          />
        </div>
        {weightError && <p className={styles.error}>{weightError}</p>}
        <Button type="submit">Log Workout</Button>
      </form>
      {entries.length > 0 ? (
        entries.map((entry) => <LogEntry key={entry.id} entry={entry} />)
      ) : (
        <p>No workouts logged yet. Start tracking your progress!</p>
      )}
    </section>
  )
}

WorkoutLog.propTypes = {
  entries: PropTypes.array,
  onSubmit: PropTypes.func,
}

export default WorkoutLog
