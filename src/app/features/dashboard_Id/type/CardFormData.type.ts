export interface CardFormData {
  title: string
  description: string
  dueDate: Date | null
  tags: string[]
  imageUrl: string | null
  assigneeUserId: number
  dashboardId: number
  columnId: number
}
