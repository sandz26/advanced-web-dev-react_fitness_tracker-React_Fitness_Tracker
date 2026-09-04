import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { vi } from 'vitest'
import WorkoutLog from './WorkoutLog'

describe('WorkoutLog', () => {
  test('shows an empty state when there are no logs', () => {
    render(
      <MemoryRouter>
        <WorkoutLog entries={[]} />
      </MemoryRouter>,
    )
    expect(screen.getByText(/No workouts logged yet/i)).toBeInTheDocument()
  })

  test('submits a completed workout', () => {
    const onSubmit = vi.fn()
    render(
      <MemoryRouter>
        <WorkoutLog entries={[]} onSubmit={onSubmit} />
      </MemoryRouter>,
    )
    fireEvent.change(screen.getByLabelText('Sets'), { target: { value: '4' } })
    fireEvent.change(screen.getByLabelText('Reps'), { target: { value: '8' } })
    fireEvent.change(screen.getByLabelText('Weight (kg)'), { target: { value: '20' } })
    fireEvent.submit(screen.getByText('Log Workout'))
    expect(onSubmit).toHaveBeenCalled()
    expect(onSubmit.mock.calls[0][0].sets).toBe(4)
  })

  test('blocks a negative weight on blur and submit', () => {
    const onSubmit = vi.fn()
    render(
      <MemoryRouter>
        <WorkoutLog entries={[]} onSubmit={onSubmit} />
      </MemoryRouter>,
    )
    const weight = screen.getByLabelText('Weight (kg)')
    fireEvent.change(weight, { target: { value: '-4' } })
    fireEvent.blur(weight)
    fireEvent.submit(screen.getByText('Log Workout'))
    expect(screen.getByText('Weight must be 0 or more')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })
})
