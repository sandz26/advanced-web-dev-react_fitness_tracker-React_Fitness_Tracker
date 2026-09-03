import styles from './UI.module.css'

function Button({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  ...props
}) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant] ?? ''}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
