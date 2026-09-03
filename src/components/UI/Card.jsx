import styles from './UI.module.css'

function Card({ children, title }) {
  return (
    <article className={styles.card}>
      {title ? <h3>{title}</h3> : null}
      {children}
    </article>
  )
}

export default Card
