import { useState } from 'react'
import Button from '../UI/Button'
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

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  // Build a history row from the form so the parent can persist it.
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
        <label>
          Date
          <input type="date" name="date" value={form.date} onChange={handleChange} />
        </label>
        <label>
          Exercise
          <select name="exerciseId" value={form.exerciseId} onChange={handleChange}>
            {exercisesData.map((exercise) => (
              <option key={exercise.id} value={exercise.id}>
                {exercise.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Sets
          <input type="number" name="sets" min="1" value={form.sets} onChange={handleChange} />
        </label>
        <label>
          Reps
          <input type="number" name="reps" min="1" value={form.reps} onChange={handleChange} />
        </label>
        <label>
          Weight (kg)
          <input
            type="number"
            name="weight"
            min="0"
            value={form.weight}
            onChange={handleChange}
            onBlur={() => {
              setWeightError(Number(form.weight) < 0 ? 'Weight must be 0 or more' : '')
            }}
          />
        </label>
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

export default WorkoutLog
