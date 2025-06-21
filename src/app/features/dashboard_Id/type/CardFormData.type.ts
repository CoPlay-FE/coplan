export interface CardModifyFormData {
  columnId: number
  assigneeUserId: number
  title: string
  description: string
  dueDate?: string
  tags: string[]
  imageUrl?: string
}

export interface CardFormData extends CardModifyFormData {
  dashboardId: number
}
