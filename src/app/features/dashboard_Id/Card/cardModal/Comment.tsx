import { format } from 'date-fns'
import { useState } from 'react'

import { Avatar } from '@/app/shared/components/common/Avatar'
import { useIsMobile } from '@/app/shared/hooks/useIsmobile'

import { useDeleteCommentMutation } from '../../api/useDeleteCommentMutation'
import { Comment as CommentType } from '../../type/Comment.type'
import CommentModifyForm from './CommentModifyForm'

export default function Comment({ comment }: { comment: CommentType }) {
  const isMobile = useIsMobile()
  const [modifyComment, setModifyComment] = useState(false)
  const { mutate: deleteComment, isPending } = useDeleteCommentMutation()

  return (
    <div key={comment.id} className="flex gap-10 mobile:gap-8 tablet:gap-12">
      {isMobile ? (
        <Avatar
          size={24}
          name={comment.author.nickname}
          imageUrl={comment.author.profileImageUrl}
        />
      ) : (
        <Avatar
          size={32}
          name={comment.author.nickname}
          imageUrl={comment.author.profileImageUrl}
        />
      )}
      <div className="flex flex-col gap-4 mobile:w-250">
        <div className="flex items-center gap-8">
          <span className="Text-black inline-block text-14 font-semibold">
            {comment.author.nickname}
          </span>
          <span className="Text-gray-light inline-block text-12">
            {format(new Date(comment.createdAt), 'yyyy.MM.dd HH:mm')}
          </span>
        </div>
        {modifyComment ? (
          <CommentModifyForm
            onClose={() => setModifyComment(false)}
            commentId={comment.id}
            content={comment.content}
          />
        ) : (
          <p className="text-14">{comment.content}</p>
        )}
        {!modifyComment && (
          <div className="Text-gray-light active:Text-btn flex gap-14 text-12 font-normal underline underline-offset-2 mobile:gap-8 tablet:gap-12">
            <button onClick={() => setModifyComment(true)}>수정</button>
            <button onClick={() => deleteComment(comment.id)}>삭제</button>
          </div>
        )}
      </div>
    </div>
  )
}
