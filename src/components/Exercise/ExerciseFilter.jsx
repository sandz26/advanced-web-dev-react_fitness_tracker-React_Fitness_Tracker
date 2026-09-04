import { CATEGORIES, DIFFICULTIES, MUSCLE_GROUPS } from '../../data/constants'
import { titleCase } from '../../utils/helpers'
import styles from './Exercise.module.css'

const ExerciseFilter = ({
  category = 'all',
  muscleGroup = 'all',
  difficulty = 'all',
  sortBy = 'name',
  onCategoryChange,
  onMuscleGroupChange,
  onDifficultyChange,
  onSortChange,
  onClear,
}) => (
  <form className={styles.filters} onSubmit={(event) => event.preventDefault()}>
    <label>
      Category
      <select value={category} onChange={(event) => onCategoryChange?.(event.target.value)}>
        <option value="all">All</option>
        {CATEGORIES.map((item) => (
          <option key={item} value={item}>
            {titleCase(item)}
          </option>
        ))}
      </select>
    </label>
    <label>
      Muscle group
      <select value={muscleGroup} onChange={(event) => onMuscleGroupChange?.(event.target.value)}>
        <option value="all">All</option>
        {MUSCLE_GROUPS.map((item) => (
          <option key={item} value={item}>
            {titleCase(item)}
          </option>
        ))}
      </select>
    </label>
    <label>
      Difficulty
      <select value={difficulty} onChange={(event) => onDifficultyChange?.(event.target.value)}>
        <option value="all">All</option>
        {DIFFICULTIES.map((item) => (
          <option key={item} value={item}>
            {titleCase(item)}
          </option>
        ))}
      </select>
    </label>
    <label>
      Sort
      <select value={sortBy} onChange={(event) => onSortChange?.(event.target.value)}>
        <option value="name">Name</option>
        <option value="difficulty">Difficulty</option>
        <option value="calories">Calories</option>
      </select>
    </label>
    <button type="button" onClick={onClear}>
      Clear filters
    </button>
  </form>
)

export default ExerciseFilter
