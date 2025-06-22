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
    <div className="BG-gray px-4 pb-16 sm:px-8 md:px-16">
      {/* 돌아가기 버튼 */}
      <button
        className="flex cursor-pointer items-center gap-12 pt-16"
        type="button"
        onClick={() => router.back()}
      >
        <Image src="/images/back.png" alt="돌아가기" width={6} height={4} />
        <p className="text-14">돌아가기</p>
      </button>

      {/* 콘텐츠 영역 */}
      <div className="mobile-sm:max-w-full mt-8 flex w-full flex-col gap-16 pl-16 sm:max-w-[460px] md:max-w-[500px]">
        <EditInfo />
        <EditMember />
        <EditInvitation />
      </div>

      {/* 삭제 버튼 영역 */}
      <div className="BG-white Text-btn ml-18 mt-18 flex justify-center rounded-md py-6 sm:max-w-[292px]">
        <DeleteDashboardButton dashboardId={String(id)} />
      </div>
    </div>
  )
}
