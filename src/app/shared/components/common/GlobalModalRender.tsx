'use client'

import { useModalStore } from '@/app/shared/store/useModalStore'

import CreateDashboardModal from './modal/CreateDashboardModal'
import CreateInvitationModal from './modal/CreateInvitationModal'

export default function GlobalModalRenderer() {
  const { modalType } = useModalStore()

  if (modalType === 'invite') return <CreateInvitationModal />
  if (modalType === 'createDashboard') return <CreateDashboardModal />
  return null
}
