export interface Column {
  id: number
  title: string
  teamId: string
  dashboardId: number
  createdAt: string
  updatedAt: string
}
export interface ColumnsResponse {
  data: Column[]
}
