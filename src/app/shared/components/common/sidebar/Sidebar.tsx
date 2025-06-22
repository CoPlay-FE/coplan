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
    <aside className="BG-white Border-section mobile-wide:w-67 tablet-wide:w-160 fixed left-0 top-0 z-50 flex h-full w-300 flex-col">
      {/* 로고 섹션 */}
      <div className="mobile-wide:justify-center mobile-wide:px-8 tablet-wide:px-12 flex h-70 flex-shrink-0 items-center px-20">
        <Link href="/mydashboard" className="flex items-center gap-8">
          <div className="mobile-wide:size-24 tablet-wide:h-30 tablet-wide:w-120 relative h-35 w-150">
            {/* 데스크톱 & 태블릿: 전체 로고 */}
            <Image
              src="/images/logo-light2.svg"
              alt="Coplan logo"
              fill
              className="mobile-wide:hidden object-contain"
              priority
            />
            {/* 모바일: 아이콘만 */}
            <Image
              src="/images/logo-icon-light.svg"
              alt="Coplan"
              fill
              className="mobile-wide:block hidden object-contain"
              priority
            />
          </div>
        </Link>
      </div>

      {/* 대시보드 섹션 */}
      <div className="mobile-wide:px-8 mobile-wide:py-12 tablet-wide:px-12 tablet-wide:py-16 flex min-h-0 flex-1 flex-col px-20 py-24">
        {/* 헤더 */}
        <div className="mobile-wide:hidden tablet-wide:mb-16 mb-24 flex flex-shrink-0 items-center justify-between">
          <h2 className="Text-gray tablet-wide:text-10 text-12 font-semibold">
            Dash Boards
          </h2>
          <CreateDashboardButton onClick={() => openModal('createDashboard')} />
        </div>

        {/* 모바일 전용 + 버튼 */}
        <div className="mobile-wide:flex mb-12 hidden flex-shrink-0 justify-center">
          <CreateDashboardButton onClick={() => openModal('createDashboard')} />
        </div>

        {/* 스크롤 가능한 대시보드 목록 컨테이너 */}
        <div
          ref={containerRef}
          className="mobile-wide:space-y-4 tablet-wide:space-y-6 flex-1 space-y-8 overflow-y-auto"
          style={{ minHeight: '200px' }}
        >
          {isLoading ? (
            <div className="mobile-wide:py-8 tablet-wide:py-12 flex items-center justify-center py-20">
              <div className="Text-gray mobile-wide:hidden tablet-wide:text-12 text-14">
                로딩중...
              </div>
              {/* 모바일: 로딩 스피너만 */}
              <div className="mobile-wide:block hidden size-16 animate-spin rounded-full border-2 border-gray-200 border-t-blue-500" />
            </div>
          ) : error ? (
            <div className="mobile-wide:py-8 tablet-wide:py-12 flex items-center justify-center py-20">
              <div className="Text-red text-14">{errorMessage}</div>
            </div>
          ) : allDashboards.length > 0 ? (
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
                <div className="mobile-wide:space-y-4 tablet-wide:space-y-6 space-y-8">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={`skeleton-${index}`}
                      className="mobile-wide:justify-center mobile-wide:gap-0 mobile-wide:p-4 tablet-wide:gap-8 tablet-wide:p-8 flex items-center gap-12 rounded-6 p-12"
                    >
                      {/* 색상 원 스켈레톤 */}
                      <div className="mobile-wide:size-12 tablet-wide:size-6 size-8 animate-pulse rounded-full bg-gray-200" />
                      {/* 제목 스켈레톤 - 모바일에서 숨김 */}
                      <div className="mobile-wide:hidden tablet-wide:h-14 h-16 flex-1 animate-pulse rounded-4 bg-gray-200" />
                    </div>
                  ))}
                </div>
              )}

              {/* 더 이상 데이터가 없을 때 */}
              {!hasNextPage && allDashboards.length > 0 && (
                <div className="mobile-wide:py-4 tablet-wide:py-8 py-12 text-center">
                  <p className="Text-gray mobile-wide:hidden tablet-wide:text-10 text-12">
                    모든 대시보드를 확인했습니다.
                  </p>
                  {/* 모바일: 완료 아이콘만 */}
                  <div className="Text-gray mobile-wide:block hidden text-12">
                    ✓
                  </div>
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
    </aside>
  )
}
