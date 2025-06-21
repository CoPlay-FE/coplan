'use client'

import Image from 'next/image'
import { useState } from 'react'

import { useMyDashboards } from '../../hooks/useMyDashboards'
import AddDashboardCard from './AddDashboardCard'
import MyDashboardCard from './MyDashboardCard'

export default function MyDashboardGrid() {
  // 현재 페이지 상태 관리
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  // 대시보드 조회
  const { data, isLoading, isError, error } = useMyDashboards(
    currentPage,
    pageSize,
  )

  // 로딩
  if (isLoading) {
    return (
      <section className="mb-40">
        <div className="flex max-w-[1020px] flex-wrap gap-12">
          {/* 새 대시보드 추가 버튼은 항상 표시 */}
          <AddDashboardCard />

          {/* 로딩 스켈레톤*/}
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-70 w-332 animate-pulse rounded-8 bg-gray-200"
            />
          ))}
        </div>
      </section>
    )
  }

  // 에러
  if (isError) {
    return (
      <section className="mb-40">
        <div className="flex flex-col items-center justify-center p-40">
          <p className="Text-red text-16 font-medium">
            대시보드를 불러오는 중 오류가 발생했습니다.
          </p>
          <p className="Text-gray-light mt-8 text-14">
            {error?.message || '다시 시도해주세요.'}
          </p>
        </div>
      </section>
    )
  }

  // 성공
  const dashboards = data?.dashboards || []
  const totalCount = data?.totalCount || 0
  const totalPages = Math.ceil(totalCount / pageSize)

  return (
    <section className="mb-40">
      <div className="flex max-w-[1020px] flex-wrap gap-12">
        {/* 새 대시보드 추가 카드는 항상 첫 번째 고정 */}
        <AddDashboardCard />

        {/* 대시보드 카드 */}
        {dashboards.map((dashboard) => (
          <MyDashboardCard
            key={`mydash-${dashboard.id}`}
            dashboard={dashboard}
          />
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="mt-24 flex max-w-[1020px] items-center justify-end gap-12">
          <span className="Text-black text-14 font-normal">
            {currentPage} 페이지 중 {totalPages}
          </span>

          <div className="flex">
            {/* 이전 페이지 버튼 */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="flex size-40 items-center justify-center rounded-l-4 border border-gray-300 bg-white transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Image
                src="/images/arrow.svg"
                alt="이전 페이지"
                width={16}
                height={16}
                className="rotate-180"
              />
            </button>

            {/* 다음 페이지 버튼 */}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="flex size-40 items-center justify-center rounded-r-4 border border-l-0 border-gray-300 bg-white transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Image
                src="/images/arrow.svg"
                alt="다음 페이지"
                width={16}
                height={16}
              />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
