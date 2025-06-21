import { mypageValidation } from '../schemas/mypageValidation'

export function getNewPasswordValidation(getPasswordValue: () => string) {
  return {
    ...mypageValidation.password,
    validate: (value: string) => {
      if (value === getPasswordValue()) {
        return '현재 비밀번호와 동일한 비밀번호입니다.'
      }
      return true
    },
  }
}
