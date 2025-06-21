'use client'

import { useEffect, useState } from 'react'

import useColumns from '../api/useColumns'
import { useUpdateColumn } from '../hooks/useUpdateColumn'
import { useColumnModalStore } from '../store/useColumnModalStore'

export default function EditColumnModal() {
  const { modalType, modalData, closeModal, openModal } = useColumnModalStore()
  const isModalOpen = modalType === 'edit'

  const [title, setTitle] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 기존 컬럼 목록 가져오기 (중복 체크용)
  const { data: columns } = useColumns(modalData?.dashboardId || 0)
  const updateColumnMutation = useUpdateColumn()

  useEffect(() => {
    if (!isModalOpen) {
      setTitle('')
      setIsSubmitting(false)
    } else if (modalData?.columnTitle) {
      setTitle(modalData.columnTitle)
    }
  }, [isModalOpen, modalData?.columnTitle])

  if (!isModalOpen) {
    return null
  }

  // 중복 컬럼명 체크 (현재 컬럼 제외)
  const isDuplicate = columns?.some(
    (column) =>
      column.title.toLowerCase() === title.toLowerCase() &&
      column.id !== modalData?.columnId,
  )

  // 변경 버튼 활성화 조건
  const isUpdateDisabled =
    !title.trim() ||
    isDuplicate ||
    title.trim() === modalData?.columnTitle || // 기존과 동일하면 비활성화
    isSubmitting

  // 에러 메시지 표시 여부에 따른 높이 계산
  const modalHeight = isDuplicate ? 'h-290 mobile:h-280' : 'h-270 mobile:h-258'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isUpdateDisabled) {
      return
    }

    if (!modalData?.dashboardId || !modalData?.columnId) {
      return
    }

    try {
      setIsSubmitting(true)

      await updateColumnMutation.mutateAsync({
        columnId: modalData.columnId,
        title: title.trim(),
        dashboardId: modalData.dashboardId,
      })

      closeModal()
    } catch (error) {
      // 에러는 useUpdateColumn에서 toast로 처리됨
    } finally {
      setIsSubmitting(false)
    }
  }

  // 입력값 변경 처리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  // 삭제 버튼 클릭 시 삭제 확인 모달로 전환
  const handleDeleteClick = () => {
    if (!modalData) {
      return
    }

    openModal('deleteConfirm', modalData)
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
      <div
        className={`BG-white ${modalHeight} mobile:w-327 mobile:px-16 mobile:py-24 w-568 rounded-16 p-24`}
      >
        {/* 헤더에 닫기 버튼 */}
        <div className="mb-24 flex items-center justify-between">
          <h2 className="Text-black mobile:text-20 text-24 font-bold">
            컬럼 관리
          </h2>
          <button
            type="button"
            onClick={closeModal}
            className="flex size-32 items-center justify-center"
          >
            <span className="text-24 text-gray-400">×</span>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* 제목 입력 */}
          <div className="mb-24">
            <label
              htmlFor="title"
              className="Text-black mobile:text-16 mb-8 block text-18"
            >
              이름
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={handleChange}
              placeholder="컬럼 이름을 입력하세요"
              className={`mobile:text-14 w-full rounded-8 px-12 py-10 text-16 outline-none ${
                isDuplicate ? 'Border-error' : 'Border-section'
              }`}
              maxLength={30}
              autoFocus
              required
            />

            {/* 에러 메시지 표시 */}
            {isDuplicate && (
              <p className="Text-error mobile:text-12 mt-8 text-14 font-normal">
                중복된 컬럼 이름입니다
              </p>
            )}
          </div>

          {/* 하단 버튼 */}
          <div className="flex items-center justify-between">
            {/* 왼쪽 삭제 버튼 */}
            <button
              type="button"
              onClick={handleDeleteClick}
              className="BG-white Border-btn Text-gray h-54 w-144 rounded-8 px-16 py-10 text-16 font-medium"
            >
              삭제
            </button>

            {/* 오른쪽 변경 버튼 */}
            <button
              type="submit"
              disabled={isUpdateDisabled}
              className={`BG-violet h-54 w-144 rounded-8 px-16 py-10 text-16 font-medium text-white transition-opacity ${
                isUpdateDisabled
                  ? 'cursor-not-allowed opacity-50'
                  : 'hover:opacity-90'
              }`}
            >
              변경
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
