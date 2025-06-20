import { useQuery } from '@tanstack/react-query'

import authHttpClient from '@/app/shared/lib/axios'

export function useFirstDashboardIdQuery() {
  return useQuery({
    queryKey: ['firstDashboardId'],
    // 임시로 작성
    queryFn: async () => {
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
    select: (data) => data.dashboards?.[0].id ?? null,
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  })
}
