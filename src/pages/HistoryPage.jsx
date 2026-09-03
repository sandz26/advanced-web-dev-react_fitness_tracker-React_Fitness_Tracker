import Header from '../components/common/Header'
import WorkoutLog from '../components/WorkoutLog/WorkoutLog'

function HistoryPage() {
  return (
    <section className="page">
      <Header
        title="Workout History"
        subtitle="Completed workouts will appear here after logging is implemented."
      />
      <WorkoutLog />
    </section>
  )
}

export default HistoryPage
