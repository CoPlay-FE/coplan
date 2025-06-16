import { Control, useWatch } from 'react-hook-form'

import { SignupFormData } from '../types/auth.type'

export function useConfirmPasswordValidation(control: Control<SignupFormData>) {
  const password = useWatch({
    control,
    name: 'password',
  })
  return {
    validate: (value: string) =>
      value === password || '비밀번호가 일치하지 않습니다',
  }
}
