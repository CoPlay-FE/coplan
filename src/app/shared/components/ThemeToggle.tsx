//테스트용 코드임(미완성)
'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <button
      className="BG-white Text-black Border-btn rounded border px-4 py-2"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      ({theme} mode)
    </button>
  )
}
