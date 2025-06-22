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
    <aside className="BG-white Border-section tablet:w-160 mobile:w-67 fixed left-0 top-0 z-50 flex h-full w-300 flex-col">
      {/* 로고 섹션 */}
      <div className="tablet:px-12 mobile:px-8 mobile:justify-center flex h-70 flex-shrink-0 items-center px-20">
        <Link href="/" className="flex items-center gap-8">
          <div className="tablet:h-30 tablet:w-120 mobile:size-24 relative h-35 w-150">
            {/* 데스크톱 & 태블릿: 전체 로고 */}
            <Image
              src="/images/logo-light2.svg"
              alt="Coplan logo"
              fill
              className="mobile:hidden object-contain"
              priority
            />
            {/* 모바일: 아이콘만 */}
            <Image
              src="/images/logo-icon-light.svg"
              alt="Coplan"
              fill
              className="mobile:block hidden object-contain"
              priority
            />
          </div>
        </Link>
      </div>

      {/* 대시보드 섹션 */}
      <div className="tablet:px-12 mobile:px-8 tablet:py-16 mobile:py-12 flex min-h-0 flex-1 flex-col px-20 py-24">
        {/* 헤더 */}
        <div className="tablet:mb-16 mobile:hidden mb-24 flex flex-shrink-0 items-center justify-between">
          <h2 className="Text-gray tablet:text-10 text-12 font-semibold">
            Dash Boards
          </h2>
          <CreateDashboardButton onClick={() => openModal('createDashboard')} />
        </div>

        {/* 모바일 전용 + 버튼 */}
        <div className="mobile:flex mb-12 hidden flex-shrink-0 justify-center">
          <CreateDashboardButton onClick={() => openModal('createDashboard')} />
        </div>

        {/* 스크롤 가능한 대시보드 목록 컨테이너 */}
        <div
          ref={containerRef}
          className="tablet:space-y-6 mobile:space-y-4 flex-1 space-y-8 overflow-y-auto"
          style={{ minHeight: '200px' }}
        >
          {isLoading ? (
            <div className="tablet:py-12 mobile:py-8 flex items-center justify-center py-20">
              <div className="Text-gray tablet:text-12 mobile:hidden text-14">
                로딩중...
              </div>
              {/* 모바일: 로딩 스피너만 */}
              <div className="mobile:block hidden size-16 animate-spin rounded-full border-2 border-gray-200 border-t-blue-500" />
            </div>
          ) : error ? (
            <div className="tablet:py-12 mobile:py-8 flex items-center justify-center py-20">
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
                <div className="tablet:space-y-6 mobile:space-y-4 space-y-8">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={`skeleton-${index}`}
                      className="tablet:gap-8 mobile:gap-0 mobile:justify-center tablet:p-8 mobile:p-4 flex items-center gap-12 rounded-6 p-12"
                    >
                      {/* 색상 원 스켈레톤 */}
                      <div className="tablet:size-6 mobile:size-12 size-8 animate-pulse rounded-full bg-gray-200" />
                      {/* 제목 스켈레톤 - 모바일에서 숨김 */}
                      <div className="tablet:h-14 mobile:hidden h-16 flex-1 animate-pulse rounded-4 bg-gray-200" />
                    </div>
                  ))}
                </div>
              )}

              {/* 더 이상 데이터가 없을 때 */}
              {!hasNextPage && allDashboards.length > 0 && (
                <div className="tablet:py-8 mobile:py-4 py-12 text-center">
                  <p className="Text-gray tablet:text-10 mobile:hidden text-12">
                    모든 대시보드를 확인했습니다.
                  </p>
                  {/* 모바일: 완료 아이콘만 */}
                  <div className="mobile:block Text-gray hidden text-12">✓</div>
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
    </aside>
  )
}
