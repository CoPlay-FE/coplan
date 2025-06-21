'use client'

import { useEffect, useState } from 'react'

import useColumns from '../api/useColumns'
import { useCreateColumn } from '../hooks/useCreateColumn'
import { useColumnModalStore } from '../store/useColumnModalStore'

export default function CreateColumnModal() {
  const { modalType, modalData, closeModal } = useColumnModalStore()
  const isModalOpen = modalType === 'create'

  const [title, setTitle] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 기존 컬럼 목록 가져오기 (중복 체크용)
  const { data: columns } = useColumns(modalData?.dashboardId || 0)
  const createColumnMutation = useCreateColumn()

  useEffect(() => {
    if (!isModalOpen) {
      setTitle('')
      setIsSubmitting(false)
    }
  }, [isModalOpen])

  if (!isModalOpen) {
    return null
  }

  // 중복 컬럼명 체크
  const isDuplicate = columns?.some(
    (column) => column.title.toLowerCase() === title.toLowerCase(),
  )

  // 컬럼 최대 개수 체크 (10개)
  const isMaxColumns = columns && columns.length >= 10

  // 에러 메시지 표시 여부에 따른 높이 계산
  const hasError = isDuplicate || isMaxColumns
  const modalHeight = hasError ? 'h-286 mobile:h-280' : 'h-266 mobile:h-258'

  // 생성 버튼 활성화 조건
  const isCreateDisabled =
    !title.trim() || isDuplicate || isMaxColumns || isSubmitting

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!title.trim() || isDuplicate || isMaxColumns) {
      return
    }

    if (!modalData?.dashboardId) {
      return
    }

    try {
      setIsSubmitting(true)

      await createColumnMutation.mutateAsync({
        title: title.trim(),
        dashboardId: modalData.dashboardId,
      })

      closeModal()
    } catch (error) {
      // 에러는 useCreateColumn에서 toast로 처리됨
    } finally {
      setIsSubmitting(false)
    }
  }

  // 입력값 변경 처리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
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
      {/* 모달 컨테이너 - 에러 메시지에 따른 동적 높이 */}
      <div
        className={`BG-white ${modalHeight} mobile:w-327 mobile:px-16 mobile:py-24 w-568 rounded-8 p-24`}
      >
        <h2 className="Text-black mobile:text-20 mb-24 text-24 font-bold">
          새 컬럼 생성
        </h2>

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
              placeholder="새로운 프로젝트"
              className={`mobile:text-14 w-full rounded-8 px-12 py-10 text-16 outline-none ${
                hasError ? 'Border-error' : 'Border-section'
              }`}
              maxLength={30}
              autoFocus
              required
            />

            {/* 에러 메시지 표시 */}
            {isDuplicate && (
              <p className="Text-error mobile:text-12 mt-8 text-14">
                중복된 컬럼 이름입니다
              </p>
            )}
            {isMaxColumns && (
              <p className="Text-error mobile:text-12 mt-8 text-14">
                컬럼은 최대 10개까지 생성 가능합니다
              </p>
            )}
          </div>

          {/* 하단 버튼 */}
          <div className="flex justify-end gap-10">
            <button
              type="button"
              onClick={closeModal}
              className="Border-btn Text-black mobile:w-144 h-54 w-256 rounded-8 px-16 py-10 text-16 font-semibold"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isCreateDisabled}
              className={`BG-violet mobile:w-144 h-54 w-256 rounded-8 px-16 py-10 text-16 font-semibold text-white transition-opacity ${
                isCreateDisabled
                  ? 'cursor-not-allowed opacity-50'
                  : 'hover:opacity-90'
              }`}
            >
              생성
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
