import { toast } from 'sonner'

import { useInfiniteComments } from '../../api/useInfiniteComments'
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll'
import { Comment as CommentType } from '../../type/Comment.type'
import Comment from './Comment'

export default function Comments({
  cardId,
  scrollRef,
}: {
  cardId: number
  scrollRef: React.RefObject<HTMLElement>
}) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteComments(cardId)

  useInfiniteScroll(fetchNextPage, hasNextPage, isFetchingNextPage, scrollRef)

  if (isError) {
    toast.error('댓글 불러오기 실패')
  }
  return (
    <>
      <div className="flex w-450 flex-col gap-20">
        {data?.pages.map((page) =>
          page?.comments.map((comment: CommentType) => (
            <Comment key={comment.id} comment={comment} />
          )),
        )}
      </div>
      {/* 무한 스크롤 관련 */}
      {isFetchingNextPage && (
        <p className="text-center text-sm text-gray-400">
          댓글을 불러오는 중...
        </p>
      )}
    </>
  )
}
