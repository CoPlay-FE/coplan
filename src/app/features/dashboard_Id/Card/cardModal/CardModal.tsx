import { createPortal } from 'react-dom'

interface ModalProps {
  children: React.ReactNode
}
export default function CardModal({ children }: ModalProps) {
  const modalRoot = document.getElementById('modal-root')
  if (!modalRoot) return null

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="BG-white relative max-h-764 min-h-764 w-730 overflow-auto overflow-y-scroll rounded-16 px-18 py-30 shadow-lg [mask-image:radial-gradient(white_100%,transparent_100%)] mobile:w-327 mobile:p-16 tablet:w-678 tablet:px-32 tablet:py-24">
        {children}
      </div>
    </div>,
    modalRoot,
  )
}
