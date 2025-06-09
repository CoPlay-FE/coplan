// store/useUserStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { User } from '../types/user.type'

interface UserState {
  user: User | null
  accessToken: string | null
  setUser: (user: User, accessToken: string) => void
  logout: () => void // clearUser와 동일
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setUser: (user, accessToken) => set({ user, accessToken }),
      logout: () => set({ user: null, accessToken: null }),
    }),
    {
      name: 'user-storage',
    },
  ),
)
