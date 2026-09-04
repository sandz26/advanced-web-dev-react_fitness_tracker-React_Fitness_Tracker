import styles from './UI.module.css'

const Modal = ({ isOpen = false, title, onClose, children }) => {
  if (!isOpen) {
    return null
  }

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
        style={{ minWidth: 'min(420px, 90vw)' }}
      >
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
