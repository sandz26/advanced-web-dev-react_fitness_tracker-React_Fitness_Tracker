import styles from './common.module.css'

function Loading({ message = 'Loading...' }) {
  return (
    <div className={styles.loading} role="status">
      {message}
    </div>
  )
}

export default Loading
