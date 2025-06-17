import { SignupFormData } from '../types/auth.type'

export function useConfirmPasswordValidation(getValues: () => SignupFormData) {
  return {
    required: '비밀번호를 한번 더 입력해 주세요.',
    validate: (value: string) => {
      const password = getValues().password
      return value === password || '비밀번호가 일치하지 않습니다'
    },
  }
}
