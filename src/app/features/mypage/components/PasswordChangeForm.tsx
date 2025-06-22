import PasswordInput from '@components/common/Input/PasswordInput'
import { cn } from '@lib/cn'
import { showSuccess } from '@lib/toast'
import { useChangePasswordMutation } from '@mypage/hook/useChangePasswordMutation'
import { PasswordChangeRequest } from '@mypage/types/mypage.type'
import { getNewPasswordValidation } from '@mypage/util/getNewPasswordValidation'
import { getConfirmPasswordValidation } from '@util/getConfirmPasswordValidation'
import { useForm } from 'react-hook-form'

interface PasswordChangeFormData extends PasswordChangeRequest {
  confirmPassword: string
}

export default function PasswordChangeForm() {
  if (!process.env.NEXT_PUBLIC_TEAM_ID) {
    throw new Error('NEXT_PUBLIC_TEAM_ID 환경변수가 설정되지 않았습니다.')
  }
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm<PasswordChangeFormData>({
    mode: 'onBlur',
    defaultValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const { mutate: changePassword, isPending } = useChangePasswordMutation()
  const newPasswordValidation = getNewPasswordValidation(() =>
    getValues('password'),
  )
  const confirmPasswordValidation = getConfirmPasswordValidation(() =>
    getValues('newPassword'),
  )

  function onSubmit(data: PasswordChangeFormData) {
    changePassword(
      {
        password: data.password,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          reset()
          showSuccess('비밀번호가 성공적으로 변경되었습니다!')
        },
      },
    )
  }

  return (
    <div className="BG-white flex h-auto w-full max-w-672 flex-col gap-24 rounded-8 p-24">
      <h2 className="text-2xl font-bold">비밀번호 변경</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between gap-16"
      >
        <PasswordInput
          labelName="현재 비밀번호"
          type="password"
          placeholder="비밀번호 입력"
          autoComplete="current-password"
          {...register('password')}
        />

        <PasswordInput
          labelName="새 비밀번호"
          type="password"
          placeholder="새 비밀번호 입력"
          autoComplete="new-password"
          {...register('newPassword', {
            ...newPasswordValidation,
            onBlur: () => {
              trigger('confirmPassword')
            },
          })}
          hasError={!!errors.newPassword}
          errorMessage={errors.newPassword?.message}
        />

        <PasswordInput
          labelName="새 비밀번호 확인"
          type="password"
          placeholder="새 비밀번호 입력"
          autoComplete="new-password"
          {...register('confirmPassword', {
            ...confirmPasswordValidation,
            onBlur: () => {
              trigger('newPassword')
            },
          })}
          hasError={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message}
        />

        <button
          type="submit"
          className={cn(
            'mt-8 h-50 w-full rounded-8 text-lg font-medium text-white',
            isValid && !isPending ? 'BG-blue' : 'BG-blue-disabled',
          )}
          disabled={!isValid || isPending}
        >
          {isPending ? '변경 중..' : '변경'}
        </button>
      </form>
    </div>
  )
}
