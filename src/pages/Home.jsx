import PropTypes from 'prop-types'
import { Link } from 'react-router'
import AchievementCard from '../components/common/AchievementCard'
import Header from '../components/common/Header'
import ExerciseIcon from '../components/Exercise/ExerciseIcon'
import AudioPlayer from '../components/Media/AudioPlayer'
import Card from '../components/UI/Card'
import { exercisesData } from '../data/exercisesData'
import { calculateStreak, countPlanExercises } from '../utils/helpers'

function Home({ workoutPlan = {}, workoutHistory = [] }) {
  // Strength picks are transformed before they reach the featured cards.
  const featured = exercisesData.filter((exercise) => exercise.category === 'strength').slice(0, 3)
  const plannedCount = countPlanExercises(workoutPlan)
  const streak = calculateStreak(workoutHistory)
  const latestWorkout = workoutHistory[0]

  return (
    <section className="page">
      <p className="page-kicker">Fitness Tracker</p>
      <Header
        title="Plan workouts. Log progress. Stay consistent."
        subtitle="Browse exercises, build a weekly plan, and track your fitness journey."
      />
      <div className="overview-grid">
        <Card title="Your snapshot">
          <p>
            {workoutHistory.length} workout{workoutHistory.length === 1 ? '' : 's'} completed
          </p>
          <p>
            {plannedCount} exercise{plannedCount === 1 ? '' : 's'} in this week's plan
          </p>
          <p>
            <Link to="/exercises">Browse exercises</Link>
            {' · '}
            <Link to="/workout-planner">Open planner</Link>
          </p>
        </Card>
        <AchievementCard
          title={latestWorkout ? 'Latest achievement' : 'New record'}
          badgeText="Achievement"
          description={
            latestWorkout
              ? `Best set of ${latestWorkout.exerciseName.toLowerCase()} logged this session`
              : 'Best set of push-ups this month'
          }
          streakDays={streak || 5}
        />
      </div>
      <h2>Featured strength exercises</h2>
      <div className="feature-grid">
        {featured.map((exercise) => (
          <Card key={exercise.id} title={exercise.name}>
            <ExerciseIcon name={exercise.name} size={48} />
            <p>{exercise.caloriesBurn} cal · {exercise.difficulty}</p>
            <Link to={`/exercises/${exercise.id}`}>View {exercise.name}</Link>
          </Card>
        ))}
      </div>
      <AudioPlayer
        title="Motivational warmup"
        description="A short tone to start the session. Replace with a full track later if you like."
      />
    </section>
  )
}

Home.propTypes = {
  workoutPlan: PropTypes.object,
  workoutHistory: PropTypes.array,
}

export default Home
