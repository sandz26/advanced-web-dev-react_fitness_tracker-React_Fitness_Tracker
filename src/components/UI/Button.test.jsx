import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Button from './Button'

describe('Button', () => {
  test('calls onClick handler', () => {
    const mockOnClick = vi.fn()
    render(<Button onClick={mockOnClick}>Click Me</Button>)
    fireEvent.click(screen.getByText('Click Me'))
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  test('calls onSubmit in form', () => {
    const mockOnSubmit = vi.fn((event) => event.preventDefault())
    render(
      <form onSubmit={mockOnSubmit}>
        <Button type="submit">Submit</Button>
      </form>,
    )
    fireEvent.submit(screen.getByText('Submit'))
    expect(mockOnSubmit).toHaveBeenCalled()
  })
})
