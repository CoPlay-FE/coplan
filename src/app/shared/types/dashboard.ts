// 사이드바용 대시보드 타입
export interface Dashboard {
  id: number
  title: string
  color: string
  createdAt: string
  updatedAt: string
  createdByMe: boolean
  userId: number
}

// 대시보드 목록 조회 응답
export interface DashboardListResponse {
  cursorId: number
  totalCount: number
  dashboards: Dashboard[]
}

// 사이드바 컴포넌트 Props
export interface DashboardItemProps {
  dashboard: Dashboard
  isActive?: boolean
  onClick: (dashboardId: number) => void
}

export interface CreateDashboardButtonProps {
  onClick: () => void
}

// 대시보드 생성 요청 타입
export interface CreateDashboardRequest {
  title: string
  color: string
}

// 대시보드 생성 모달
export interface ModalState {
  createDashboardModalOpen: boolean
  openCreateDashboardModal: () => void
  closeCreateDashboardModal: () => void
}
