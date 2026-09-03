import { useNavigate } from 'react-router'
import Header from '../components/common/Header'
import SearchBar from '../components/UI/SearchBar'
import ExerciseFilter from '../components/Exercise/ExerciseFilter'
import ExerciseList from '../components/Exercise/ExerciseList'
import { exercisesData } from '../data/exercisesData'

function ExercisesPage() {
  const navigate = useNavigate()

  return (
    <section className="page">
      <Header
        title="Exercises"
        subtitle="Search and filter the catalog. Full filtering logic comes next."
      />
      <SearchBar />
      <ExerciseFilter />
      <ExerciseList
        exercises={exercisesData}
        onSelect={(exercise) => navigate(`/exercises/${exercise.id}`)}
      />
    </section>
  )
}

export default ExercisesPage
