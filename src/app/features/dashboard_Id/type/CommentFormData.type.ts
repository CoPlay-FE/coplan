import { Auth } from './Comment.type'

export interface CommentFormData {
  content: string
  cardId: number
  columnId: number
  dashboardId: number
}
export interface CommentResponse {
  id: number
  content: string
  createdAt: number
  updatedAt: number
  cardId: number
  author: Auth
}

export interface PutCommentForm {
  content: string
}
