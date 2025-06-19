// hooks/useDashboard.ts
'use client'

import { useQuery } from '@tanstack/react-query'

import api from '@/app/shared/lib/axios'
import { DashboardListResponse } from '@/app/shared/types/dashboard'

export const useDashboard = () => {
  return useQuery({
    queryKey: ['dashboards'], // 대시보드 목록에 대한 고유 캐시 키
    queryFn: async () => {
      if (!process.env.NEXT_PUBLIC_TEAM_ID) {
        throw new Error('NEXT_PUBLIC_TEAM_ID 환경변수가 설정되지 않았습니다.')
      }

      const res = await api.get<DashboardListResponse>(
        `/${process.env.NEXT_PUBLIC_TEAM_ID}/dashboards?navigationMethod=infiniteScroll`,
      )

      return res.data.dashboards
    },
    staleTime: 1000 * 60, // 1분간은 stale 처리 안함
  })
}
