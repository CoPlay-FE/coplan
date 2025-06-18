export interface CardFormData {
  title: string
  description: string
  dueDate: Date | null
  tags: string[]
  imgaeUrl: string

  assigneeUserId: number
  dashboardId: number
  columnId: number
}
