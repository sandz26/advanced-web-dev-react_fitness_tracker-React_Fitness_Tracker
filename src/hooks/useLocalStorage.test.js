import { act, renderHook } from '@testing-library/react'
import useLocalStorage from './useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('returns initial value', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'initial'))
    expect(result.current[0]).toBe('initial')
  })

  test('updates localStorage on value change', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'initial'))

    act(() => {
      result.current[1]('updated')
    })

    expect(localStorage.getItem('test')).toBe(JSON.stringify('updated'))
  })
})
