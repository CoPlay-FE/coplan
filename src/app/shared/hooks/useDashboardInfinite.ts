'use client'

import api from '@lib/axios'
import { useInfiniteQuery } from '@tanstack/react-query'

import { DashboardListResponse } from '@/app/shared/types/dashboard'

/**
 * 사이드바용 대시보드 목록 무한스크롤 훅 (pagination 방식)
 * @param size - 한번에 가져올 대시보드 개수 (기본값: 10)
 */
export const useDashboardsInfinite = (size: number = 10) => {
  return useInfiniteQuery({
    queryKey: ['dashboards', 'infinite', 'pagination', size],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      if (!process.env.NEXT_PUBLIC_TEAM_ID) {
        throw new Error('NEXT_PUBLIC_TEAM_ID 환경변수가 설정되지 않았습니다.')
      }

      const params = new URLSearchParams({
        navigationMethod: 'pagination',
        size: size.toString(),
        page: pageParam.toString(),
      })

      const res = await api.get<DashboardListResponse>(
        `/${process.env.NEXT_PUBLIC_TEAM_ID}/dashboards?${params.toString()}`,
      )

      return res.data
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length
      const totalPages = Math.ceil(lastPage.totalCount / size)

      if (currentPage < totalPages && lastPage.dashboards.length > 0) {
        return currentPage + 1
      }

      return null
    },
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  })
}
