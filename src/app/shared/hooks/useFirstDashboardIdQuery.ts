import { useQuery } from '@tanstack/react-query'

import authHttpClient from '@/app/shared/lib/axios'

import { DashboardListResponse } from '../types/dashboard'

export function useFirstDashboardIdQuery() {
  return useQuery<DashboardListResponse, Error, number>({
    queryKey: ['firstDashboardId'],
    // 임시로 작성(대시보드 ID가 필요한데 해당 API 함수가 중복 될 가능성 고려)
    queryFn: async (): Promise<DashboardListResponse> => {
      const response = await authHttpClient.get(
        `/${process.env.NEXT_PUBLIC_TEAM_ID}/dashboards`,
        {
          // 필수 값만 호출
          params: {
            navigationMethod: 'infiniteScroll',
          },
        },
      )

      return response.data
    },
    // 첫 번째 ID 값만 호출
    select: (data) => data.dashboards?.[0]?.id ?? null,
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  })
}
