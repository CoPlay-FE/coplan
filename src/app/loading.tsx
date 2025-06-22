'use client'

import { useMounted } from '@hooks/useMounted'
import Image from 'next/image'
import { useTheme } from 'next-themes'

export default function Loading() {
  const { theme, systemTheme } = useTheme()
  const mounted = useMounted()
  if (!mounted) return null

  const currentTheme = theme === 'system' ? systemTheme : theme
  const isDark = currentTheme === 'dark'

  return (
    <div
      className={
        isDark
          ? 'flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800'
          : 'flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200'
      }
    >
      <div className="relative flex size-300 items-center justify-center">
        <Image
          src={isDark ? '/images/logo-dark.svg' : '/images/logo-light.svg'}
          alt="logo"
          fill
          priority
          className="object-contain"
        />
      </div>
      <div
        className={
          isDark
            ? 'mt-8 text-2xl font-semibold text-blue-300'
            : 'mt-8 text-2xl font-semibold text-blue-600'
        }
      >
        로딩 중입니다...
      </div>
    </div>
  )
}
