import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type DropdownProps = {
  trigger: React.ReactNode
  children: React.ReactNode
  width?: string
  align?: 'left' | 'center' | 'right'
}

export default function Dropdown({
  trigger,
  children,
  width = 'w-48',
  align = 'left',
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  })

  const toggleOpen = () => setOpen((prev) => !prev)

  useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()

      let left = rect.left
      if (align === 'center') left = rect.left + rect.width / 2
      else if (align === 'right') left = rect.right

      setCoords({
        top: rect.bottom + window.scrollY,
        left,
      })
    }
  }, [open, align])

  const menu = open
    ? createPortal(
        <div
          style={{
            position: 'absolute',
            top: coords.top,
            left: coords.left,
            transform:
              align === 'center'
                ? 'translateX(-50%)'
                : align === 'right'
                  ? 'translateX(-100%)'
                  : undefined,
            width: width === 'w-48' ? '12rem' : undefined, // 필요에 따라 width 조절
            backgroundColor: 'BG-white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            borderRadius: 8,
            zIndex: 9999,
          }}
          onClick={() => setOpen(false)}
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
        onClick={toggleOpen}
        className="inline-block cursor-pointer"
      >
        {trigger}
      </div>
      {menu}
    </>
  )
}
