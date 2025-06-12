import { create } from 'zustand'

interface DragStore {
  draggingCard: { cardId: number; columnId: number } | null
  setDraggingCard: (data: { cardId: number; columnId: number }) => void
  clearDraggingCard: () => void
}
export const useDragStore = create<DragStore>((set) => ({
  draggingCard: null,
  setDraggingCard: (data) => set({ draggingCard: data }),
  clearDraggingCard: () => set({ draggingCard: null }),
}))
