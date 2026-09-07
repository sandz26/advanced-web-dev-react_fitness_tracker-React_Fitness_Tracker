import PropTypes from 'prop-types'
import { useMemo } from 'react'
import AchievementCard from '../components/common/AchievementCard'
import Header from '../components/common/Header'
import ProgressChart from '../components/WorkoutLog/ProgressChart'
import {
  calculateCalories,
  calculateStreak,
  countPlanExercises,
} from '../utils/helpers'

function ProgressPage({ workoutPlan = {}, workoutHistory = [] }) {
  const totals = useMemo(
    () => ({
      workouts: workoutHistory.length,
      planned: countPlanExercises(workoutPlan),
      calories: calculateCalories(workoutHistory),
      streak: calculateStreak(workoutHistory),
    }),
    [workoutPlan, workoutHistory],
  )

  const latest = workoutHistory[0]

  return (
    <section className="page">
      <Header
        title="Progress"
        subtitle="Totals update as you plan sessions and log completed work."
      />
      {workoutHistory.length > 0 ? (
        <>
          <AchievementCard
            title="Current achievement"
            badgeText="Achievement"
            description={
              latest
                ? `Logged ${latest.exerciseName} with ${latest.sets} sets × ${latest.reps} reps (${latest.weight} kg)`
                : 'Keep logging workouts to unlock records'
            }
            streakDays={totals.streak || 1}
          />
          <ProgressChart totals={totals} />
        </>
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

ProgressPage.propTypes = {
  workoutPlan: PropTypes.object,
  workoutHistory: PropTypes.array,
}

export default ProgressPage
