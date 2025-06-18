'use client'

import EditInfo from '@dashboard/components/edit/EditInfo'
import EditInvitation from '@dashboard/components/edit/EditInvitation'
import EditMember from '@dashboard/components/edit/EditMember'
import { showError, showSuccess } from '@lib/toast'
import Image from 'next/image'

export default function DashBoardEditPage() {
  const handleSuccess = () => {
    showSuccess('대시보드가 성공적으로 수정되었습니다.')
  }

  const handleError = () => {
    showError('수정 중 오류가 발생했습니다.')
  }

  return (
    <div className="BG-gray">
      <div
        className="flex cursor-pointer items-center gap-12 p-16"
        onClick={() => window.history.back()}
      >
        <Image src="/images/back.png" alt="돌아가기" width={8} height={4} />
        <p>돌아가기</p>
      </div>
      <div className="flex w-500 flex-col gap-16 p-16">
        <EditInfo />
        <EditMember />
        <EditInvitation />
      </div>
      <button className="Text-btn Border-btn ml-16 rounded-md px-64 py-12">
        대시보드 삭제하기
      </button>
    </div>
  )
}
