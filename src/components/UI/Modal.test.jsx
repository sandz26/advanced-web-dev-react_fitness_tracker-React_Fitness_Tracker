import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Modal from './Modal'

describe('Modal', () => {
  test('returns nothing when closed', () => {
    const { container } = render(
      <Modal isOpen={false} title="Hidden">
        Secret
      </Modal>,
    )
    expect(container).toBeEmptyDOMElement()
  })

  test('closes from the backdrop and the close button', () => {
    const onClose = vi.fn()
    render(
      <Modal isOpen title="Open modal" onClose={onClose}>
        Body
      </Modal>,
    )
    fireEvent.click(screen.getByLabelText('Close'))
    expect(onClose).toHaveBeenCalled()
  })
})
