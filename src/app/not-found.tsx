'use client'

import { useMounted } from '@hooks/useMounted'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'

import { useAuthStore } from '@/app/features/auth/store/useAuthStore'

export default function NotFound() {
  const { theme, systemTheme } = useTheme()
  const mounted = useMounted()
  const router = useRouter()
  const { isLoggedIn } = useAuthStore()

  if (!mounted) return null

  const currentTheme = theme === 'system' ? systemTheme : theme
  const isDark = currentTheme === 'dark'

  const buttonText = isLoggedIn ? '대시보드로 이동' : '메인으로 이동'
  const buttonClass = isDark
    ? isLoggedIn
      ? 'bg-blue-700 hover:bg-blue-800'
      : 'bg-blue-500 hover:bg-blue-600'
    : isLoggedIn
      ? 'bg-blue-600 hover:bg-blue-700'
      : 'bg-blue-400 hover:bg-blue-500'

  return (
    <div
      className={
        isDark
          ? 'flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800'
          : 'flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100'
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
            ? 'mt-8 text-4xl font-bold tracking-tight text-blue-300'
            : 'mt-8 text-4xl font-bold tracking-tight text-blue-600'
        }
      >
        404 Not Found
      </div>
      <div
        className={
          isDark
            ? 'mt-3 text-lg font-normal text-gray-300'
            : 'mt-3 text-lg font-normal text-gray-600'
        }
      >
        요청하신 페이지를 찾을 수 없습니다.
      </div>
      <button
        className={`mt-8 rounded-lg px-8 py-3 text-lg font-semibold text-white shadow transition-colors ${buttonClass}`}
        onClick={() => router.replace('/')}
      >
        {buttonText}
      </button>
    </div>
  )
}
