'use client'

import EditInfo from '@dashboard/components/edit/EditInfo'
import EditInvitation from '@dashboard/components/edit/EditInvitation'
import EditMember from '@dashboard/components/edit/EditMember'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

import DeleteDashboardButton from '@/app/features/dashboard/components/edit/DeleteDashboardButton'

export default function DashBoardEditPage() {
  const { id } = useParams()
  const router = useRouter()

  return (
    <div className="BG-gray pb-16">
      <button
        className="flex cursor-pointer items-center gap-12 px-16 pt-16"
        type="button"
        onClick={() => router.back()}
      >
        <Image src="/images/back.png" alt="돌아가기" width={6} height={4} />
        <p className="text-14">돌아가기</p>
      </button>
      <div className="flex w-500 flex-col gap-16 p-16">
        <EditInfo />
        <EditMember />
        <EditInvitation />
      </div>

      {/* 삭제 버튼 영역 */}
      <div className="BG-white align-center Text-btn i8 ml-16 flex w-292 justify-center rounded-md px-64 py-6">
        <DeleteDashboardButton dashboardId={String(id)} />
      </div>
    </div>
  )
}
