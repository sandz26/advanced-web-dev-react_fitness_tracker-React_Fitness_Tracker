import { Route, Routes } from 'react-router'
import Navbar from './components/Navigation/Navbar'
import Footer from './components/common/Footer'
import ExerciseDetail from './components/Exercise/ExerciseDetail'
import ExercisesPage from './pages/ExercisesPage'
import HistoryEntryPage from './pages/HistoryEntryPage'
import HistoryPage from './pages/HistoryPage'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProgressPage from './pages/ProgressPage'
import WorkoutPlannerPage from './pages/WorkoutPlannerPage'
import { EMPTY_PLAN, STORAGE_KEYS } from './data/constants'
import useLocalStorage from './hooks/useLocalStorage'
import './App.css'

function App() {
  const [workoutPlan, setWorkoutPlan] = useLocalStorage(STORAGE_KEYS.plan, EMPTY_PLAN)
  const [workoutHistory, setWorkoutHistory] = useLocalStorage(STORAGE_KEYS.history, [])

  // Shared planner mutations live here so Exercises, Detail, and Planner stay in sync.
  const handleAddToPlan = (day, exercise) => {
    setWorkoutPlan((current) => {
      const dayItems = current[day] ?? []
      if (dayItems.some((item) => item.id === exercise.id)) {
        return current
      }
      return { ...current, [day]: [...dayItems, exercise] }
    })
  }

  const handleRemoveExercise = (day, exerciseId) => {
    setWorkoutPlan((current) => ({
      ...current,
      [day]: (current[day] ?? []).filter((item) => item.id !== exerciseId),
    }))
  }

  const handleClearDay = (day) => {
    setWorkoutPlan((current) => ({ ...current, [day]: [] }))
  }

  const handleLogWorkout = (entry) => {
    setWorkoutHistory((current) => [entry, ...current])
  }

  return (
    <div className="app">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={<Home workoutPlan={workoutPlan} workoutHistory={workoutHistory} />}
          />
          <Route
            path="/exercises"
            element={<ExercisesPage workoutPlan={workoutPlan} onAddToPlan={handleAddToPlan} />}
          />
          <Route
            path="/exercises/:id"
            element={<ExerciseDetail workoutPlan={workoutPlan} onAddToPlan={handleAddToPlan} />}
          />
          <Route
            path="/workout-planner"
            element={(
              <WorkoutPlannerPage
                workoutPlan={workoutPlan}
                onRemoveExercise={handleRemoveExercise}
                onClearDay={handleClearDay}
              />
            )}
          />
          <Route
            path="/history"
            element={<HistoryPage workoutHistory={workoutHistory} onLogWorkout={handleLogWorkout} />}
          />
          <Route
            path="/history/:entryId"
            element={<HistoryEntryPage workoutHistory={workoutHistory} />}
          />
          <Route
            path="/progress"
            element={<ProgressPage workoutPlan={workoutPlan} workoutHistory={workoutHistory} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
