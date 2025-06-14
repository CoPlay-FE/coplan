'use client'

import Input from '@components/Input'
import { useForm } from 'react-hook-form'

interface FormData {
  email: string
  password: string
}

export default function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<FormData>({
    mode: 'onChange',
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* 이메일 */}
      <Input
        labelName="이메일"
        type="email"
        placeholder="이메일 입력"
        autoComplete="email"
        {...register('email', {
          required: '이메일을 입력해 주세요.',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: '유효한 이메일 주소를 입력해주세요',
          },
        })}
        hasError={touchedFields.email && !!errors.email}
        errorMessage={touchedFields.email ? errors.email?.message : ''}
      />

      {/* 비밀번호 */}
      <Input
        labelName="비밀번호"
        type="password"
        {...register('password', {
          required: '비밀번호를 입력해 주세요.',
          minLength: {
            value: 8,
            message: '비밀번호는 최소 8자 이상이어야 합니다.',
          },
        })}
        hasError={touchedFields.password && !!errors.password}
        errorMessage={touchedFields.password ? errors.password?.message : ''}
      />
      <Input labelName="안녕" name="text" />
      <button
        type="submit"
        className="mt-4 rounded bg-blue-500 py-2 text-white"
      >
        제출하기
      </button>
    </form>
  )
}
