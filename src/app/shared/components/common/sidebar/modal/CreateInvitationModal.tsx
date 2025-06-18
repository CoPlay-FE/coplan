'use client'

import { useModalStore } from '@store/useModalStore'
import { useState } from 'react'

export default function CreateInvitationModal() {
  const { isModalOpen, closeModal } = useModalStore()
  const [email, setEmail] = useState('')

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return

    // TODO: 이메일 초대 API 연동
    console.log('초대 이메일:', email)
    closeModal()
  }

  if (!isModalOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="BG-white h-auto w-584 rounded-16 p-32">
        <h2 className="Text-black mb-24 text-24 font-bold">초대하기</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-32">
            <label htmlFor="email" className="Text-black mb-8 block text-18">
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="초대 이메일을 입력해주세요."
              className="Border-section w-full rounded-8 px-12 py-10 text-16 outline-none"
              required
            />
          </div>

          <div className="flex justify-end gap-10">
            <button
              type="button"
              onClick={closeModal}
              className="Border-btn Text-black h-54 w-256 rounded-8 px-16 py-10 text-16 font-semibold"
            >
              취소
            </button>
            <button
              type="submit"
              className={`BG-violet h-54 w-256 rounded-8 px-16 py-10 text-16 font-semibold text-white hover:opacity-90`}
            >
              초대
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
