'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import api from '@/app/shared/lib/axios'
import { useModalStore } from '@/app/shared/store/useModalStore'
import { CreateDashboardRequest } from '@/app/shared/types/dashboard'

const DASHBOARD_COLORS = ['#10B981', '#8B5CF6', '#F59E0B', '#3B82F6', '#EC4899']

export default function CreateDashboardModal() {
  const router = useRouter()
  const { createDashboardModalOpen, closeCreateDashboardModal } =
    useModalStore()

  const [formData, setFormData] = useState<CreateDashboardRequest>({
    title: '',
    color: DASHBOARD_COLORS[0],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!createDashboardModalOpen) {
      setFormData({ title: '', color: DASHBOARD_COLORS[0] })
      setIsSubmitting(false)
    }
  }, [createDashboardModalOpen])

  if (!createDashboardModalOpen) {
    return null
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.title || !formData.color) {
      return
    }
    try {
      setIsSubmitting(true)

      const response = await api.post(`/dashboards`, formData)

      const data = response.data

      // 성공 시 대시보드 상세 페이지로 이동
      router.push(`/dashboard/${data.id}`)
      closeCreateDashboardModal()
    } catch (error) {
      console.error('대시보드 생성 오류:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // 입력값 변경 처리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // 색상 선택 처리
  const handleColorSelect = (color: string) => {
    setFormData((prev) => ({ ...prev, color }))
  }

  // 모달 외부 클릭 시 닫기
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeCreateDashboardModal()
    }
  }

  return (
    // 모달 백드롭
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      {/* 모달 컨테이너 */}
      <div className="BG-white h-344 w-584 rounded-16 p-32">
        <h2 className="Text-black mb-24 text-24 font-bold">새로운 대시보드</h2>

        <form onSubmit={handleSubmit}>
          {/* 제목 입력 */}
          <div className="mb-24">
            <label htmlFor="title" className="Text-black mb-8 block text-18">
              대시보드 이름
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="대시보드 이름을 입력해주세요."
              className="Border-section w-full rounded-8 px-12 py-10 text-16 outline-none"
              required
            />
          </div>

          {/* 색상 선택 */}
          <div className="mb-32">
            <div className="flex gap-8">
              {DASHBOARD_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleColorSelect(color)}
                  className="relative flex size-30 items-center justify-center rounded-full"
                  style={{ backgroundColor: color }}
                  aria-label={`색상 ${color}`}
                >
                  {/* 선택된 색상 체크 */}
                  {formData.color === color && (
                    <div className="relative size-24 items-center justify-center">
                      <Image
                        src="/images/check.svg"
                        alt="check"
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 하단 버튼 */}
          <div className="flex justify-end gap-10">
            <button
              type="button"
              onClick={closeCreateDashboardModal}
              className="Border-btn Text-black h-54 w-256 rounded-8 px-16 py-10 text-16 font-semibold"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={!formData.title || !formData.color || isSubmitting}
              className={`BG-violet h-54 w-256 rounded-8 px-16 py-10 text-16 font-semibold text-white transition-opacity ${
                !formData.title || !formData.color || isSubmitting
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
