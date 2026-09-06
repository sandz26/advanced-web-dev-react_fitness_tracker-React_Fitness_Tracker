import { screen } from '@testing-library/react'
import App from './App'
import { renderWithRouter, resetStorage } from './test-utils'

describe('App routes', () => {
  beforeEach(() => {
    resetStorage()
  })

  test('renders the navbar and home route', () => {
    renderWithRouter(<App />)
    expect(screen.getByRole('heading', { name: /Plan workouts/i })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument()
  })

  test('shows the home heading on the root route', () => {
    renderWithRouter(<App />)
    expect(screen.getByRole('heading', { name: /Stay consistent/i })).toBeInTheDocument()
  })

  test('renders the 404 page for unknown paths', () => {
    renderWithRouter(<App />, { route: '/missing-page' })
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument()
  })
})
