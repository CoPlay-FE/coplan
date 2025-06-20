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
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // 색상 선택 핸들러
  function handleColorSelect(color: string) {
    setFormData((prev) => ({ ...prev, color }))
  }

  // 제출 핸들러
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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

      setSelectedDashboard(data)
      await queryClient.invalidateQueries({ queryKey: ['dashboards'] })

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
      <div className="BG-white h-300 w-584 rounded-16 px-32 py-24">
        <h2 className="Text-black mb-24 text-18 font-bold">
          {selectedDashboard?.title || '대시보드 편집'}
        </h2>

        <form onSubmit={handleSubmit}>
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
