'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type TooltipProps = {
  content: string
  children: ReactNode
}

export default function Tooltip({ content, children }: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const [coords, setCoords] = useState<{ left: number; top: number }>({
    left: 0,
    top: 0,
  })
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (visible && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect()
      setCoords({
        left: rect.left + rect.width / 2,
        top: rect.bottom + window.scrollY,
      })
    }
  }, [visible])

  const tooltipContent = visible
    ? createPortal(
        <div
          style={{
            position: 'absolute',
            left: coords.left,
            top: coords.top,
            transform: 'translateX(-50%)',
            backgroundColor: 'white',
            color: 'black',
            padding: '6px 12px',
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 500,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            whiteSpace: 'nowrap',
            zIndex: 9999,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {content}
        </div>,
        document.body,
      )
    : null

  return (
    <div
      ref={wrapperRef}
      className="relative flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {tooltipContent}
    </div>
  )
}
