import styles from './UI.module.css'

function Modal({ isOpen = false, title, onClose, children }) {
  if (!isOpen) {
    return null
  }

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true">
      <div className={styles.modal}>
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
