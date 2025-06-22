'use client'

import BackButton from '@components/common/BackButton/BackButton'
import PasswordChangeForm from '@mypage/components/PasswordChangeForm'
import ProfileEditForm from '@mypage/components/ProfileEditForm'

export default function Mypage() {
  return (
    <>
      <div className="p-20 mobile-wide:p-10">
        {/* 헤더 영역 */}
        <section className="flex flex-col gap-16">
          {/* 뒤로 가기 버튼 */}
          <BackButton />
          {/* 닉네임 프로필 변경 */}
          <ProfileEditForm />
          {/* 비밀번호 변경 */}
          <PasswordChangeForm />
        </section>
      </div>
    </>
  )
}
