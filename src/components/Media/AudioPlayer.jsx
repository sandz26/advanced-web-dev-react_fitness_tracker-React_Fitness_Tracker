import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../UI/Button'
import styles from './Media.module.css'

const AudioPlayer = ({
  audioUrl = '/assets/audio/motivation.wav',
  title = 'Workout motivation',
  description = '',
}) => {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // Mirror native audio events so the label can switch between play and pause.
  useEffect(() => {
    const node = audioRef.current
    if (!node) {
      return undefined
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    node.addEventListener('play', handlePlay)
    node.addEventListener('pause', handlePause)

    return () => {
      node.removeEventListener('play', handlePlay)
      node.removeEventListener('pause', handlePause)
    }
  }, [audioUrl])

  const togglePlayback = () => {
    const node = audioRef.current
    if (!node) {
      return
    }
    if (node.paused) {
      node.play()
    } else {
      node.pause()
    }
  }

  return (
    <figure className={styles.media}>
      <h4>{title}</h4>
      {description ? <p>{description}</p> : null}
      <audio ref={audioRef} controls>
        <source src={audioUrl} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
      <Button variant="secondary" onClick={togglePlayback}>
        {isPlaying ? 'Pause audio' : 'Play audio'}
      </Button>
    </figure>
  )
}

AudioPlayer.propTypes = {
  audioUrl: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
}

export default AudioPlayer
