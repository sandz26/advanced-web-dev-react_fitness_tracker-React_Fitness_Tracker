import { screen } from '@testing-library/react'
import App from '../App'
import { renderWithRouter, resetStorage } from '../test-utils'

describe('App shell', () => {
  beforeEach(() => {
    resetStorage()
  })

  test('shows the home heading on the root route', () => {
    renderWithRouter(<App />)
    expect(screen.getByRole('heading', { name: /Stay consistent/i })).toBeInTheDocument()
  })
})
