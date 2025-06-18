import api from '@lib/axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { DASHBOARD_COLORS } from '@/app/shared/constants/colors'
import { CreateDashboardRequest } from '@/app/shared/types/dashboard'

export default function EditInfo() {
  const router = useRouter()
  const [formData, setFormData] = useState<CreateDashboardRequest>({
    title: '',
    color: DASHBOARD_COLORS[0],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  /// 입력값 변경 처리
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

      const response = await api.post(
        `/${process.env.NEXT_PUBLIC_TEAM_ID}/dashboards`,
        formData,
      )

      const data = response.data

      // 성공 시 대시보드 상세 페이지로 이동
      router.push(`/dashboard/${data.id}`)
    } catch (error) {
      console.error('대시보드 생성 오류:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {/* 컨테이너 */}
      <div className="BG-white h-300 w-584 rounded-16 px-32 py-24">
        <h2 className="Text-black mb-24 text-18 font-bold">새로운 대시보드</h2>

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
