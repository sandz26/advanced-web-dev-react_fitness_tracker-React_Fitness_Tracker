import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../UI/Button'
import styles from './Media.module.css'

const getAudioType = (url = '') => {
  if (url.endsWith('.mp3')) return 'audio/mpeg'
  if (url.endsWith('.wav')) return 'audio/wav'
  if (url.endsWith('.ogg')) return 'audio/ogg'
  return undefined
}

const AudioPlayer = ({
  audioUrl = '/assets/audio/shut-up-and-grind.mp3',
  title = 'Workout motivation: Shut Up and Grind',
  description = '',
}) => {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

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
      <audio ref={audioRef} controls src={audioUrl}>
        <source src={audioUrl} type={getAudioType(audioUrl)} />
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
