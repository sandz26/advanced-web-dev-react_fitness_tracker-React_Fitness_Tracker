import { render, screen } from '@testing-library/react'
import ExerciseList from './ExerciseList'

describe('ExerciseList Conditional Rendering', () => {
  test('shows loading state', () => {
    render(<ExerciseList exercises={[]} isLoading={true} />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  test('shows empty state when no exercises', () => {
    render(<ExerciseList exercises={[]} isLoading={false} />)
    expect(screen.getByText('No exercises found')).toBeInTheDocument()
  })

  test('shows error state on error', () => {
    render(<ExerciseList exercises={[]} error="Failed to load" />)
    expect(screen.getByText('Failed to load')).toBeInTheDocument()
  })
})
