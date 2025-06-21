export interface Member {
  id: number
  email: string
  nickname: string
  profileImageUrl: string | null
  createdAt: string
  updatedAt: string
  isOwner: boolean
  userId: number
}
export interface MembersResponse {
  members: Member[]
  totalCount: number
}
