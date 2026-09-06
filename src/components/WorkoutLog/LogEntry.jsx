import PropTypes from 'prop-types'
import { Link } from 'react-router'
import Card from '../UI/Card'
import { formatDate } from '../../utils/helpers'

const LogEntry = ({ entry }) => {
  // Skip broken rows so a partial localStorage payload cannot crash the list.
  if (!entry) {
    return null
  }

  return (
    <Card title={entry.exerciseName ?? 'Workout'}>
      <p>{formatDate(entry.date)}</p>
      <p>
        {entry.sets} sets · {entry.reps} reps · {entry.weight} kg
      </p>
      <Link to={`/history/${entry.id}`}>View entry</Link>
    </Card>
  )
}

LogEntry.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    exerciseName: PropTypes.string,
    date: PropTypes.string,
    sets: PropTypes.number,
    reps: PropTypes.number,
    weight: PropTypes.number,
  }),
}

export default LogEntry
