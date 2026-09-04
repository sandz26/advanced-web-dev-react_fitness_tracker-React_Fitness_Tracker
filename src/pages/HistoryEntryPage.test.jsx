import { fireEvent, screen } from '@testing-library/react'
import { Route, Routes } from 'react-router'
import HistoryEntryPage from './HistoryEntryPage'
import { renderWithRouter } from '../test-utils'

const history = [
  {
    id: 'abc',
    exerciseName: 'Push-ups',
    date: '2026-09-04',
    sets: 3,
    reps: 10,
    weight: 0,
    caloriesBurn: 50,
  },
]

describe('HistoryEntryPage', () => {
  test('shows a fallback when the entry is missing', () => {
    renderWithRouter(
      <Routes>
        <Route path="/history/:entryId" element={<HistoryEntryPage workoutHistory={history} />} />
      </Routes>,
      { route: '/history/missing' },
    )
    expect(screen.getByText('Entry not found')).toBeInTheDocument()
  })

  test('renders a matching log entry', () => {
    renderWithRouter(
      <Routes>
        <Route path="/history/:entryId" element={<HistoryEntryPage workoutHistory={history} />} />
      </Routes>,
      { route: '/history/abc' },
    )
    expect(screen.getByRole('heading', { name: 'Push-ups' })).toBeInTheDocument()
    fireEvent.click(screen.getByText('Back to History'))
  })
})
