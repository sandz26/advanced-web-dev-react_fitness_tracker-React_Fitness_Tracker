import { fireEvent, screen } from '@testing-library/react'
import App from '../../App'
import { renderWithRouter, resetStorage } from '../../test-utils'

describe('Navigation', () => {
  beforeEach(() => {
    resetStorage()
  })

  test('clicks through Home, Exercises, Planner, History, and Progress', async () => {
    renderWithRouter(<App />)

    fireEvent.click(screen.getByRole('link', { name: 'Exercises' }))
    expect(await screen.findByRole('heading', { name: 'Exercises' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('link', { name: 'Workout Planner' }))
    expect(screen.getByRole('heading', { name: 'Workout Planner' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('link', { name: 'History' }))
    expect(screen.getByRole('heading', { name: 'Workout History' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('link', { name: 'Progress' }))
    expect(screen.getByRole('heading', { name: 'Progress' })).toBeInTheDocument()
  })
})
