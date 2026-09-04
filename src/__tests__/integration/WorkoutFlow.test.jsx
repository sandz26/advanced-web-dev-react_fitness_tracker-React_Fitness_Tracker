import { fireEvent, screen, waitFor, within } from '@testing-library/react'
import App from '../../App'
import { renderWithRouter, resetStorage } from '../../test-utils'

describe('Workout flow', () => {
  beforeEach(() => {
    resetStorage()
  })

  test('adds an exercise to a day and shows it after logging', async () => {
    renderWithRouter(<App />, { route: '/exercises' })

    await waitFor(() => {
      expect(screen.getAllByText('Push-ups').length).toBeGreaterThan(0)
    })

    const pushUpsCard = screen.getByRole('heading', { name: 'Push-ups' }).closest('article')
    fireEvent.click(within(pushUpsCard).getByText('Add to Workout Plan'))
    fireEvent.click(screen.getByText('Confirm add'))

    fireEvent.click(screen.getByRole('link', { name: 'Workout Planner' }))
    expect(screen.getAllByText('Push-ups').length).toBeGreaterThan(0)

    fireEvent.click(screen.getByRole('link', { name: 'History' }))
    fireEvent.submit(screen.getByText('Log Workout'))
    expect(screen.getByText('View entry')).toBeInTheDocument()
  })
})
