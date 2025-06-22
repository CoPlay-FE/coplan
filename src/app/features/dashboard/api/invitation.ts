// src/app/features/dashboard/api/invitation.ts
import authHttpClient from '@api/axios'

type InvitationRequest = {
  email: string
  dashboardId: number | string
}

export const inviteUser = async ({ email, dashboardId }: InvitationRequest) => {
  const response = await authHttpClient.post(
    `/${process.env.NEXT_PUBLIC_TEAM_ID}/dashboards/${dashboardId}/invitations`,
    {
      email,
    },
  )
  return response.data
}
