import styles from './Exercise.module.css'

function ExerciseFilter({
  category = 'all',
  muscleGroup = 'all',
  difficulty = 'all',
  onCategoryChange,
  onMuscleGroupChange,
  onDifficultyChange,
  onClear,
}) {
  return (
    <form className={styles.filters} onSubmit={(event) => event.preventDefault()}>
      <label>
        Category
        <select value={category} onChange={onCategoryChange}>
          <option value="all">All</option>
          <option value="strength">Strength</option>
          <option value="cardio">Cardio</option>
          <option value="flexibility">Flexibility</option>
          <option value="balance">Balance</option>
        </select>
      </label>
      <label>
        Muscle group
        <select value={muscleGroup} onChange={onMuscleGroupChange}>
          <option value="all">All</option>
          <option value="chest">Chest</option>
          <option value="back">Back</option>
          <option value="shoulders">Shoulders</option>
          <option value="arms">Arms</option>
          <option value="core">Core</option>
          <option value="legs">Legs</option>
        </select>
      </label>
      <label>
        Difficulty
        <select value={difficulty} onChange={onDifficultyChange}>
          <option value="all">All</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </label>
      <button type="button" onClick={onClear}>
        Clear filters
      </button>
    </form>
  )
}

export default ExerciseFilter
