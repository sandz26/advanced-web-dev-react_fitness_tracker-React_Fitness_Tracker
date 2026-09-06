import { render, screen } from '@testing-library/react'
import ExerciseIcon from './ExerciseIcon'

describe('ExerciseIcon', () => {
  test('renders icon for a known exercise name', () => {
    render(<ExerciseIcon name="Bench Press" size={64} />)
    const iconWrapper = screen.getByRole('img', { name: 'Bench Press' })
    expect(iconWrapper).toBeInTheDocument()
    expect(iconWrapper).toHaveStyle({ width: '64px', height: '64px' })
  })

  test('renders fallback icon when exercise name is unknown', () => {
    render(<ExerciseIcon name="Unknown Exercise" />)
    const iconWrapper = screen.getByRole('img', { name: 'Unknown Exercise' })
    expect(iconWrapper).toBeInTheDocument()
  })
})
