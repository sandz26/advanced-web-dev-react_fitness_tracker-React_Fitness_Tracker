import { render, screen } from '@testing-library/react'
import Card from './Card'

describe('Card', () => {
  test('renders children content', () => {
    render(<Card title="Demo">Inner copy</Card>)
    expect(screen.getByText('Demo')).toBeInTheDocument()
    expect(screen.getByText('Inner copy')).toBeInTheDocument()
  })
})
