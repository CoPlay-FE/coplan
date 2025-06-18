import api from '@/app/shared/lib/testAxios'

// import api from '@/app/shared/lib/axios'
import { CardFormData } from '../type/CardFormData.type'

// type CardPayload = {
//   assigneeUserId: number
//   dashboardId: number
//   columnId: number
//   title: string
//   description: string
//   dueDate: string
//   tags: string[]
//   imageUrl: string
// }
type ApiResponse = {
  message: string
}
export async function postCard(payload: CardFormData): Promise<ApiResponse> {
  const res = await api.post(
    `/${process.env.NEXT_PUBLIC_TEAM_ID}/cards`,
    payload,
  )
  return res.data
}
