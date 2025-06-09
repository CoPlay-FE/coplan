//Colums id: 50923,50924,50925,50926
//나중에는 fetchColumns의 결과로 받은 컬럼 아이디를 모아서 넣어야할듯.
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

export async function fetchCards(columnId: number): Promise<CardResponse> {
  const res = await axiosClient.get<CardResponse>(
    `/7-6/cards?size=10&columnId=${columnId}`,
  )
  return res.data
}

export default function useCards(column: number) {
  return useQuery<CardResponse>({
    queryKey: ['columnId', column],
    queryFn: () => fetchCards(column),
  })
}
