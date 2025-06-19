export interface CardFormData {
  assigneeUserId: number
  dashboardId: number
  columnId: number
  title: string
  description: string
  dueDate?: string
  tags: string[]
  // imageUrl?: string
  imageUrl?: string
}
export interface SubmitCardFormData {
  assigneeUserId: number
  dashboardId: number
  columnId: number
  title: string
  description: string
  dueDate: string
  tags: string[]
  imageUrl: string | null
}
