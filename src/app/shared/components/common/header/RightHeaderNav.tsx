'use client'

import { useModalStore } from '@store/useModalStore'
import { useSelectedDashboardStore } from '@store/useSelectedDashboardStore'

import NavItem from './NavItem'

export default function RightHeaderNav() {
  const { openModal } = useModalStore()
  const { selectedDashboard } = useSelectedDashboardStore()

  return (
    <nav className="Text-black hidden gap-6 whitespace-nowrap text-sm md:flex">
      <NavItem
        as="link"
        href={`/dashboard/${selectedDashboard?.id}/edit`}
        iconSrc="/images/config.svg"
        label="관리"
      />
      <NavItem
        as="button"
        onClick={() => openModal('invite')}
        iconSrc="/images/invitation.png"
        label="초대하기"
      />
    </nav>
  )
}
