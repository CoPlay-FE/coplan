import { useForm } from 'react-hook-form'

import { usePutCommentMutation } from '../../api/usePutCommentsMutation'
import { PutCommentForm } from '../../type/CommentFormData.type'

export default function CommentModifyForm({
  onClose,
  commentId,
  content,
}: {
  onClose: () => void
  commentId: number
  content: string
}) {
  const {
    register,
    handleSubmit,

    formState: { errors, isValid, isSubmitting },
  } = useForm<PutCommentForm>({
    defaultValues: {
      content: content,
    },
  })

  // 폼 제출 핸들러 함수
  const { mutate: createComment, isPending } = usePutCommentMutation()

  function onSubmit(data: PutCommentForm) {
    console.log(data)
    console.log(commentId)
    createComment({ payload: data, commentId }) //useMutation은 하나의 인자만 허용. 객체 하나로 묶어서 전달하는거 자꾸 까먹음..
    onClose()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex gap-10 mobile:flex-col"
    >
      <textarea
        {...register('content', {
          required: '댓글 내용을 작성해주세요',
        })}
        className="Text-black h-110 w-450 resize-none rounded-6 border border-[#D9D9D9] p-16 text-14 placeholder-gray-400 dark:border-[#747474] mobile:w-250 tablet:w-420"
        id="content"
        placeholder={content ? content : '댓글 작성하기'}
      />
      <div className="flex flex-col mobile:flex-row">
        <button
          type="button"
          className="Text-gray-light h-28 w-50 rounded-4 border border-[#D9D9D9] py-5 text-center text-12 font-medium dark:border-[#747474]"
          onClick={onClose}
        >
          취소
        </button>
        <button
          type="submit"
          className="Text-blue h-28 w-50 rounded-4 border border-[#D9D9D9] py-5 text-center text-12 font-medium dark:border-[#747474]"
        >
          수정
        </button>
      </div>
    </form>
  )
}
