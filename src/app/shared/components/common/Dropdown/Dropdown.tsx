import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type DropdownProps = {
  trigger: React.ReactNode
  children: React.ReactNode
  width?: string
  align?: 'left' | 'center' | 'right'
  className?: string
}

export default function Dropdown({
  trigger,
  children,
  width = 'w-6',
  align = 'left',
  className = '',
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  })

  // Tailwind 너비를 px 값으로 변환
  function getWidthValue(width: string): string | undefined {
    switch (width) {
      case 'w-5':
        return '5rem'
      case 'w-6':
        return '6rem'
      default:
        return undefined
    }
  }

  // 위치 업데이트 함수 (useLayoutEffect로 변경)
  useLayoutEffect(() => {
    if (!open) return

    function updateCoords() {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect()
        let left = rect.left
        if (align === 'center') left = rect.left + rect.width / 2
        else if (align === 'right') left = rect.right

        setCoords({
          top: rect.bottom,
          left,
        })
      }
    }

    updateCoords()

    window.addEventListener('scroll', updateCoords, { passive: true })
    window.addEventListener('resize', updateCoords)

    return () => {
      window.removeEventListener('scroll', updateCoords)
      window.removeEventListener('resize', updateCoords)
    }
  }, [open, align])

  // 외부 클릭 감지해서 닫기
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  const menu = open
    ? createPortal(
        <div
          ref={menuRef}
          style={{
            position: 'fixed',
            top: coords.top,
            left: coords.left,
            transform:
              align === 'center'
                ? 'translateX(-50%)'
                : align === 'right'
                  ? 'translateX(-100%)'
                  : undefined,
            width: getWidthValue(width),
            minWidth: getWidthValue(width),
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            borderRadius: 8,
            zIndex: 9999,
          }}
          className={`BG-white ${className}`}
        >
          {children}
        </div>,
        document.body,
      )
    : null

  return (
    <>
      <div
        ref={triggerRef}
        onClick={() => setOpen((prev) => !prev)}
        className="inline-block cursor-pointer"
      >
        {trigger}
      </div>
      {menu}
    </>
  )
}
