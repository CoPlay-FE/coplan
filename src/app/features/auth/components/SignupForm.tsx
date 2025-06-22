'use client'

import Input from '@components/common/Input/Input'
import PasswordInput from '@components/common/Input/PasswordInput'
import { cn } from '@lib/cn'
import { getConfirmPasswordValidation } from '@util/getConfirmPasswordValidation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useSignupMutation } from '../hooks/useSignupMutation'
import { signupValidation } from '../schemas/signupValidation'
import { SignupFormData } from '../types/auth.type'

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      confirmPassword: '',
    },
  })

  const [isChecked, setIsChecked] = useState(false)
  const { mutate: signupMtate, isPending } = useSignupMutation()
  const validation = getConfirmPasswordValidation(() => getValues('password'))

  function handleAgree() {
    setIsChecked((prev) => !prev)
  }

  return (
    <form
      className="flex w-full flex-col gap-16"
      onSubmit={handleSubmit(({ email, nickname, password }) =>
        signupMtate({ email, nickname, password }),
      )}
    >
      <Input
        labelName="이메일"
        type="email"
        placeholder="이메일을 입력해 주세요"
        autoComplete="email"
        {...register('email', signupValidation.email)}
        hasError={!!errors.email}
        errorMessage={errors.email?.message}
      />
      <Input
        labelName="닉네임"
        type="text"
        placeholder="닉네임을 입력해 주세요"
        autoComplete="off"
        {...register('nickname', signupValidation.nickname)}
        hasError={!!errors.nickname}
        errorMessage={errors.nickname?.message}
      />
      <PasswordInput
        labelName="비밀번호"
        placeholder="8자 이상 입력해 주세요"
        autoComplete="new-password"
        {...register('password', {
          ...signupValidation.password,
          onChange: () => trigger('confirmPassword'),
        })}
        hasError={!!errors.password}
        errorMessage={errors.password?.message}
      />
      <PasswordInput
        labelName="비밀번호 확인"
        placeholder="비밀번호를 한번 더 입력해주세요"
        autoComplete="new-password"
        {...register('confirmPassword', validation)}
        hasError={!!errors.confirmPassword}
        errorMessage={errors.confirmPassword?.message}
      />
      <div className="flex items-center gap-8">
        <input
          type="checkbox"
          id="terms"
          className="size-16 rounded-4"
          onChange={handleAgree}
          checked={isChecked}
        />
        <label className="text-base" htmlFor="terms">
          이용약관에 동의합니다.
        </label>
      </div>
      <button
        type="submit"
        className={cn(
          'mt-8 h-50 w-full rounded-8 text-lg font-medium text-white',
          isValid && isChecked && !isPending ? 'BG-blue' : 'BG-blue-disabled',
        )}
        disabled={isPending || !isValid || !isChecked}
      >
        {isPending ? '처리 중..' : '회원가입'}
      </button>
    </form>
  )
}
