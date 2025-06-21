export interface Column {
  id: number
  title: string
  teamId: string
  dashboardId: number
  createdAt: string
  updatedAt: string
}
export interface ColumnsResponse {
  result: string // "SUCCESS"
  data: Column[]
}

// 컬럼 생성 요청 (POST body)
export interface CreateColumnRequest {
  title: string
  dashboardId: number
}

// 컬럼 생성 응답 (POST response)
export interface CreateColumnResponse {
  id: number
  title: string
  teamId: string
  createdAt: string
  updatedAt: string
}

// 컬럼 수정 요청 (PUT body)
export interface UpdateColumnRequest {
  title: string
}

// 컬럼 수정 응답 (PUT response)
export interface UpdateColumnResponse {
  id: number
  title: string
  teamId: string
  createdAt: string
  updatedAt: string
}

// 훅에서 사용할 변수 타입들
export interface UpdateColumnVariables {
  columnId: number
  title: string
  dashboardId: number // 캐시 무효화용
}

export interface DeleteColumnVariables {
  columnId: number
  dashboardId: number
}

// 컬럼 모달용 데이터 타입
export interface ColumnModalData {
  columnId?: number
  columnTitle?: string
  dashboardId: number
}
