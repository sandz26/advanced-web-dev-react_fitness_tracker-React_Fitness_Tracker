import styles from './common.module.css'

const Loading = ({ message = 'Loading...' }) => (
  <div className={styles.loading} role="status">
    {message}
  </div>
)

export default Loading
