import { DIFFICULTY_ORDER } from '../data/constants'
import { exercisesData } from '../data/exercisesData'

export const formatDate = (value) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return 'Invalid date'
  }
  return date.toLocaleDateString()
}

export const formatDuration = (minutes) => `${minutes} min`

export const titleCase = (value = '') =>
  value.charAt(0).toUpperCase() + value.slice(1)

export const filterExercises = (
  exercises,
  { query = '', category = 'all', muscleGroup = 'all', difficulty = 'all' } = {},
) => {
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

export const sortExercises = (exercises, sortBy = 'name') => {
  const copy = [...exercises]

  if (sortBy === 'calories') {
    return copy.sort((left, right) => right.caloriesBurn - left.caloriesBurn)
  }

  if (sortBy === 'difficulty') {
    return copy.sort(
      (left, right) => DIFFICULTY_ORDER[left.difficulty] - DIFFICULTY_ORDER[right.difficulty],
    )
  }

  return copy.sort((left, right) => left.name.localeCompare(right.name))
}

export const calculateCalories = (entries = []) =>
  entries.reduce((total, entry) => total + (entry.caloriesBurn ?? 0), 0)

export const countPlanExercises = (plan = {}) =>
  Object.values(plan).reduce((total, day) => total + (day?.length ?? 0), 0)

export const planContains = (plan = {}, exerciseId) =>
  Object.values(plan).some((day) => day.some((item) => item.id === exerciseId))

export const toDateKey = (value) => {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) {
    return ''
  }
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value
  }
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const calculateStreak = (history = [], today = new Date()) => {
  const uniqueDays = new Set(
    history.map((entry) => toDateKey(entry.date)).filter(Boolean),
  )

  if (uniqueDays.size === 0) {
    return 0
  }

  const start = new Date(today)
  start.setHours(0, 0, 0, 0)
  const todayKey = toDateKey(start)
  const yesterday = new Date(start)
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayKey = toDateKey(yesterday)

  if (!uniqueDays.has(todayKey) && !uniqueDays.has(yesterdayKey)) {
    return 0
  }

  const cursor = new Date(uniqueDays.has(todayKey) ? start : yesterday)
  let streak = 0

  while (uniqueDays.has(toDateKey(cursor))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }

  return streak
}

export const loadCatalog = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(exercisesData), 40)
  })
