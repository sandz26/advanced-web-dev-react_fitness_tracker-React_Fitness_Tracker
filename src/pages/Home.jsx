import { Link } from 'react-router'
import Header from '../components/common/Header'
import AudioPlayer from '../components/Media/AudioPlayer'
import Card from '../components/UI/Card'
import { exercisesData } from '../data/exercisesData'
import { countPlanExercises } from '../utils/helpers'

function Home({ workoutPlan = {}, workoutHistory = [] }) {
  // Strength picks are transformed before they reach the featured cards.
  const featured = exercisesData.filter((exercise) => exercise.category === 'strength').slice(0, 3)
  const plannedCount = countPlanExercises(workoutPlan)

  return (
    <section className="page">
      <p className="page-kicker">Fitness Tracker</p>
      <Header
        title="Plan workouts. Log progress. Stay consistent."
        subtitle="Browse exercises, build a weekly plan, and track your fitness journey."
      />
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
      <div className="feature-grid">
        {featured.map((exercise) => (
          <Card key={exercise.id} title={exercise.name}>
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

export default Home
