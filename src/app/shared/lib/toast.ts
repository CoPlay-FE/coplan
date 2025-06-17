import { toast } from 'sonner'

export const showSuccess = (message: string) => toast.success(message)
export const showError = (message: string) => toast.error(message)
export const showInfo = (message: string) => toast.message(message) // 성공, 실패가 아닌 정보
