'use client'

import Input from '@components/Input'
import { cn } from '@lib/cn'
import { useForm } from 'react-hook-form'

import { useLoginMutaion } from '../hooks/useLoginMutaion'
import { loginValidation } from '../schemas/loginValidation'
import { LoginRequest } from '../types/auth.type'

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginRequest>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { mutate: loginMutate, isPending } = useLoginMutaion()

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
      <Input
        labelName="비밀번호"
        type="password"
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
          isValid && !isSubmitting && !isPending
            ? 'BG-blue'
            : 'BG-blue-disabled',
        )}
        disabled={!isValid || isSubmitting || isPending}
      >
        {isPending ? '로그인 중..' : '로그인'}
      </button>
    </form>
  )
}
