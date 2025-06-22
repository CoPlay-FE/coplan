import authHttpClient from '@api/axios'
import { useQuery } from '@tanstack/react-query'

import { useAuthStore } from '@/app/features/auth/store/useAuthStore'

import { DashboardListResponse } from '../types/dashboard'

export function useFirstDashboardIdQuery() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn) // ✅ 상태 직접 가져옴

  return useQuery<DashboardListResponse, Error, number>({
    queryKey: ['firstDashboardId'],
    enabled: isLoggedIn, // ✅ 로그인 상태일 때만 실행됨
    queryFn: async (): Promise<DashboardListResponse> => {
      const response = await authHttpClient.get(
        `/${process.env.NEXT_PUBLIC_TEAM_ID}/dashboards`,
        {
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
