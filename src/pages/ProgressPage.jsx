import Header from '../components/common/Header'
import ProgressChart from '../components/WorkoutLog/ProgressChart'

function ProgressPage() {
  return (
    <section className="page">
      <Header
        title="Progress"
        subtitle="Totals, calories, and streak will be calculated from localStorage history."
      />
      <ProgressChart totals={{ workouts: 0, calories: 0 }} />
    </section>
  )
}

export default ProgressPage
