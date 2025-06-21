import { create } from 'zustand'

type ColumnModalType = 'create' | 'edit' | 'deleteConfirm' | null

interface ColumnModalData {
  columnId?: number
  columnTitle?: string
  dashboardId: number
}

interface ColumnModalState {
  modalType: ColumnModalType
  modalData: ColumnModalData | null
  openModal: (type: ColumnModalType, data: ColumnModalData) => void
  closeModal: () => void
}

export const useColumnModalStore = create<ColumnModalState>((set) => ({
  modalType: null,
  modalData: null,
  openModal: (type, data) => set({ modalType: type, modalData: data }),
  closeModal: () => set({ modalType: null, modalData: null }),
}))
