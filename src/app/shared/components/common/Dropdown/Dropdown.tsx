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
  const menuRef = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  })

  const toggleOpen = () => setOpen((prev) => !prev)

  const getWidthValue = (width: string) => {
    switch (width) {
      case 'w-5':
        {
          /* 할 일 카드 모달 너비*/
        }
        return '5rem'
      case 'w-6':
        return '6rem'
      default:
        return undefined
    }
  }

  useEffect(() => {
    function updateCoords() {
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
    }

    if (open) {
      updateCoords()
      window.addEventListener('resize', updateCoords)
      window.addEventListener('scroll', updateCoords)
    }

    return () => {
      window.removeEventListener('resize', updateCoords)
      window.removeEventListener('scroll', updateCoords)
    }
  }, [open, align])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
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
            position: 'absolute',
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
          className="BG-white"
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
