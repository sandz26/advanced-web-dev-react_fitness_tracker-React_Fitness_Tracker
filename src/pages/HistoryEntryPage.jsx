import { useNavigate, useParams } from 'react-router'
import Header from '../components/common/Header'
import Button from '../components/UI/Button'
import Card from '../components/UI/Card'
import { formatDate } from '../utils/helpers'

function HistoryEntryPage({ workoutHistory = [] }) {
  const { entryId } = useParams()
  const navigate = useNavigate()
  const entry = workoutHistory.find((item) => String(item.id) === String(entryId))

  if (!entry) {
    return (
      <section className="page">
        <Header title="Entry not found" subtitle="That log item is no longer available." />
        <Button onClick={() => navigate('/history')}>Back to History</Button>
      </section>
    )
  }

  return (
    <section className="page">
      <Header title={entry.exerciseName} subtitle={formatDate(entry.date)} />
      <Card>
        <p>
          {entry.sets} sets · {entry.reps} reps · {entry.weight} kg
        </p>
        <p>{entry.caloriesBurn} estimated calories</p>
      </Card>
      <Button onClick={() => navigate('/history')}>Back to History</Button>
    </section>
  )
}

export default HistoryEntryPage
