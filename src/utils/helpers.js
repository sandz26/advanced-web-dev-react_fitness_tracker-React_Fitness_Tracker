export function formatDate(value) {
  return new Date(value).toLocaleDateString()
}

export function filterExercises(exercises, { query = '', category = 'all', muscleGroup = 'all', difficulty = 'all' } = {}) {
  const needle = query.trim().toLowerCase()

  return exercises.filter((exercise) => {
    const matchesQuery = needle === '' || exercise.name.toLowerCase().includes(needle)
    const matchesCategory = category === 'all' || exercise.category === category
    const matchesDifficulty = difficulty === 'all' || exercise.difficulty === difficulty
    const matchesMuscle =
      muscleGroup === 'all' || exercise.muscleGroups?.includes(muscleGroup)

    return matchesQuery && matchesCategory && matchesDifficulty && matchesMuscle
  })
}

export function calculateCalories(entries = []) {
  return entries.reduce((total, entry) => total + (entry.caloriesBurn ?? 0), 0)
}
