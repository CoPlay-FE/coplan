// null은 타입이 다르기 때문에 'none'으로 처리
type ModalType = 'invite' | 'createDashboard' | 'none'

export type ModalState = {
  modalType: ModalType
  openModal: (type: ModalType) => void
  closeModal: () => void
}
