import { create } from 'zustand'

import { Card } from '../type/Card'
//여기 드래깅카드 인터페이스도 생략가능할듯(카드만 받게 되었으니까.. 근데 유지보수 고려해서남겨둘까)
interface draggingCard {
  cardData: Card
}
interface DragStore {
  draggingCard: draggingCard | null
  setDraggingCard: (data: { cardData: Card }) => void
  clearDraggingCard: () => void
}
export const useDragStore = create<DragStore>((set) => ({
  draggingCard: null,
  setDraggingCard: (data) => set({ draggingCard: data }),
  clearDraggingCard: () => set({ draggingCard: null }),
}))
