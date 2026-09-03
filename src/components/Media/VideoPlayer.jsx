import styles from './Media.module.css'

function VideoPlayer({ src, title = 'Exercise demonstration' }) {
  return (
    <figure className={styles.media}>
      <video controls src={src}>
        Your browser does not support the video tag.
      </video>
      <figcaption>{title}</figcaption>
    </figure>
  )
}

export default VideoPlayer
