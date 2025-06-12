'use client'

import { cn } from '@lib/cn' // 클래스 이름 병합 유틸리티
import { ReactNode, useEffect, useRef, useState } from 'react'

type DropdownProps = {
  trigger: ReactNode
  children: ReactNode
  align?: 'left' | 'right' | 'center'
  width?: string
}

export default function Dropdown({
  trigger,
  children,
  align = 'center',
  width = 'w-40',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative inline-block">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer"
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            'BG-gray absolute z-50 mt-4 rounded border shadow-md',
            width,
            {
              'left-0': align === 'left',
              'right-0': align === 'right',
              'left-1/2 -translate-x-1/2': align === 'center',
            },
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}
