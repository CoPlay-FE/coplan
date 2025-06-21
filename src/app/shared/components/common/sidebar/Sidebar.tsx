'use client'

import { useContainerInfiniteScroll } from '@hooks/useContainerInfiniteScroll'
import { useModalStore } from '@store/useModalStore'
import { useSelectedDashboardStore } from '@store/useSelectedDashboardStore'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useMemo } from 'react'

import { useDashboardsInfinite } from '@/app/shared/hooks/useDashboardInfinite'
import { Dashboard } from '@/types/dashboard'

import CreateDashboardButton from './CreateDashboardButton'
import DashboardItem from './DashboardItem'

export default function Sidebar(): JSX.Element {
  const pathname = usePathname()
  const router = useRouter()
  const { openModal } = useModalStore()
  const { setSelectedDashboard } = useSelectedDashboardStore()

  // 무한스크롤 데이터 관리
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useDashboardsInfinite(25)

  // 컨테이너 스크롤 감지
  const containerRef = useContainerInfiniteScroll(
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  )

  // 모든 대시보드 데이터 병합
  const allDashboards = useMemo(() => {
    return data?.pages.flatMap((page) => page.dashboards) || []
  }, [data])

  const handleDashboardClick = (dashboard: Dashboard) => {
    setSelectedDashboard(dashboard)
    router.push(`/dashboard/${dashboard.id}`)
  }

  // 에러 타입 처리
  const errorMessage =
    error instanceof Error ? error.message : '대시보드 목록 불러오기 실패'

  return (
    <aside className="BG-white Border-section fixed left-0 top-0 flex h-screen w-300 flex-col">
      {/* 로고 섹션 */}
      <div className="flex h-70 flex-shrink-0 items-center px-20">
        <Link href="/" className="flex items-center gap-8">
          <div className="relative h-35 w-150">
            <Image
              src="/images/logo-light2.svg"
              alt="Coplan logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>
      </div>

      {/* 대시보드 섹션 */}
      <div className="flex min-h-0 flex-1 flex-col px-20 py-24">
        <div className="mb-24 flex flex-shrink-0 items-center justify-between">
          <h2 className="Text-gray text-12 font-semibold">Dash Boards</h2>
          <CreateDashboardButton onClick={() => openModal('createDashboard')} />
        </div>

        {/* 스크롤 가능한 대시보드 목록 컨테이너 */}
        <div
          ref={containerRef}
          className="flex-1 space-y-8 overflow-y-auto"
          style={{ minHeight: '200px' }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="Text-gray text-14">로딩중...</div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-20">
              <div className="Text-red text-14">{errorMessage}</div>
            </div>
          ) : allDashboards.length === 0 ? (
            <div className="flex items-center justify-start py-20">
              <div className="Text-gray text-14">대시보드가 없습니다.</div>
            </div>
          ) : (
            <>
              {/* 대시보드 목록 */}
              {allDashboards.map((dashboard) => (
                <DashboardItem
                  key={`sidebar-${dashboard.id}`}
                  dashboard={dashboard}
                  isActive={pathname === `/dashboard/${dashboard.id}`}
                  onClick={() => handleDashboardClick(dashboard)}
                />
              ))}

              {/* 추가 로딩 중일 때 스켈레톤 */}
              {isFetchingNextPage && (
                <div className="space-y-8">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={`skeleton-${index}`}
                      className="flex items-center gap-12 rounded-6 p-12"
                    >
                      {/* 색상 원 스켈레톤 */}
                      <div className="size-8 animate-pulse rounded-full bg-gray-200" />
                      {/* 제목 스켈레톤 */}
                      <div className="h-16 flex-1 animate-pulse rounded-4 bg-gray-200" />
                    </div>
                  ))}
                </div>
              )}

              {/* 더 이상 데이터가 없을 때 */}
              {!hasNextPage && allDashboards.length > 0 && (
                <div className="py-12 text-center">
                  <p className="Text-gray text-12">
                    모든 대시보드를 확인했습니다.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </aside>
  )
}
