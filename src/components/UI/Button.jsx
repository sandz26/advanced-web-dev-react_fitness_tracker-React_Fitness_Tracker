import PropTypes from 'prop-types'
import styles from './UI.module.css'

const Button = ({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled = false,
  ...props
}) => (
  <button
    type={type}
    className={`${styles.button} ${styles[variant] ?? ''}`}
    onClick={onClick}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
)

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
}

export default Button
