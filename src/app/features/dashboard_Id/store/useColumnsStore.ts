import { create } from 'zustand'

export interface SimpleColumn {
  columnId: number
  columnTitle: string
}
interface ColumnsStore {
  ColumnsInDashboard: SimpleColumn[]
  setColumns: (data: SimpleColumn[]) => void
}

// 카드 수정 모달에서 사용하는 가공된 컬럼 데이터
// page.tsx의 useEffect에서 초기 설정됨
export const useColumnsStore = create<ColumnsStore>((set) => ({
  ColumnsInDashboard: [],
  setColumns: (data) => set({ ColumnsInDashboard: data }),
}))
