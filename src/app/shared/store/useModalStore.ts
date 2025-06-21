// store/useModalStore.ts
import { create } from 'zustand'

import { ModalState } from '@/types/modal'

export const useModalStore = create<ModalState>((set) => ({
  modalType: 'none',
  openModal: (type) => set({ modalType: type }),
  closeModal: () => set({ modalType: 'none' }),
}))
