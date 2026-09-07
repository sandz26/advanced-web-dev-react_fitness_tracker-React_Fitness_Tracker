import { useMemo } from 'react'
import PropTypes from 'prop-types'
import Select from '../UI/Select'
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
}) => {
  const categoryOptions = useMemo(
    () => [
      { value: 'all', label: 'All' },
      ...CATEGORIES.map((item) => ({ value: item, label: titleCase(item) })),
    ],
    [],
  )

  const muscleGroupOptions = useMemo(
    () => [
      { value: 'all', label: 'All' },
      ...MUSCLE_GROUPS.map((item) => ({ value: item, label: titleCase(item) })),
    ],
    [],
  )

  const difficultyOptions = useMemo(
    () => [
      { value: 'all', label: 'All' },
      ...DIFFICULTIES.map((item) => ({ value: item, label: titleCase(item) })),
    ],
    [],
  )

  const sortOptions = useMemo(
    () => [
      { value: 'name', label: 'Name' },
      { value: 'difficulty', label: 'Difficulty' },
      { value: 'calories', label: 'Calories' },
    ],
    [],
  )

  return (
    <form className={styles.filters} onSubmit={(event) => event.preventDefault()}>
      <div className={styles.filterField}>
        <label htmlFor="filter-category">Category</label>
        <Select
          id="filter-category"
          value={category}
          options={categoryOptions}
          onChange={(event) => onCategoryChange?.(event.target.value)}
        />
      </div>
      <div className={styles.filterField}>
        <label htmlFor="filter-muscle-group">Muscle group</label>
        <Select
          id="filter-muscle-group"
          value={muscleGroup}
          options={muscleGroupOptions}
          onChange={(event) => onMuscleGroupChange?.(event.target.value)}
        />
      </div>
      <div className={styles.filterField}>
        <label htmlFor="filter-difficulty">Difficulty</label>
        <Select
          id="filter-difficulty"
          value={difficulty}
          options={difficultyOptions}
          onChange={(event) => onDifficultyChange?.(event.target.value)}
        />
      </div>
      <div className={styles.filterField}>
        <label htmlFor="filter-sort">Sort</label>
        <Select
          id="filter-sort"
          value={sortBy}
          options={sortOptions}
          onChange={(event) => onSortChange?.(event.target.value)}
        />
      </div>
      <button type="button" className={styles.clearButton} onClick={onClear}>
        Clear filters
      </button>
    </form>
  )
}

ExerciseFilter.propTypes = {
  category: PropTypes.string,
  muscleGroup: PropTypes.string,
  difficulty: PropTypes.string,
  sortBy: PropTypes.string,
  onCategoryChange: PropTypes.func,
  onMuscleGroupChange: PropTypes.func,
  onDifficultyChange: PropTypes.func,
  onSortChange: PropTypes.func,
  onClear: PropTypes.func,
}

export default ExerciseFilter
