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

      {/* 컨텐츠 박스: 기본 너비 500px, 화면 작으면 100% 최대 500px */}
      <div className="mx-auto ml-16 flex flex-col gap-16 p-16 sm:max-w-full sm:px-4">
        <EditInfo />
        <EditMember />
        <EditInvitation />
      </div>

      {/* 삭제 버튼 영역: 기본 너비 292px, 화면 작으면 100% 최대 292px, 좌측 margin 제거 */}
      <div className="BG-white align-center Text-btn i8 ml-16 mt-8 flex max-w-292 justify-center rounded-md px-16 py-6">
        <DeleteDashboardButton dashboardId={String(id)} />
      </div>
    </div>
  )
}
