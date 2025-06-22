'use client'

import { useState } from 'react'

import { useDeleteColumn } from '../hooks/useDeleteColumn'
import { useColumnModalStore } from '../store/useColumnModalStore'

export default function DeleteColumnConfirmModal() {
  const { modalType, modalData, closeModal } = useColumnModalStore()
  const isModalOpen = modalType === 'deleteConfirm'

  const [isSubmitting, setIsSubmitting] = useState(false)
  const deleteColumnMutation = useDeleteColumn()

  if (!isModalOpen) {
    return null
  }

  const handleConfirmDelete = async () => {
    if (!modalData?.columnId || !modalData?.dashboardId) {
      return
    }

    try {
      setIsSubmitting(true)

      await deleteColumnMutation.mutateAsync({
        columnId: modalData.columnId,
        dashboardId: modalData.dashboardId,
      })

      closeModal()
    } catch (error) {
      // 에러는 useDeleteColumn에서 toast로 처리됨
    } finally {
      setIsSubmitting(false)
    }
  }

  // 모달 외부 클릭 시 닫기
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  return (
    // 모달 백드롭
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      {/* 모달 컨테이너 */}
      <div className="BG-white mobile:h-160 mobile:w-327 mobile:px-16 mobile:py-24 h-174 w-568 rounded-16 p-24">
        {/* 중앙 메시지 */}
        <div className="mb-32 text-center">
          <p className="Text-black mobile:text-16 text-20 font-medium">
            컬럼의 모든 카드가 삭제됩니다.
          </p>
        </div>

        {/* 하단 버튼들 */}
        <div className="flex items-center justify-between">
          {/* 왼쪽 취소 버튼 */}
          <button
            type="button"
            onClick={closeModal}
            disabled={isSubmitting}
            className="BG-white Border-btn Text-gray mobile:w-144 h-54 w-256 rounded-8 px-16 py-10 text-16 font-medium"
          >
            취소
          </button>

          {/* 오른쪽 삭제 버튼 */}
          <button
            onClick={handleConfirmDelete}
            disabled={isSubmitting}
            className={`BG-violet mobile:w-144 h-54 w-256 rounded-8 px-16 py-10 text-16 font-medium text-white transition-opacity ${
              isSubmitting
                ? 'cursor-not-allowed opacity-50'
                : 'hover:opacity-90'
            }`}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  )
}
