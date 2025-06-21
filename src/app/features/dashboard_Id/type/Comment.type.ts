export interface Auth {
  profileImageUrl: string
  nickname: string
  id: number
}
export interface Comment {
  id: number
  content: string
  createdAt: string
  updatedAt: string
  cardId: number
  author: Auth
}
export interface CommentsResponse {
  cursorId: number | null
  comments: Comment[] | []
}
