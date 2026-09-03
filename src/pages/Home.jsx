import { Link } from 'react-router'
import Header from '../components/common/Header'
import Card from '../components/UI/Card'
import AudioPlayer from '../components/Media/AudioPlayer'

function Home() {
  return (
    <section className="page">
      <p className="page-kicker">Fitness Tracker</p>
      <Header
        title="Plan workouts. Log progress. Stay consistent."
        subtitle="Browse exercises, build a weekly plan, and track your fitness journey."
      />
      <Card title="Start here">
        <p>Tomorrow we will wire search, filters, planner persistence, and workout history.</p>
        <p>
          <Link to="/exercises">Browse exercises</Link>
          {' · '}
          <Link to="/workout-planner">Open planner</Link>
        </p>
      </Card>
      <AudioPlayer title="Motivational track (placeholder)" />
    </section>
  )
}

export default Home
