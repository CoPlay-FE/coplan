import { format } from 'date-fns'
import { useState } from 'react'

import { Avatar } from '@/app/shared/components/common/Avatar'

import useCommentsQuery from '../../api/useCommentsQuery'
import { Comment as CommentType } from '../../type/Comment.type'
import Comment from './Comment'

export default function Comments({ cardId }: { cardId: number }) {
  const { data, isLoading, error } = useCommentsQuery(cardId)
  const comments = data?.comments

  //   if (isLoading) return <p>loading...</p>
  //   if (error) return <p>error...{error.message}</p>

  return (
    <div className="flex w-450 flex-col gap-20">
      {comments?.map((comment: CommentType) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  )
}
