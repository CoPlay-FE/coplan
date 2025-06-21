import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { AuthState } from '../types/auth.type'

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      isLoggedIn: false,
      setAccessToken: (token) => set({ accessToken: token, isLoggedIn: true }),
      setUser: (user) => set({ user: user }),
      clearAuthState: () =>
        set({ accessToken: null, user: null, isLoggedIn: false }),
    }),
    {
      name: 'auth-storage',
    },
  ),
)
