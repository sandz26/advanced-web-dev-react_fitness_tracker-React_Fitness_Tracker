import { fireEvent, screen } from '@testing-library/react'
import { Route, Routes } from 'react-router'
import ExerciseDetail from './ExerciseDetail'
import { renderWithRouter } from '../../test-utils'

describe('ExerciseDetail', () => {
  test('shows a fallback when the exercise id is unknown', () => {
    renderWithRouter(
      <Routes>
        <Route path="/exercises/:id" element={<ExerciseDetail />} />
      </Routes>,
      { route: '/exercises/999' },
    )
    expect(screen.getByText('Exercise not found')).toBeInTheDocument()
  })

  test('renders a known exercise from the route param', () => {
    renderWithRouter(
      <Routes>
        <Route path="/exercises/:id" element={<ExerciseDetail />} />
        <Route path="/exercises" element={<p>Catalog</p>} />
      </Routes>,
      { route: '/exercises/1' },
    )
    expect(screen.getByRole('heading', { name: 'Push-ups' })).toBeInTheDocument()
    fireEvent.click(screen.getByText('Next Exercise'))
  })
})
