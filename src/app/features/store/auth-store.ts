import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthState } from '../types/auth'

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      isLoggedIn: false,
      setAccessToken: (token) => set({ accessToken: token, isLoggedIn: true }),
      setUser: (user) => set({ user: user }),
      logout: () => set({ accessToken: null, user: null, isLoggedIn: false }),
    }),
    {
      name: 'auth-storage',
    },
  ),
)
