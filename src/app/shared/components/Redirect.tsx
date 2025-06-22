'use client'

import { useFirstDashboardIdQuery } from '@hooks/useFirstDashboardIdQuery'
import { useMounted } from '@hooks/useMounted'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { useAuthStore } from '@/app/features/auth/store/useAuthStore'

// 로그인 없이 접근 가능한 경로
const PUBLIC_ROUTES = ['/login', '/signup']

// 보호 경로: 로그인 필요, 정규식 기반
const PROTECTED_ROUTE_PATTERNS = [
  /^\/dashboard\/[^/]+$/, // /dashboard/:id
  /^\/dashboard\/[^/]+\/edit$/, // /dashboard/:id/edit
  /^\/mypage$/, // /mypage
  /^\/mydashboard$/, // /mydashboard
]

export default function Redirect({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const mounted = useMounted()
  const { isLoggedIn } = useAuthStore()
  const [redirecting, setRedirecting] = useState(false)
  const prevPath = useRef(pathname)

  const { data: firstDashboardId, isSuccess } = useFirstDashboardIdQuery()

  const isRoot = pathname === '/'
  const isPublic = PUBLIC_ROUTES.includes(pathname)
  const isProtectedRoute = PROTECTED_ROUTE_PATTERNS.some((pattern) =>
    pattern.test(pathname),
  )

  useEffect(() => {
    if (prevPath.current !== pathname) {
      setRedirecting(false)
      prevPath.current = pathname
    }
  }, [pathname])

  useEffect(() => {
    if (!mounted || redirecting) return

    if (!isLoggedIn && isRoot) return

    if (!isLoggedIn && isProtectedRoute) {
      setRedirecting(true)
      router.replace('/login')
      return
    }

    if (isLoggedIn && isRoot) {
      if (!isSuccess) return
      setRedirecting(true)
      router.replace(
        firstDashboardId ? `/dashboard/${firstDashboardId}` : '/mydashboard',
      )
      return
    }

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
    isRoot,
    isPublic,
    isProtectedRoute,
  ])

  if (!mounted && !isRoot) return null

  return <>{children}</>
}
