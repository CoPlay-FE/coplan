import Input from '@components/Input'
import { useConfirmPasswordValidation } from '@hooks/useConfirmPasswordValidation'
import { cn } from '@lib/cn'
import { useForm } from 'react-hook-form'

import { showSuccess } from '@/app/shared/lib/toast'

import { useChangePasswordMutation } from '../hook/useChangePasswordMutation'
import { useNewPasswordValidation } from '../hook/useNewPasswordValidation'
import { PasswordChangeRequest } from '../types/mypage.type'

interface PasswordChangeFormData extends PasswordChangeRequest {
  confirmPassword: string
}

export default function PasswordChangeForm() {
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
  const newPasswordValidation = useNewPasswordValidation(() =>
    getValues('password'),
  )
  const confirmPasswordValidation = useConfirmPasswordValidation(() =>
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
        <Input
          labelName="현재 비밀번호"
          type="password"
          placeholder="비밀번호 입력"
          autoComplete="current-password"
          {...register('password')}
        />

        <Input
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

        <Input
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
