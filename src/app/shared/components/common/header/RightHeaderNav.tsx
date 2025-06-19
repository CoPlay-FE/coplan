'use client'

import { useModalStore } from '@store/useModalStore'
import { useSelectedDashboardStore } from '@store/useSelectedDashboardStore'
import { usePathname } from 'next/navigation'

import NavItem from './NavItem'

export default function RightHeaderNav() {
  const pathname = usePathname()
  const { modalType, openModal } = useModalStore()
  const { selectedDashboard } = useSelectedDashboardStore()

  return (
    <nav className="Text-gray hidden gap-8 text-sm md:flex">
      <NavItem
        as="link"
        href={`/dashboard/${selectedDashboard?.id}/edit`}
        iconSrc="/images/management.png"
        label="관리"
        active={pathname.includes('/edit')}
      />
      <NavItem
        as="button"
        onClick={() => openModal('invite')}
        iconSrc="/images/invitation.png"
        label="초대하기"
        active={modalType === 'invite'}
      />
    </nav>
  )
}
