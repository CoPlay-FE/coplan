//size일단 10으로 하고, 나중에 커서아이디 받아서 무한 스크롤 구현해야 함.
import { useQuery } from '@tanstack/react-query'

import axiosClient from './axiosClient'

export interface Assignee {
  id: number
  nickname: string
  profileImageUrl: string | null
}
export interface Card {
  id: number
  title: string
  description: string
  tags: string[]
  dueDate: string
  assignee: Assignee
  imageUrl: string
  teamId: string
  dashboardId: number
  columnId: number
  createdAt: string
  updatedAt: string
}
export interface CardResponse {
  cards: Card[]
  totalCount: number
  cursorId: number
}

export async function fetchCards(
  columnId: number,
  size: number = 10,
): Promise<CardResponse> {
  const res = await axiosClient.get<CardResponse>(
    `/cards?size=${size}&columnId=${columnId}`,
  )
  return res.data
}

export default function useCards(columnId: number) {
  return useQuery<CardResponse>({
    queryKey: ['columnId', columnId],
    queryFn: () => fetchCards(columnId),
  })
}
