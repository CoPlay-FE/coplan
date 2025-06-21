export interface Auth {
  profileImageUrl: string
  nickname: string
  id: number
}
export interface Comment {
  id: number
  content: string
  createdAt: string
  updatedAt: number
  cardId: number
  author: Auth
}
export interface CommentsResponse {
  cursorId: number | null
  comments: Comment[] | []
}
