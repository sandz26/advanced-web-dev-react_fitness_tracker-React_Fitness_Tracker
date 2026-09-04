import styles from './common.module.css'

const Header = ({ title, subtitle }) => (
  <header className={styles.header}>
    <h1>{title}</h1>
    {subtitle ? <p>{subtitle}</p> : null}
  </header>
)

export default Header
