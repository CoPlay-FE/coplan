import authHttpClient from '@/app/shared/lib/axios'
import {
  DashboardListResponse,
  InvitationListResponse,
} from '@/app/shared/types/dashboard'

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

  const response = await authHttpClient.get(`/${TEAM_ID}/dashboards?${params}`)
  return response.data
}

/**
 * 초대받은 대시보드 목록 조회
 * @param size - 페이지 크기
 * @param cursorId - 커서 ID
 */
export const getInvitedDashboards = async (
  size: number = 10,
  cursorId?: number,
): Promise<InvitationListResponse> => {
  const params = new URLSearchParams({
    navigationMethod: 'infiniteScroll',
    size: size.toString(),
  })

  if (cursorId) {
    params.append('cursorId', cursorId.toString())
  }

  const response = await authHttpClient.get(`/${TEAM_ID}/invitations?${params}`)
  return response.data
}

/**
 * 초대 수락/거절
 * @param invitationId - 초대 ID
 * @param accept - 수락 여부 (true: 수락, false: 거절)
 */
export const respondToInvitation = async (
  invitationId: number,
  accept: boolean,
): Promise<void> => {
  await authHttpClient.put(`/${TEAM_ID}/invitations/${invitationId}`, {
    inviteAccepted: accept,
  })
}
