import { render, screen } from '@testing-library/react'
import WorkoutPlanner from './WorkoutPlanner'

describe('WorkoutPlanner', () => {
  test('renders a card for each weekday', () => {
    render(<WorkoutPlanner plan={{}} />)
    expect(screen.getByText('Monday')).toBeInTheDocument()
    expect(screen.getByText('Sunday')).toBeInTheDocument()
  })
})
