import styles from './Media.module.css'

function AudioPlayer({ src, title = 'Workout motivation' }) {
  return (
    <figure className={styles.media}>
      <figcaption>{title}</figcaption>
      <audio controls src={src}>
        Your browser does not support the audio element.
      </audio>
    </figure>
  )
}

export default AudioPlayer
