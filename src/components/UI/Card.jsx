import PropTypes from 'prop-types'
import styles from './UI.module.css'

const Card = ({ children, title, selected = false, onClick }) => (
  <article
    className={`${styles.card} ${selected ? styles.selected : ''}`}
    onClick={onClick}
  >
    {title ? <h3>{title}</h3> : null}
    {children}
  </article>
)

Card.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Card
