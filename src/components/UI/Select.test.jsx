import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Select from './Select'

describe('Select', () => {
  const options = [
    { value: 'all', label: 'All' },
    { value: 'strength', label: 'Strength' },
    { value: 'cardio', label: 'Cardio' },
  ]

  test('renders selected option label on the trigger', () => {
    render(<Select id="test-select" value="strength" options={options} />)
    expect(screen.getByRole('button', { name: /strength/i })).toBeInTheDocument()
  })

  test('opens and selects an option via click', () => {
    const onChange = vi.fn()
    render(<Select id="test-select" name="category" value="all" options={options} onChange={onChange} />)

    const trigger = screen.getByRole('button', { name: /all/i })
    fireEvent.click(trigger)

    const cardioOption = screen.getByRole('option', { name: /cardio/i })
    fireEvent.click(cardioOption)

    expect(onChange).toHaveBeenCalledWith({
      target: {
        name: 'category',
        value: 'cardio',
      },
    })
  })

  test('supports native change event for testing compatibility', () => {
    const onChange = vi.fn()
    const { container } = render(
      <Select id="test-select" name="category" value="all" options={options} onChange={onChange} />,
    )

    const hiddenSelect = container.querySelector('select')
    fireEvent.change(hiddenSelect, { target: { value: 'cardio' } })
    expect(onChange).toHaveBeenCalled()
  })

  test('closes on escape and click outside', () => {
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <Select id="test-select" value="all" options={options} />
      </div>,
    )

    const trigger = screen.getByRole('button', { name: /all/i })
    fireEvent.click(trigger)
    expect(screen.getByRole('listbox')).toBeInTheDocument()

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()

    fireEvent.click(trigger)
    expect(screen.getByRole('listbox')).toBeInTheDocument()

    fireEvent.pointerDown(screen.getByTestId('outside'))
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })
})
