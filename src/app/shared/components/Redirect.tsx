'use client'

import { useFirstDashboardIdQuery } from '@hooks/useFirstDashboardIdQuery'
import { useMounted } from '@hooks/useMounted'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { useAuthStore } from '@/app/features/auth/store/useAuthStore'

// 로그인 없이 접근 가능한 경로
const PUBLIC_ROUTES = ['/login', '/signup']

export default function Redirect({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const mounted = useMounted()
  const { isLoggedIn } = useAuthStore()

  const [redirecting, setRedirecting] = useState(false)
  const prevPath = useRef(pathname)

  const { data: firstDashboardId, isSuccess } = useFirstDashboardIdQuery()

  // ✅ 경로 파생값 선언 (중복 제거)
  const isRoot = pathname === '/'
  const isPublic = PUBLIC_ROUTES.includes(pathname)

  // 경로 변경 시 redirecting 상태 초기화
  useEffect(() => {
    if (prevPath.current !== pathname) {
      setRedirecting(false)
      prevPath.current = pathname
    }
  }, [pathname])

  // 로그인 상태와 경로에 따른 리다이렉트 처리
  useEffect(() => {
    if (!mounted || redirecting) return

    // 1. 비로그인 + 루트(/): 랜딩 페이지 접근 허용
    if (!isLoggedIn && isRoot) return

    // 2. 비로그인 + 보호 경로: 로그인 페이지로 이동
    if (!isLoggedIn && !isPublic && !isRoot) {
      setRedirecting(true)
      router.replace('/login')
      return
    }

    // 3. 로그인 + 루트(/): 대시보드 또는 마이대시보드로 이동
    if (isLoggedIn && isRoot) {
      if (!isSuccess) return
      setRedirecting(true)
      router.replace(
        firstDashboardId ? `/dashboard/${firstDashboardId}` : '/mydashboard',
      )
      return
    }

    // 4. 로그인 + 퍼블릭 경로: 마이대시보드로 이동
    if (isLoggedIn && isPublic) {
      setRedirecting(true)
      router.replace('/mydashboard')
      return
    }

    // 5. 나머지는 접근 허용
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
  ])

  // 🔒 깜빡임 방지: 루트 경로만 예외로 즉시 렌더링 허용
  if (!mounted && !isRoot) return null

  // ✅ 최종 렌더링
  return <>{children}</>
}
