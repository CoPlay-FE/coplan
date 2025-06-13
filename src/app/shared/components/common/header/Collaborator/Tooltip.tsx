'use client'

import { ReactNode, useState } from 'react'

type TooltipProps = {
  content: string
  children: ReactNode
}

export default function Tooltip({ content, children }: TooltipProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className="BG-white Text-black absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 whitespace-nowrap rounded px-12 py-6 text-xs font-medium shadow-md">
          {content}
        </div>
      )}
    </div>
  )
}
