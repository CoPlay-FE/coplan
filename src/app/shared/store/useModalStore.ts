// store/useModalStore.ts
import { create } from 'zustand'

import { ModalState } from '@/types/modal'

export const useModalStore = create<ModalState>((set) => ({
  modalType: null,
  openModal: (type) => set({ modalType: type }),
  closeModal: () => set({ modalType: null }),
}))
