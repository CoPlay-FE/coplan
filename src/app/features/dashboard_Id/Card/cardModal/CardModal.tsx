import { createPortal } from 'react-dom'

import { useLockBodyScroll } from '@/app/shared/hooks/useLockBodyScroll'

interface ModalProps {
  children: React.ReactNode
}
export default function CardModal({ children }: ModalProps) {
  const modalRoot = document.getElementById('modal-root')

  useLockBodyScroll()

  if (!modalRoot) return null

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div>{children}</div>
    </div>,
    modalRoot,
  )
}
