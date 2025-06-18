import api from '@/app/shared/lib/axios'

import { CardResponse } from '../type/Card.type'
type CardPayload = {
  assigneeUserId: number
  dashboardId: number
  columnId: number
  title: string
  description: string
  dueDate: string
  tags: string[]
  imageUrl: string
}

export async function postCard(payload: CardPayload): Promise<void> {
  const res = await api.post(
    `/${process.env.NEXT_PUBLIC_TEAM_ID}/cards`,
    payload,
  )
  return res.data
}
