'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'

import { useInfiniteScroll } from '../../hooks/useInfiniteScroll'
import { useInvitedDashboards } from '../../hooks/useMyDashboards'
import InvitedDashboardRow from './InvitedDashboardRow'
import SearchInput from './SearchInput'

export default function InvitedDashboardTable() {
  const [searchQuery, setSearchQuery] = useState('')

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInvitedDashboards(6)

  useInfiniteScroll(fetchNextPage, hasNextPage, isFetchingNextPage)

  const allInvitations = useMemo(() => {
    return (
      data?.pages
        .flatMap((page) => page.invitations)
        .filter((invitation) => invitation != null) || []
    )
  }, [data])

  // 검색 필터링
  const filteredInvitations = useMemo(() => {
    if (!searchQuery.trim()) {
      return allInvitations
    }

    const query = searchQuery.toLowerCase().trim()
    return allInvitations.filter((invitation) => {
      const dashboardTitle = invitation.dashboard.title.toLowerCase()
      const inviterName = invitation.inviter.nickname.toLowerCase()
      return dashboardTitle.includes(query) || inviterName.includes(query)
    })
  }, [allInvitations, searchQuery])

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="space-y-24">
        {/* 검색창 스켈레톤 */}
        <div className="mobile-wide:h-36 h-40 animate-pulse rounded-8 bg-gray-200" />

        {/* 테이블 헤더 */}
        <div className="mobile-wide:hidden grid grid-cols-3 items-center gap-20 pl-36 pr-32">
          <span className="text-16 font-medium text-gray-400">이름</span>
          <span className="text-center text-16 font-medium text-gray-400">
            초대자
          </span>
          <span className="text-center text-16 font-medium text-gray-400">
            수락 여부
          </span>
        </div>

        {/* 스켈레톤 행들 */}
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="mobile-wide:rounded-8 mobile-wide:bg-gray-50 mobile-wide:p-16 mobile-wide:mb-12 grid grid-cols-3 items-center gap-20 border-b border-gray-100 py-20 pl-36 pr-32"
          >
            <div className="h-20 animate-pulse rounded-4 bg-gray-200" />
            <div className="h-20 animate-pulse rounded-4 bg-gray-200" />
            <div className="h-20 animate-pulse rounded-4 bg-gray-200" />
          </div>
        ))}
      </div>
    )
  }

  // 에러 상태
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-60">
        <p className="mobile-wide:text-12 text-16 font-medium text-red-500">
          초대받은 대시보드를 불러오는 중 오류가 발생했습니다.
        </p>
        <p className="mobile-wide:text-10 mt-8 text-14 text-gray-500">
          {error?.message || '다시 시도해주세요.'}
        </p>
      </div>
    )
  }

  // 빈 상태
  if (allInvitations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-60">
        <div className="mobile-wide:size-60 relative mb-24 h-100 w-100">
          <Image
            src="/images/unsubscribe.svg"
            alt="초대받은 대시보드 없음"
            fill
            className="object-contain"
          />
        </div>
        <p className="Text-gray-light mobile-wide:text-12 text-16 font-medium">
          아직 초대받은 대시보드가 없어요.
        </p>
      </div>
    )
  }

  // 성공 상태 - 테이블 표시
  return (
    <div className="space-y-24">
      {/* 검색창 */}
      <SearchInput value={searchQuery} onChange={setSearchQuery} />

      {/* 테이블 헤더 - 모바일에서 숨김 */}
      <div className="mobile-wide:hidden grid grid-cols-3 items-center gap-20 pl-36 pr-32">
        <span className="Text-gray-light text-16 font-normal">이름</span>
        <span className="Text-gray-light text-center text-16 font-normal">
          초대자
        </span>
        <span className="Text-gray-light text-center text-16 font-normal">
          수락 여부
        </span>
      </div>

      {/* 테이블 바디 */}
      <div className="mobile-wide:space-y-0">
        {searchQuery.trim() && filteredInvitations.length === 0 ? (
          // 검색 결과 없음
          <div className="flex flex-col items-center justify-center py-60">
            <p className="Text-gray-light mobile-wide:text-12 text-16 font-medium">
              `{searchQuery}`에 대한 검색 결과가 없습니다.
            </p>
          </div>
        ) : (
          // 검색 결과 표시
          filteredInvitations.map((invitation) => (
            <InvitedDashboardRow key={invitation.id} invitation={invitation} />
          ))
        )}
      </div>

      {/* 무한 스크롤 로딩 인디케이터 - 검색 중에는 표시 안함 */}
      {!searchQuery.trim() && isFetchingNextPage && (
        <div className="flex justify-center py-20">
          <div className="size-32 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
        </div>
      )}

      {/* 더 이상 데이터가 없을 때 */}
      {!hasNextPage && allInvitations.length > 0 && (
        <div className="py-20 text-center">
          <p className="Text-gray-light mobile-wide:text-10 text-14 font-normal">
            모든 초대를 확인했습니다.
          </p>
        </div>
      )}
    </div>
  )
}
