import { create } from 'zustand'

import { Card } from '../type/Card'
interface draggingCard {
  columnId: number
  cardData: Card
}
interface DragStore {
  draggingCard: draggingCard | null
  setDraggingCard: (data: { columnId: number; cardData: Card }) => void
  clearDraggingCard: () => void
}
export const useDragStore = create<DragStore>((set) => ({
  draggingCard: null,
  setDraggingCard: (data) => set({ draggingCard: data }),
  clearDraggingCard: () => set({ draggingCard: null }),
}))
