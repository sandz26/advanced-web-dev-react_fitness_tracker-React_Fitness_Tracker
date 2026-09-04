import { useMemo } from 'react'
import Header from '../components/common/Header'
import ProgressChart from '../components/WorkoutLog/ProgressChart'
import {
  calculateCalories,
  calculateStreak,
  countPlanExercises,
} from '../utils/helpers'

function ProgressPage({ workoutPlan = {}, workoutHistory = [] }) {
  // Derive chart values here so Home/History siblings do not recompute independently.
  const totals = useMemo(
    () => ({
      workouts: workoutHistory.length,
      planned: countPlanExercises(workoutPlan),
      calories: calculateCalories(workoutHistory),
      streak: calculateStreak(workoutHistory),
    }),
    [workoutPlan, workoutHistory],
  )

  return (
    <section className="page">
      <Header
        title="Progress"
        subtitle="Totals update as you plan sessions and log completed work."
      />
      {workoutHistory.length > 0 ? (
        <ProgressChart totals={totals} />
      ) : (
        <p>No workouts logged yet. Start tracking your progress!</p>
      )}
      {totals.planned > 0 && (
        <p>
          Keep the streak going by logging the {totals.planned} planned{' '}
          {totals.planned === 1 ? 'move' : 'moves'}.
        </p>
      )}
    </section>
  )
}

export default ProgressPage
