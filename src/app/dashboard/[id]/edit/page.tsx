'use client'

import { showError, showSuccess } from '@lib/toast'

export default function DashBoardEditPage() {
  const handleSuccess = () => {
    showSuccess('대시보드가 성공적으로 저장되었습니다.')
  }

  const handleError = () => {
    showError('저장 중 오류가 발생했습니다.')
  }

  return (
    <div className="space-y-4 p-6">
      <p className="text-xl font-semibold">대시보드 수정 페이지</p>

      <div className="flex gap-4">
        <button onClick={handleSuccess}>성공 토스트</button>
        <button onClick={handleError}>에러 토스트</button>
      </div>
    </div>
  )
}
