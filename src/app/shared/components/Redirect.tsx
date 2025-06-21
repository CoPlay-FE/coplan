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

  const [redirecting, setRedirecting] = useState(false)
  const prevPath = useRef(pathname)

  // 대시보드 첫 번째 ID 가져오기 (로그인 상태일 때만 요청됨)
  const { data: firstDashboardId, isSuccess } = useFirstDashboardIdQuery()

  // 페이지 이동 시 redirecting 상태 초기화
  useEffect(() => {
    if (prevPath.current !== pathname) {
      setRedirecting(false)
      prevPath.current = pathname
    }
  }, [pathname])

  // 라우팅 조건 분기 처리
  useEffect(() => {
    if (!mounted || redirecting) return

    const isPublic = PUBLIC_ROUTES.includes(pathname)
    const isRoot = pathname === '/'

    // 비로그인 상태에서 루트 접근 시: 랜딩 페이지 접근 허용
    if (!isLoggedIn && isRoot) return

    // 비로그인 상태에서 보호 경로 접근 시: 로그인 페이지로 리다이렉트
    if (!isLoggedIn && !isPublic && !isRoot) {
      setRedirecting(true)
      router.replace('/login')
      return
    }

    // 로그인 상태에서 루트 접근 시: 첫 대시보드 or 마이대시보드로 리다이렉트
    if (isLoggedIn && isRoot) {
      if (!isSuccess) return // 대시보드 ID 준비 안 됨
      setRedirecting(true)
      router.replace(
        firstDashboardId ? `/dashboard/${firstDashboardId}` : '/mydashboard',
      )
      return
    }

    // 로그인 상태에서 퍼블릭 경로 접근 시: 마이대시보드로 리다이렉트
    if (isLoggedIn && isPublic) {
      setRedirecting(true)
      router.replace('/mydashboard')
      return
    }

    // 나머지는 접근 허용
  }, [
    pathname,
    isLoggedIn,
    mounted,
    redirecting,
    router,
    isSuccess,
    firstDashboardId,
  ])

  // 깜빡임 방지 (조건 충족 시 children 렌더 차단)
  const shouldBlockRender =
    !mounted || redirecting || (isLoggedIn && pathname === '/' && !isSuccess)

  if (shouldBlockRender) {
    return null
  }

  return <>{children}</>
}
