'use client'

import DashboardForm from '@components/dashboard/DashboardForm'
import { useDashboardForm } from '@hooks/useDashboardForm'
import React from 'react'

export default function EditInfo() {
  const {
    formData,
    isSubmitting,
    handleChange,
    handleColorSelect,
    handleSubmit,
    selectedDashboard,
  } = useDashboardForm('edit')

  return (
    <div>
      <div className="BG-white max-w-584 rounded-16 px-32 py-24">
        <h2 className="Text-black mb-24 text-18 font-bold">
          {selectedDashboard?.title || '대시보드 편집'}
        </h2>

        <DashboardForm
          formData={formData}
          onChange={handleChange}
          onColorSelect={handleColorSelect}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitText="변경"
          submitButtonWidth="w-516"
        />
      </div>
    </div>
  )
}
