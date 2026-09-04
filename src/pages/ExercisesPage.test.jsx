import { screen, waitFor } from '@testing-library/react'
import ExercisesPage from './ExercisesPage'
import { renderWithRouter } from '../test-utils'

describe('ExercisesPage Async', () => {
  test('loads and displays exercises', async () => {
    renderWithRouter(<ExercisesPage />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByText('Push-ups')).toBeInTheDocument()
    })
  })
})
