import { create } from 'zustand'

import { ModalState } from '../types/dashboard'

export const useModalStore = create<ModalState>((set) => ({
  // 초기 상태
  createDashboardModalOpen: false,

  // 모달 열기
  openCreateDashboardModal: () => set({ createDashboardModalOpen: true }),

  // 모달 닫기
  closeCreateDashboardModal: () => set({ createDashboardModalOpen: false }),
}))
