import { render, screen } from '@testing-library/react'
import AudioPlayer from './AudioPlayer'

describe('AudioPlayer', () => {
  test('renders an audio element with controls', () => {
    render(<AudioPlayer title="Motivational track" />)
    expect(screen.getByText('Motivational track')).toBeInTheDocument()
    expect(document.querySelector('audio')).toBeInTheDocument()
    expect(screen.getByText(/does not support the audio element/i)).toBeInTheDocument()
  })
})
