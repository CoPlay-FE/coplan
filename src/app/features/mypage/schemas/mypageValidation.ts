export const mypageValidation = {
  nickname: {
    pattern: {
      value: /^[a-zA-Z가-힣]{1,10}$/,
      message: '한글 또는 영어만 입력할 수 있으며, 최대 10자까지 가능합니다.',
    },
  },
  password: {
    required: '비밀번호를 입력해 주세요.',
    minLength: {
      value: 8,
      message: '8자 이상 입력해 주세요.',
    },
  },
}
