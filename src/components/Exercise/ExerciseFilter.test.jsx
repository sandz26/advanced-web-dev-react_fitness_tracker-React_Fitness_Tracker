import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import ExerciseFilter from './ExerciseFilter'

describe('ExerciseFilter', () => {
  test('forwards select and clear events', () => {
    const onCategoryChange = vi.fn()
    const onMuscleGroupChange = vi.fn()
    const onDifficultyChange = vi.fn()
    const onSortChange = vi.fn()
    const onClear = vi.fn()

    render(
      <ExerciseFilter
        onCategoryChange={onCategoryChange}
        onMuscleGroupChange={onMuscleGroupChange}
        onDifficultyChange={onDifficultyChange}
        onSortChange={onSortChange}
        onClear={onClear}
      />,
    )

    fireEvent.change(screen.getByLabelText('Category'), { target: { value: 'cardio' } })
    fireEvent.change(screen.getByLabelText('Muscle group'), { target: { value: 'legs' } })
    fireEvent.change(screen.getByLabelText('Difficulty'), { target: { value: 'advanced' } })
    fireEvent.change(screen.getByLabelText('Sort'), { target: { value: 'calories' } })
    fireEvent.click(screen.getByText('Clear filters'))

    expect(onCategoryChange).toHaveBeenCalledWith('cardio')
    expect(onMuscleGroupChange).toHaveBeenCalledWith('legs')
    expect(onDifficultyChange).toHaveBeenCalledWith('advanced')
    expect(onSortChange).toHaveBeenCalledWith('calories')
    expect(onClear).toHaveBeenCalled()
  })
})
