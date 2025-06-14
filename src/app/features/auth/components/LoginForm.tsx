'use client'

import Input from '@components/Input'
import { cn } from '@lib/cn'
import { useForm, useWatch } from 'react-hook-form'

import { useLoginSubmit } from '../hooks/useLoginSubmit'
import { loginValidation } from '../schemas/loginValidation'
import { LoginRequest } from '../types/auth.type'

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<LoginRequest>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { handleSubmit: submitLogin } = useLoginSubmit()
  const watch = useWatch({ control })
  const allFilled = watch.email?.trim() !== '' && watch.password?.trim() !== ''
  const showEmailError = !!errors.email
  const showPasswordError = !!errors.password

  return (
    <form className="flex flex-col gap-16" onSubmit={handleSubmit(submitLogin)}>
      <Input
        labelName="이메일"
        type="email"
        placeholder="이메일 입력"
        autoComplete="email"
        {...register('email', loginValidation.email)}
        hasError={showEmailError}
        errorMessage={errors.email?.message}
      />
      <Input
        labelName="비밀번호"
        type="password"
        placeholder="비밀번호 입력"
        autoComplete="off"
        {...register('password', loginValidation.password)}
        hasError={showPasswordError}
        errorMessage={errors.password?.message}
      />
      <button
        type="submit"
        className={cn(
          'mt-8 h-50 w-full rounded-8 text-white',
          allFilled ? 'BG-blue' : 'BG-blue-disabled',
        )}
        disabled={!allFilled || isSubmitting}
      >
        제출하기
      </button>
    </form>
  )
}
