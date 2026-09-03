import Header from '../components/common/Header'
import WorkoutPlanner from '../components/WorkoutPlanner/WorkoutPlanner'

function WorkoutPlannerPage() {
  return (
    <section className="page">
      <Header
        title="Workout Planner"
        subtitle="Add exercises to Monday through Sunday. Plan persistence comes next."
      />
      <WorkoutPlanner />
    </section>
  )
}

export default WorkoutPlannerPage
