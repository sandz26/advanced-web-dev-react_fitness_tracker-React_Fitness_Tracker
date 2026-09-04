import { fireEvent, screen } from '@testing-library/react'
import { Route, Routes } from 'react-router'
import NotFound from './NotFound'
import { renderWithRouter } from '../test-utils'

describe('NotFound', () => {
  test('navigates home when Go Home is clicked', () => {
    renderWithRouter(
      <Routes>
        <Route path="/" element={<p>Landed home</p>} />
        <Route path="*" element={<NotFound />} />
      </Routes>,
      { route: '/nope' },
    )
    fireEvent.click(screen.getByText('Go Home'))
    expect(screen.getByText('Landed home')).toBeInTheDocument()
  })
})
