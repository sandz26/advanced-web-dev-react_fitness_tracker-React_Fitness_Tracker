import { useNavigate, useParams } from 'react-router'
import Header from '../common/Header'
import Button from '../UI/Button'
import VideoPlayer from '../Media/VideoPlayer'
import { exercisesData } from '../../data/exercisesData'

function ExerciseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const exercise = exercisesData.find((item) => item.id === Number(id))

  if (!exercise) {
    return (
      <section className="page">
        <Header title="Exercise not found" subtitle="This exercise is not in the catalog yet." />
        <Button onClick={() => navigate('/exercises')}>Back to Exercises</Button>
      </section>
    )
  }

  return (
    <section className="page">
      <Header title={exercise.name} subtitle={`${exercise.category} · ${exercise.difficulty}`} />
      <VideoPlayer src={exercise.videoUrl} title={`${exercise.name} demonstration`} />
      <Button onClick={() => navigate('/exercises')}>Back to Exercises</Button>
    </section>
  )
}

export default ExerciseDetail
