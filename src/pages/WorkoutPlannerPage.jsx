import Header from '../components/common/Header'
import WorkoutPlanner from '../components/WorkoutPlanner/WorkoutPlanner'
import { countPlanExercises } from '../utils/helpers'

function WorkoutPlannerPage({ workoutPlan, onRemoveExercise, onClearDay }) {
  const total = countPlanExercises(workoutPlan)

  return (
    <section className="page">
      <Header
        title="Workout Planner"
        subtitle={`${total} exercise${total === 1 ? '' : 's'} planned this week.`}
      />
      <WorkoutPlanner
        plan={workoutPlan}
        onRemoveExercise={onRemoveExercise}
        onClearDay={onClearDay}
      />
    </section>
  )
}

export default WorkoutPlannerPage
