import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import VideoPlayer from './VideoPlayer'

describe('VideoPlayer', () => {
  test('renders a video element with controls', () => {
    render(<VideoPlayer videoUrl="/assets/videos/demo.mp4" title="Form demo" />)
    expect(screen.getByText('Form demo')).toBeInTheDocument()
    expect(document.querySelector('video')).toBeInTheDocument()
    expect(screen.getByText(/does not support the video tag/i)).toBeInTheDocument()
  })

  test('toggles playback from the custom button', () => {
    const play = vi.fn().mockResolvedValue()
    const pause = vi.fn()
    render(<VideoPlayer videoUrl="/assets/videos/demo.mp4" title="Form demo" />)
    const video = document.querySelector('video')
    video.play = play
    video.pause = pause
    Object.defineProperty(video, 'paused', { configurable: true, get: () => true })
    fireEvent.click(screen.getByText('Play video'))
    expect(play).toHaveBeenCalled()
  })
})
