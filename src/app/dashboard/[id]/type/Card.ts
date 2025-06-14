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
