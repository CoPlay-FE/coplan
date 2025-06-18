'use client'

import { useCallback, useEffect, useState } from 'react'

import authHttpClient from '../lib/axios'
import { DashboardListResponse } from '../types/dashboard'

export function useDashboard() {
  const [dashboards, setDashboards] = useState<
    DashboardListResponse['dashboards']
  >([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboards = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      if (!process.env.NEXT_PUBLIC_TEAM_ID) {
        throw new Error('NEXT_PUBLIC_TEAM_ID 환경변수가 설정되지 않았습니다.')
      }

      const response = await authHttpClient.get<DashboardListResponse>(
        `/${process.env.NEXT_PUBLIC_TEAM_ID}/dashboards?navigationMethod=infiniteScroll`,
      )
      setDashboards(response.data.dashboards)
    } catch (err) {
      console.error('대시보드 목록 조회 실패:', err)
      setError('대시보드 목록을 불러오는데 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDashboards()
  }, [fetchDashboards])

  return { dashboards, isLoading, error, refetch: fetchDashboards }
}
