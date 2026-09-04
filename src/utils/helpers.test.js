import {
  calculateCalories,
  calculateStreak,
  countPlanExercises,
  filterExercises,
  formatDate,
  formatDuration,
  planContains,
  sortExercises,
} from './helpers'

const catalog = [
  { id: 1, name: 'Push-ups', category: 'strength', difficulty: 'beginner', muscleGroups: ['chest'] },
  { id: 2, name: 'Burpees', category: 'cardio', difficulty: 'intermediate', muscleGroups: ['legs'] },
]

describe('helpers', () => {
  test('filters exercises by name and category', () => {
    const result = filterExercises(catalog, { query: 'push', category: 'strength' })
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Push-ups')
  })

  test('formats a valid date and totals calories', () => {
    expect(formatDate('2026-09-04')).not.toBe('Invalid date')
    expect(calculateCalories([{ caloriesBurn: 50 }, { caloriesBurn: 20 }])).toBe(70)
  })

  test('counts a two-day streak ending today', () => {
    const today = new Date(2026, 8, 4)
    const history = [{ date: '2026-09-04' }, { date: '2026-09-03' }]
    expect(calculateStreak(history, today)).toBe(2)
  })

  test('sorts, counts plan items, and checks membership', () => {
    const list = [
      { id: 1, name: 'Zed', difficulty: 'advanced', caloriesBurn: 10 },
      { id: 2, name: 'Ace', difficulty: 'beginner', caloriesBurn: 90 },
    ]
    expect(sortExercises(list, 'name')[0].name).toBe('Ace')
    expect(sortExercises(list, 'calories')[0].name).toBe('Ace')
    expect(sortExercises(list, 'difficulty')[0].name).toBe('Ace')
    expect(formatDuration(10)).toBe('10 min')
    expect(countPlanExercises({ Monday: [{ id: 1 }], Tuesday: [] })).toBe(1)
    expect(planContains({ Monday: [{ id: 2 }] }, 2)).toBe(true)
    expect(calculateStreak([], new Date(2026, 8, 4))).toBe(0)
  })
})
