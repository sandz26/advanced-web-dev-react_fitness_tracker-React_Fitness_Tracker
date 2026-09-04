import { screen } from '@testing-library/react'
import Home from './Home'
import { renderWithRouter } from '../test-utils'

describe('Home', () => {
  test('renders the landing heading', () => {
    renderWithRouter(<Home workoutPlan={{}} workoutHistory={[]} />)
    expect(screen.getByText(/Plan workouts/i)).toBeInTheDocument()
  })
})
