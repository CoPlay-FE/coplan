import { create } from 'zustand'
interface draggingCard {
  cardId: number
  columnId: number
}
interface DragStore {
  draggingCard: draggingCard | null
  setDraggingCard: (data: { cardId: number; columnId: number }) => void
  clearDraggingCard: () => void
}
export const useDragStore = create<DragStore>((set) => ({
  draggingCard: null,
  setDraggingCard: (data) => set({ draggingCard: data }),
  clearDraggingCard: () => set({ draggingCard: null }),
}))
