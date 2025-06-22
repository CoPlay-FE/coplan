'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = theme === 'dark'

  return (
    <>
      <button
        className="BG-ThemeToggle relative flex h-30 w-60 shrink-0 rounded-25 bg-[url('/images/darkmode.svg')] bg-center bg-no-repeat"
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
      >
        <div
          className={`BG-ThemeToggleButton absolute bottom-5 left-6 size-20 rounded-full transition-transform duration-[0.4s] ease-in-out ${isDark ? 'translate-x-28' : 'translate-x-0'}`}
        ></div>
      </button>
    </>
  )
}

// ✅ 사용법
// Tester 페이지에서처럼 임포트하여 컴포넌트로 집어넣으면 됩니다.
// -> import ThemeToggle from '@components/ThemeToggle'
