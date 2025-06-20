// hooks/useDashboardForm.ts
import api from '@lib/axios'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { DASHBOARD_COLORS } from '@/app/shared/constants/colors'
import { useSelectedDashboardStore } from '@/app/shared/store/useSelectedDashboardStore'
import { CreateDashboardRequest } from '@/app/shared/types/dashboard'

type Mode = 'create' | 'edit'

export function useDashboardForm(mode: Mode) {
  const router = useRouter()
  const { selectedDashboard, setSelectedDashboard } =
    useSelectedDashboardStore()

  const [formData, setFormData] = useState<CreateDashboardRequest>({
    title: '',
    color: DASHBOARD_COLORS[0],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 수정 모드일 때 초기값 설정
  useEffect(() => {
    if (mode === 'edit' && selectedDashboard) {
      setFormData({
        title: selectedDashboard.title,
        color: selectedDashboard.color,
      })
    }
  }, [mode, selectedDashboard])

  // 대시보드 생성 모달 폼 초기화
  const resetForm = () => {
    setFormData({
      title: '',
      color: DASHBOARD_COLORS[0],
    })
    setIsSubmitting(false)
  }

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // 색상 선택 핸들러
  const handleColorSelect = (color: string) => {
    setFormData((prev) => ({ ...prev, color }))
  }

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.title || !formData.color) return

    try {
      setIsSubmitting(true)

      const teamId = process.env.NEXT_PUBLIC_TEAM_ID
      if (!teamId) {
        throw new Error('NEXT_PUBLIC_TEAM_ID 환경변수가 없습니다.')
      }

      if (mode === 'create') {
        const response = await api.post(`/${teamId}/dashboards`, formData)
        router.push(`/dashboard/${response.data.id}`)
      } else if (mode === 'edit' && selectedDashboard?.id) {
        const response = await api.put(
          `/${teamId}/dashboards/${selectedDashboard.id}`,
          formData,
        )
        const data = response.data
        setSelectedDashboard(data)
        router.push(`/dashboard/${data.id}/edit`)
      }
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message ||
          '대시보드 요청 중 오류가 발생했습니다.'
        : '알 수 없는 오류가 발생했습니다.'
      alert(message)
      console.error('대시보드 오류:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    formData,
    isSubmitting,
    handleChange,
    handleColorSelect,
    handleSubmit,
    resetForm,
    selectedDashboard,
  }
}
