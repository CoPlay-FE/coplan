import { useQuery } from '@tanstack/react-query'

import { getMyDashboards } from '../api/dashboardApi'

// 내 대시보드 목록 조회 훅
export const useMyDashboards = (page: number = 1, size = 5) => {
  return useQuery({
    queryKey: ['myDashboards', page, size],
    queryFn: () => getMyDashboards(page, size),
    staleTime: 1000 * 60 * 5, // 5분간 fresh 상태 유지
    gcTime: 1000 * 60 * 10, // 10분간 캐시 유지
    retry: 2,
    refetchOnWindowFocus: false, // 창 포커스 시 재요청 방지 -> 불필요한 API 호출 방지
  })
}
