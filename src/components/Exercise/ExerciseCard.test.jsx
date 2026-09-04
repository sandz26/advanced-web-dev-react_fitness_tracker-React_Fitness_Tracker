import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import ExerciseCard from './ExerciseCard'

const exercise = {
  id: 1,
  name: 'Push-ups',
  category: 'strength',
  difficulty: 'beginner',
  duration: 10,
  sets: 3,
  reps: 15,
  image: '/assets/images/push-ups.svg',
  caloriesBurn: 50,
}

describe('ExerciseCard', () => {
  test('renders exercise name and category', () => {
    render(<ExerciseCard exercise={exercise} />)
    expect(screen.getByText('Push-ups')).toBeInTheDocument()
    expect(screen.getByText('Strength')).toBeInTheDocument()
  })

  test('calls onSelect when view details is clicked', () => {
    const onSelect = vi.fn()
    render(<ExerciseCard exercise={exercise} onSelect={onSelect} />)
    fireEvent.click(screen.getByText('View details'))
    expect(onSelect).toHaveBeenCalledWith(exercise)
  })
})
