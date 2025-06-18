type ModalType = 'invite' | 'createDashboard' | null

export type ModalState = {
  modalType: ModalType
  openModal: (type: ModalType) => void
  closeModal: () => void
}
