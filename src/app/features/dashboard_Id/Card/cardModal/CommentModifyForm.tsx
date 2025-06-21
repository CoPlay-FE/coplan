import { Form, useForm } from 'react-hook-form'

import { usePostCommentMutation } from '../../api/usePostCommentMutation'
import { usePutCommentMutation } from '../../api/usePutCommentsMutation'
import { PutCommentForm } from '../../type/CommentFormData.type'
import Input from '../cardFormModals/input/Input'

export default function CommentModifyForm({
  commentId,
  content,
}: {
  commentId: number
  content: string
}) {
  const {
    register,
    handleSubmit,
    setValue,
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
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-24 w-450">
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
          placeholder={content ? content : '댓글 작성하기'}
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
