import Header from '../components/common/Header'
import WorkoutLog from '../components/WorkoutLog/WorkoutLog'

function HistoryPage({ workoutHistory = [], onLogWorkout }) {
  return (
    <section className="page">
      <Header
        title="Workout History"
        subtitle="Log completed work with date, sets, reps, and weight."
      />
      <WorkoutLog entries={workoutHistory} onSubmit={onLogWorkout} />
    </section>
  )
}

export default HistoryPage
