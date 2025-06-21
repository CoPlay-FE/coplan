'use client'

import { useColumnModalStore } from '../store/useColumnModalStore'
import CreateColumnModal from './CreateColumnModal'
import DeleteColumnConfirmModal from './DeleteColumnConfirmModal'
import EditColumnModal from './EditColumnModal'

export default function ColumnModalRenderer() {
  const { modalType } = useColumnModalStore()

  if (modalType === 'create') return <CreateColumnModal />
  if (modalType === 'edit') return <EditColumnModal />
  if (modalType === 'deleteConfirm') return <DeleteColumnConfirmModal />

  return null
}
