export function getConfirmPasswordValidation(getPasswordValue: () => string) {
  return {
    required: '비밀번호를 한번 더 입력해 주세요.',
    validate: (value: string) =>
      value === getPasswordValue() || '비밀번호가 일치하지 않습니다',
  }
}
