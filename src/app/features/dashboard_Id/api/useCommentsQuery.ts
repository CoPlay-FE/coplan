import { useQuery } from '@tanstack/react-query'

import { CommentsResponse } from '../type/Comment.type'
import { fetchComments } from './fetchComments'

export default function useCommentsQuery(cardId: number) {
  return useQuery<CommentsResponse>({
    queryKey: ['comments', cardId],
    queryFn: () => fetchComments(cardId),
  })
}
