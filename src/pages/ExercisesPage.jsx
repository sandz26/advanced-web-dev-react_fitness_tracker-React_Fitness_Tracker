import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import Header from '../components/common/Header'
import ExerciseFilter from '../components/Exercise/ExerciseFilter'
import ExerciseList from '../components/Exercise/ExerciseList'
import Button from '../components/UI/Button'
import Modal from '../components/UI/Modal'
import SearchBar from '../components/UI/SearchBar'
import { DAYS } from '../data/constants'
import { filterExercises, loadCatalog, sortExercises } from '../utils/helpers'

function ExercisesPage({ workoutPlan = {}, onAddToPlan }) {
  const navigate = useNavigate()
  const [exercises, setExercises] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [muscleGroup, setMuscleGroup] = useState('all')
  const [difficulty, setDifficulty] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [pendingExercise, setPendingExercise] = useState(null)
  const [selectedDay, setSelectedDay] = useState('Monday')

  // Simulated catalog fetch keeps loading / empty / error states testable.
  useEffect(() => {
    let active = true
    loadCatalog()
      .then((data) => {
        if (active) {
          setExercises(data)
          setError('')
        }
      })
      .catch(() => {
        if (active) {
          setError('Failed to load')
        }
      })
      .finally(() => {
        if (active) {
          setIsLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [])

  // Filter in the page, then pass the already-narrowed list to ExerciseList.
  const visibleExercises = useMemo(
    () =>
      sortExercises(
        filterExercises(exercises, { query, category, muscleGroup, difficulty }),
        sortBy,
      ),
    [exercises, query, category, muscleGroup, difficulty, sortBy],
  )

  const clearFilters = () => {
    setQuery('')
    setCategory('all')
    setMuscleGroup('all')
    setDifficulty('all')
    setSortBy('name')
  }

  return (
    <section className="page">
      <Header
        title="Exercises"
        subtitle="Search, filter, and sort the catalog, then add moves to a training day."
      />
      <SearchBar value={query} onChange={setQuery} onSubmit={setQuery} />
      <ExerciseFilter
        category={category}
        muscleGroup={muscleGroup}
        difficulty={difficulty}
        sortBy={sortBy}
        onCategoryChange={setCategory}
        onMuscleGroupChange={setMuscleGroup}
        onDifficultyChange={setDifficulty}
        onSortChange={setSortBy}
        onClear={clearFilters}
      />
      <ExerciseList
        exercises={visibleExercises}
        isLoading={isLoading}
        error={error}
        workoutPlan={workoutPlan}
        onSelect={(exercise) => navigate(`/exercises/${exercise.id}`)}
        onAdd={setPendingExercise}
      />
      {pendingExercise && (
        <Modal
          title={`Add ${pendingExercise.name}`}
          isOpen
          onClose={() => setPendingExercise(null)}
        >
          <label>
            Choose a day
            <select value={selectedDay} onChange={(event) => setSelectedDay(event.target.value)}>
              {DAYS.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </label>
          <Button
            onClick={() => {
              onAddToPlan?.(selectedDay, pendingExercise)
              setPendingExercise(null)
            }}
          >
            Confirm add
          </Button>
        </Modal>
      )}
    </section>
  )
}

export default ExercisesPage
