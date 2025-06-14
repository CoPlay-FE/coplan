export const loginValidation = {
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
}
