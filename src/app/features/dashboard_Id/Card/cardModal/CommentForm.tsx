import { useForm } from 'react-hook-form'

import { usePostCommentMutation } from '../../api/usePostCommentMutation'
import { CommentFormData } from '../../type/CommentFormData.type'

export default function CommentForm({
  cardId,
  columnId,
  dashboardId,
}: {
  cardId: number
  columnId: number
  dashboardId: number
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CommentFormData>({
    mode: 'onChange',
  })

  // 폼 제출 핸들러 함수
  const { mutate: createComment, isPending } = usePostCommentMutation()

  function onSubmit(data: CommentFormData) {
    const payload = {
      ...data,
      cardId,
      columnId,
      dashboardId,
    }
    console.log(payload)
    createComment(payload)
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-24 w-450 mobile:w-295 tablet:w-420"
    >
      <label
        htmlFor={'content'}
        className="Text-black mb-4 text-16 font-medium"
      >
        댓글
      </label>
      <div className="relative">
        <textarea
          {...register('content', {
            required: '댓글 내용을 작성해주세요',
          })}
          className="Text-black h-110 w-full resize-none rounded-6 border border-[#D9D9D9] p-16 text-14 placeholder-gray-400 dark:border-[#747474]"
          id="content"
          placeholder="댓글 작성하기"
        />

        <button
          type="submit"
          className="Text-blue absolute bottom-19 right-12 h-32 w-83 rounded-4 border border-[#D9D9D9] py-7 text-center text-12 font-medium dark:border-[#747474]"
        >
          입력
        </button>
      </div>
    </form>
  )
}
