import api from '@/app/shared/lib/axios'
import { DashboardListResponse } from '@/app/shared/types/dashboard'

const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID!

/**
 * 내 대시보드 목록 조회 (페이지네이션)
 * @param page - 페이지 번호 (1부터 시작)
 * @param size - 페이지 크기
 */
export const getMyDashboards = async (
  page: number = 1,
  size: number = 5,
): Promise<DashboardListResponse> => {
  const params = new URLSearchParams({
    navigationMethod: 'pagination',
    page: page.toString(),
    size: size.toString(),
  })

  const response = await api.get(`/${TEAM_ID}/dashboards?${params}`)
  return response.data
}
