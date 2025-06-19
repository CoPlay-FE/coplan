'use client'

import api from '@lib/axios'
import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { DASHBOARD_COLORS } from '@/app/shared/constants/colors'
import { useSelectedDashboardStore } from '@/app/shared/store/useSelectedDashboardStore'
import { CreateDashboardRequest } from '@/app/shared/types/dashboard'

export default function EditInfo() {
  const router = useRouter()
  const { selectedDashboard, setSelectedDashboard } =
    useSelectedDashboardStore()
  const queryClient = useQueryClient()

  const [formData, setFormData] = useState<CreateDashboardRequest>({
    title: '',
    color: DASHBOARD_COLORS[0],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // selectedDashboard가 있을 때 formData 초기화
  useEffect(() => {
    if (selectedDashboard) {
      setFormData({
        title: selectedDashboard.title,
        color: selectedDashboard.color,
      })
    }
  }, [selectedDashboard])

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

  // 제출 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.title || !formData.color) return

    try {
      setIsSubmitting(true)

      if (!process.env.NEXT_PUBLIC_TEAM_ID || !selectedDashboard?.id) {
        throw new Error('필수 정보가 누락되었습니다.')
      }

      const response = await api.put(
        `/${process.env.NEXT_PUBLIC_TEAM_ID}/dashboards/${selectedDashboard.id}`,
        formData,
      )

      const data = response.data

      // 1. 상태 업데이트 (헤더, 수정정보 실시간 반영)
      setSelectedDashboard(data)

      // 2. react-query 캐시 무효화 → Sidebar 목록 재요청 유도
      await queryClient.invalidateQueries({ queryKey: ['dashboards'] })

      // 성공 시 상세 페이지 이동
      router.push(`/dashboard/${data.id}/edit`)
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          '대시보드 수정 중 오류가 발생했습니다.'
        console.error('대시보드 수정 오류:', message)
        alert(message)
      } else {
        console.error('대시보드 수정 오류:', error)
        alert('알 수 없는 오류가 발생했습니다.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {/* 컨테이너 */}
      <div className="BG-white h-300 w-584 rounded-16 px-32 py-24">
        <h2 className="Text-black mb-24 text-18 font-bold">
          {selectedDashboard?.title || '대시보드 편집'}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* 제목 입력 */}
          <div className="mb-16">
            <label htmlFor="title" className="Text-black mb-8 block text-16">
              대시보드 이름
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="대시보드 이름을 입력해주세요."
              className="Border-section w-512 rounded-8 px-12 py-10 text-16 outline-none"
              required
            />
          </div>

          {/* 색상 선택 */}
          <div className="mb-30">
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
                  {/* 선택된 색상에 체크 표시 */}
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
          <div>
            <button
              type="submit"
              disabled={!formData.title || !formData.color || isSubmitting}
              className={`BG-violet h-48 w-512 rounded-8 px-16 py-10 text-16 font-semibold text-white transition-opacity ${
                !formData.title || !formData.color || isSubmitting
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
