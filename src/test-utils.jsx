import { MemoryRouter } from 'react-router'
import { render } from '@testing-library/react'
import { STORAGE_KEYS } from './data/constants'

export const renderWithRouter = (ui, { route = '/' } = {}) =>
  render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>)

export const resetStorage = () => {
  localStorage.removeItem(STORAGE_KEYS.plan)
  localStorage.removeItem(STORAGE_KEYS.history)
}
