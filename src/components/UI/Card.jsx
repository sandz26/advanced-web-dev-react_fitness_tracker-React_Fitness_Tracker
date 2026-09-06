import PropTypes from 'prop-types'
import styles from './UI.module.css'

const Card = ({ children, title, selected = false, onClick, className = '' }) => (
  <article
    className={`${styles.card} ${selected ? styles.selected : ''} ${className}`.trim()}
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
  className: PropTypes.string,
}

export default Card
