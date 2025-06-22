'use client'

import EditInfo from '@dashboard/components/edit/EditInfo'
import EditInvitation from '@dashboard/components/edit/EditInvitation'
import EditMember from '@dashboard/components/edit/EditMember'
import { useParams } from 'next/navigation'

import DeleteDashboardButton from '@/app/features/dashboard/components/edit/DeleteDashboardButton'
import BackButton from '@/app/shared/components/common/BackButton/BackButton'

export default function DashBoardEditPage() {
  const { id } = useParams()

  return (
    <div>
      <BackButton />

      {/* 콘텐츠 영역 */}
      <div className="relative z-10 flex max-w-full flex-col gap-16">
        <EditInfo />
        <EditMember />
        <EditInvitation />
      </div>

      {/* 삭제 버튼 영역 */}
      <div className="BG-white Text-btn mt-18 flex max-w-292 justify-center rounded-md py-6">
        <DeleteDashboardButton dashboardId={String(id)} />
      </div>
    </div>
  )
}
