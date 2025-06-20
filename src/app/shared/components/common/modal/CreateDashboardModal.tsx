'use client'

import { DASHBOARD_COLORS } from '@constants/colors'
import authHttpClient from '@lib/axios'
import { useModalStore } from '@store/useModalStore'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { CreateDashboardRequest } from '@/types/dashboard'

import DashboardForm from '../../dashboard/DashboardForm'

export default function CreateDashboardModal() {
  const router = useRouter()
  const { modalType, closeModal } = useModalStore()
  const isModalOpen = modalType === 'createDashboard'

  const [formData, setFormData] = useState<CreateDashboardRequest>({
    title: '',
    color: DASHBOARD_COLORS[0],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isModalOpen) {
      setFormData({ title: '', color: DASHBOARD_COLORS[0] })
      setIsSubmitting(false)
    }
  }, [isModalOpen])

  if (!isModalOpen) {
    return null
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.title || !formData.color) {
      return
    }
    try {
      setIsSubmitting(true)

      if (!process.env.NEXT_PUBLIC_TEAM_ID) {
        throw new Error('NEXT_PUBLIC_TEAM_ID 환경변수가 설정되지 않았습니다.')
      }

      const response = await authHttpClient.post(
        `/${process.env.NEXT_PUBLIC_TEAM_ID}/dashboards`,
        formData,
      )

      const data = response.data

      // 성공 시 대시보드 상세 페이지로 이동
      router.push(`/dashboard/${data.id}`)
      closeModal()
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
      <div className="BG-white h-344 w-584 rounded-16 p-32">
        <h2 className="Text-black mb-24 text-24 font-bold">새로운 대시보드</h2>
        <DashboardForm
          formData={formData}
          onChange={handleChange}
          onColorSelect={handleColorSelect}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitText="생성"
          showCancelButton
          onCancel={closeModal}
        />
      </div>
    </div>
  )
}
