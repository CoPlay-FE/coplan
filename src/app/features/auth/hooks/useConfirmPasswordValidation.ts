import { SignupFormData } from '../types/auth.type'

export function useConfirmPasswordValidation(getValues: () => SignupFormData) {
  return {
    validate: (value: string) => {
      const password = getValues().password
      return value === password || '비밀번호가 일치하지 않습니다'
    },
  }
}
