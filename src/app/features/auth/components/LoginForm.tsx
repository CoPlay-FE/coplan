'use client'

import Input from '@components/common/Input/Input'
import PasswordInput from '@components/common/Input/PasswordInput'
import { cn } from '@lib/cn'
import { useForm } from 'react-hook-form'

import { useLoginMutation } from '../hooks/useLoginMutation'
import { loginValidation } from '../schemas/loginValidation'
import { LoginRequest } from '../types/auth.type'

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginRequest>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { mutate: loginMutate, isPending } = useLoginMutation()

  return (
    <form
      className="flex w-full flex-col gap-16"
      onSubmit={handleSubmit((data) => loginMutate(data))}
    >
      <Input
        labelName="이메일"
        type="email"
        placeholder="이메일 입력"
        autoComplete="email"
        {...register('email', loginValidation.email)}
        hasError={!!errors.email}
        errorMessage={errors.email?.message}
      />
      <PasswordInput
        labelName="비밀번호"
        placeholder="비밀번호 입력"
        autoComplete="off"
        {...register('password', loginValidation.password)}
        hasError={!!errors.password}
        errorMessage={errors.password?.message}
      />
      <button
        type="submit"
        className={cn(
          'mt-8 h-50 w-full rounded-8 text-lg font-medium text-white',
          isValid && !isPending ? 'BG-blue' : 'BG-blue-disabled',
        )}
        disabled={!isValid || isPending}
      >
        {isPending ? '로그인 중..' : '로그인'}
      </button>
    </form>
  )
}
