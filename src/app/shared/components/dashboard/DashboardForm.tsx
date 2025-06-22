'use client'

import Input from '@components/common/Input/Input'
import Image from 'next/image'
import React from 'react'

import { DASHBOARD_COLORS } from '@/app/shared/constants/colors'

type DashboardFormProps = {
  formData: { title: string; color: string }
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onColorSelect: (color: string) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isSubmitting: boolean
  submitText: string
  submitButtonWidth?: string
  showCancelButton?: boolean
  onCancel?: () => void
}

export default function DashboardForm({
  formData,
  onChange,
  onColorSelect,
  onSubmit,
  isSubmitting,
  submitText,
  submitButtonWidth = 'w-256',
  showCancelButton = false,
  onCancel,
}: DashboardFormProps) {
  return (
    <form onSubmit={onSubmit}>
      {/* 제목 */}
      <div className="mb-24 text-16">
        <Input
          labelName="대시보드 이름"
          name="title"
          value={formData.title}
          onChange={onChange}
          placeholder="대시보드 이름을 입력해주세요."
          required
        />
      </div>

      {/* 색상 */}
      <div className="mb-32">
        <div className="flex gap-8">
          {DASHBOARD_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => onColorSelect(color)}
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

      {/* 버튼 */}
      <div className="flex justify-end gap-10">
        {showCancelButton && (
          <button
            type="button"
            onClick={onCancel}
            className="Border-btn Text-black w-256 rounded-8 px-16 py-10 text-16 font-semibold"
          >
            취소
          </button>
        )}
        <button
          type="submit"
          disabled={!formData.title || !formData.color || isSubmitting}
          className={`BG-violet h-48 ${submitButtonWidth} rounded-8 px-16 py-10 text-16 font-semibold text-white transition-opacity ${
            !formData.title || !formData.color || isSubmitting
              ? 'cursor-not-allowed opacity-50'
              : 'hover:opacity-90'
          }`}
        >
          {submitText}
        </button>
      </div>
    </form>
  )
}
