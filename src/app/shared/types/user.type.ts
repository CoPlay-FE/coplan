export interface User {
  id: number
  name: string
  email: string
  avatarUrl?: string // optional
  role?: 'user' | 'admin' // optional 예시
  createdAt?: string // optional ISO date string
  updatedAt?: string // optional ISO date string
}
