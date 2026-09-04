import { render, screen } from '@testing-library/react'
import ProgressChart from './ProgressChart'

describe('ProgressChart', () => {
  test('renders totals and fallbacks', () => {
    render(<ProgressChart totals={{ workouts: 2, planned: 4, calories: 80, streak: 1 }} />)
    expect(screen.getByText(/Workouts completed: 2/)).toBeInTheDocument()
    expect(screen.getByText(/Estimated calories burned: 80/)).toBeInTheDocument()
  })

  test('uses zero defaults when totals are missing', () => {
    render(<ProgressChart />)
    expect(screen.getByText(/Workouts completed: 0/)).toBeInTheDocument()
  })
})
