import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import DayCard from './DayCard'

describe('DayCard', () => {
  test('shows an empty state when no exercises are planned', () => {
    render(<DayCard day="Monday" exercises={[]} />)
    expect(screen.getByText('No exercises planned')).toBeInTheDocument()
  })

  test('calls onRemoveExercise for a listed move', () => {
    const onRemoveExercise = vi.fn()
    render(
      <DayCard
        day="Monday"
        exercises={[{ id: 1, name: 'Push-ups' }]}
        onRemoveExercise={onRemoveExercise}
      />,
    )
    fireEvent.click(screen.getByText('Remove'))
    expect(onRemoveExercise).toHaveBeenCalledWith('Monday', 1)
  })
})
