import { fireEvent, screen } from '@testing-library/react'
import Navbar from './Navbar'
import { renderWithRouter } from '../../test-utils'

describe('Navbar', () => {
  test('renders links to all app routes', () => {
    renderWithRouter(<Navbar />)
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Exercises' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Workout Planner' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'History' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Progress' })).toBeInTheDocument()
  })

  test('toggles the mobile menu and closes on Escape', () => {
    renderWithRouter(<Navbar />)
    const toggle = screen.getByLabelText('Toggle navigation')
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    fireEvent.keyDown(toggle, { key: 'Escape' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })
})
