export const mypageValidation = {
  nickname: {
    pattern: {
      value: /^[a-zA-Z가-힣]{1,10}$/,
      message: '한글 또는 영어만 입력할 수 있으며, 최대 10자까지 가능합니다.',
    },
  },
}
