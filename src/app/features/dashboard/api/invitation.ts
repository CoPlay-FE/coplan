// src/app/features/dashboard/api/invitation.ts
import api from '@lib/axios'

type InvitationRequest = {
  email: string
  dashboardId: number | string
}

export const inviteUser = async ({ email, dashboardId }: InvitationRequest) => {
  const response = await api.post(
    `/${process.env.NEXT_PUBLIC_TEAM_ID}/dashboards/${dashboardId}/invitations`,
    {
      email,
    },
  )
  return response.data
}
