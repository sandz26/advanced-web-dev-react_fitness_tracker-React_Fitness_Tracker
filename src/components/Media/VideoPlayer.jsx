import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../UI/Button'
import styles from './Media.module.css'

const VideoPlayer = ({
  videoUrl,
  title = 'Exercise demonstration',
  description = '',
}) => {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // Keep the custom play button in sync with the native video controls.
  useEffect(() => {
    const node = videoRef.current
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
  }, [videoUrl])

  const togglePlayback = () => {
    const node = videoRef.current
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
      <h3>{title}</h3>
      {description ? <p>{description}</p> : null}
      <video ref={videoRef} controls width="100%">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Button variant="secondary" onClick={togglePlayback}>
        {isPlaying ? 'Pause video' : 'Play video'}
      </Button>
    </figure>
  )
}

VideoPlayer.propTypes = {
  videoUrl: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
}

export default VideoPlayer
