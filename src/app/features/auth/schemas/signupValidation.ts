import { SignupFormData } from '../types/auth.type'

export const staticSignupValidation = {
  email: {
    required: '이메일을 입력해 주세요.',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: '유효한 이메일 주소를 입력해주세요',
    },
  },
  password: {
    required: '비밀번호를 입력해 주세요.',
    minLength: {
      value: 8,
      message: '비밀번호는 최소 8자 이상이어야 합니다.',
    },
  },
  nickname: {
    required: '닉네임을 입력해 주세요.',
    pattern: {
      value: /^[a-zA-Z가-힣]{1,10}$/,
      message: '한글 또는 영어만 입력할 수 있으며, 최대 10자까지 가능합니다.',
    },
  },
}

export function getConfirmPasswordValidation(
  watch: (field: keyof SignupFormData) => string,
) {
  return {
    required: '비밀번호 확인은 필수입니다.',
    validate: (value: string) =>
      value === watch('password') || '비밀번호가 일치하지 않습니다',
  }
}
