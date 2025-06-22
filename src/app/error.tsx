'use client'

import { useMounted } from '@hooks/useMounted'
import Image from 'next/image'
import { useTheme } from 'next-themes'

export default function ErrorPage({ reset }: { reset?: () => void }) {
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
          : 'flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100'
      }
    >
      <div className="flex size-28 items-center justify-center">
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
            ? 'mt-8 text-4xl font-bold tracking-tight text-blue-300'
            : 'mt-8 text-4xl font-bold tracking-tight text-blue-600'
        }
      >
        에러가 발생했습니다
      </div>
      <div
        className={
          isDark
            ? 'mt-3 text-lg font-normal text-gray-300'
            : 'mt-3 text-lg font-normal text-gray-600'
        }
      >
        문제가 발생했습니다. 잠시 후 다시 시도해 주세요.
      </div>
      <button
        className={
          isDark
            ? 'mt-8 rounded-lg bg-blue-700 px-8 py-3 text-lg font-semibold text-white shadow transition-colors hover:bg-blue-800'
            : 'mt-8 rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow transition-colors hover:bg-blue-700'
        }
        onClick={() => (reset ? reset() : window.history.back())}
      >
        이전 페이지로
      </button>
    </div>
  )
}
