import Card from '../UI/Card'

function LogEntry({ entry }) {
  if (!entry) {
    return null
  }

  return (
    <Card title={entry.exerciseName ?? 'Workout'}>
      <p>
        {entry.sets} sets · {entry.reps} reps · {entry.weight} kg
      </p>
    </Card>
  )
}

export default LogEntry
