import { createPortal } from 'react-dom'

import { useLockBodyScroll } from '@/app/shared/hooks/useLockBodyScroll'

interface ModalProps {
  children: React.ReactNode
}
export default function CreateCardModal({ children }: ModalProps) {
  const modalRoot = document.getElementById('modal-root')

  useLockBodyScroll()

  if (!modalRoot) return null

  return createPortal(
    <div
      className="z-60 fixed inset-0 flex items-center justify-center bg-black/40"
      style={{ zIndex: 60 }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="BG-white h-970 w-584 overflow-y-scroll rounded-16 p-32 shadow-lg [mask-image:radial-gradient(white_100%,transparent_100%)] mobile:h-766 mobile:w-327 mobile:px-16 mobile:py-24">
        {children}
      </div>
    </div>,
    modalRoot,
  )
}
