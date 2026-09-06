import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  test('renders Gritline footer brand statement', () => {
    render(<Footer />)
    expect(
      screen.getByText('Gritline — plan workouts, log progress, stay consistent.'),
    ).toBeInTheDocument()
  })
})
