import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import SearchBar from './SearchBar'

describe('SearchBar', () => {
  test('notifies the parent on change, submit, focus, and blur', () => {
    const onChange = vi.fn()
    const onSubmit = vi.fn()
    render(<SearchBar value="push" onChange={onChange} onSubmit={onSubmit} />)

    const input = screen.getByPlaceholderText('Search exercises...')
    fireEvent.focus(input)
    fireEvent.change(input, { target: { value: 'plank' } })
    fireEvent.keyDown(input, { key: 'Escape' })
    fireEvent.blur(input)
    fireEvent.submit(input.closest('form'))

    expect(onChange).toHaveBeenCalledWith('plank', expect.any(Object))
    expect(onSubmit).toHaveBeenCalled()
  })
})
