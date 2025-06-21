'use client'

import { useFirstDashboardIdQuery } from '@hooks/useFirstDashboardIdQuery'
import { useMounted } from '@hooks/useMounted'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { useAuthStore } from '@/app/features/auth/store/useAuthStore'

const PUBLIC_ROUTES = ['/login', '/signup']

export default function Redirect({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const mounted = useMounted()
  const { isLoggedIn } = useAuthStore()
  const [redirecting, setRedirecting] = useState(false) // 중복 호출 방지
  const prevPath = useRef(pathname) // 이전 경로 저장

  const { data: firstDashboardId, isSuccess } = useFirstDashboardIdQuery()

  // pathname 바뀌면 redirecting 초기화
  useEffect(() => {
    if (prevPath.current !== pathname) {
      setRedirecting(false)
      prevPath.current = pathname
    }
  }, [pathname])

  useEffect(() => {
    if (!mounted || redirecting) return // 마운트가 되지 않았거나 리다이렉션 중이 아니면 return

    const isPublic = PUBLIC_ROUTES.includes(pathname) //로그인 없이 접근 가능한 공개 라우트

    // 🔒 비로그인 상태에서 private 경로 접근 시 → /login
    if (!isLoggedIn && !isPublic && pathname !== '/') {
      setRedirecting(true)
      router.replace('/login')
      return
    }

    // 🔐 로그인 상태에서 루트 접근 시 → /dashboard/{id}
    if (isLoggedIn && pathname === '/') {
      setRedirecting(true)
      if (isSuccess && firstDashboardId) {
        router.replace(`/dashboard/${firstDashboardId}`)
      } else if (isSuccess && !firstDashboardId) {
        router.replace('/mydashboard')
      }
      return
    }

    // 🔐 로그인 + 퍼블릭 경로 접근 시 → /mydashboard
    if (isLoggedIn && isPublic) {
      setRedirecting(true)
      router.replace('/mydashboard')
      return
    }
  }, [
    pathname,
    isLoggedIn,
    mounted,
    redirecting,
    router,
    isSuccess,
    firstDashboardId,
  ])

  if (!mounted) return null
  return <>{children}</>
}
