'use client'

import { useEffect, useState } from 'react'

import api from '../lib/axios'
import { DashboardListResponse } from '../types/dashboard'

export function useDashboard() {
  const [dashboards, setDashboards] = useState<
    DashboardListResponse['dashboards']
  >([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboards = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await api.get<DashboardListResponse>(
        `/${process.env.NEXT_PUBLIC_TEAM_ID}/dashboards?navigationMethod=infiniteScroll`,
      )
      setDashboards(response.data.dashboards)
    } catch (err) {
      console.error('대시보드 목록 조회 실패:', err)
      setError('대시보드 목록을 불러오는데 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboards()
  }, [])

  return { dashboards, isLoading, error, refetch: fetchDashboards }
}
