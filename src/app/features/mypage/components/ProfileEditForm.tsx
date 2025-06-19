'use client'

import Input from '@components/Input'
import { showError, showSuccess } from '@lib/toast'
import { isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { useUpdateMyProfileMutation } from '../hook/useUpdateMyProfileMutation'
import { useUploadProfileImageMutation } from '../hook/useUploadProfileImageMutation'
import { useUserQuery } from '../hook/useUserQurey'
import { mypageValidation } from '../schemas/mypageValidation'
import ProfileImageUpload from './ProfileImageUpload'

interface ProfileFormData {
  profileImageUrl: string | null
  nickname: string
  email: string
}

export default function ProfileEditForm() {
  const { data: user } = useUserQuery() // get으로 사용자 데이터 최신화
  const router = useRouter() // useClientQuery를 사용 하여 해당 부분에만 렌더링을 진행하려 했으나 다른 부분도 연동되는 부분이 있기 때문에 라우터 사용
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    mode: 'onChange',
    defaultValues: {
      profileImageUrl: user?.profileImageUrl,
      nickname: user?.nickname,
      email: user?.email,
    },
  })

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null)
  const { mutateAsync: uploadImage } = useUploadProfileImageMutation()
  const { mutateAsync: updateProfile } = useUpdateMyProfileMutation()

  // 유저 정보가 비동기적으로 넘어오기 때문에 유저가 로딩된 시점에서 RHF을 초기화 하기 위함 (SSR 도입 시 변경 예정)
  useEffect(() => {
    if (user) {
      reset({
        profileImageUrl: user.profileImageUrl ?? null,
        nickname: user.nickname ?? '',
        email: user.email ?? '',
      })
    }
  }, [user, reset])

  async function onSubmit(data: ProfileFormData) {
    try {
      // 현재 이미지 URL을 초기값으로 설정 (변경이 없을 수도 있기 때문)
      let imageUrl = data.profileImageUrl

      // 새 이미지를 업로드한 경우 → 서버에 업로드 요청 (POST)
      if (profileImageFile) {
        const { profileImageUrl } = await uploadImage(profileImageFile)
        imageUrl = profileImageUrl
      }

      // 닉네임과 이미지 URL을 포함한 사용자 프로필 정보 생성
      const submitData = {
        nickname: data.nickname,
        profileImageUrl: imageUrl,
      }

      // 서버에 프로필 정보 수정 요청 (PUT)
      await updateProfile(submitData)

      // 사용자에게 성공 알림 + 컴포넌트 최신화
      showSuccess('프로필 변경이 완료되었습니다.')
      router.refresh()
    } catch (error) {
      if (isAxiosError(error)) {
        // 서버 에러 메시지 우선 처리, 없으면 기본 메시지
        const serverMessage = (
          error.response?.data as { message?: string } | undefined
        )?.message
        const fallback = error.message || '프로필 변경에 실패하였습니다.'
        showError(serverMessage ?? fallback)
      } else {
        showError('알 수 없는 에러 발생')
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="BG-white flex h-auto w-full max-w-672 flex-col gap-24 rounded-8 p-24 font-medium"
    >
      <h2 className="text-2xl font-bold">프로필</h2>

      <div className="flex justify-between gap-42 tablet:flex-col">
        <Controller
          name="profileImageUrl"
          control={control}
          render={({ field: { value, onChange } }) => (
            <ProfileImageUpload
              value={value} // 미리보기용 이미지 URL
              onChange={onChange} // form 상태(profileImageUrl) 업데이트
              onFileChange={(file) => setProfileImageFile(file)} // 서버 전송용 파일 저장
            />
          )}
        />

        <div className="flex flex-grow flex-col gap-16">
          <Input labelName="이메일" {...register('email')} readOnly />
          <Input
            labelName="닉네임"
            type="text"
            placeholder="닉네임을 입력해 주세요"
            autoComplete="off"
            {...register('nickname', mypageValidation.nickname)}
            hasError={!!errors.nickname}
            errorMessage={errors.nickname?.message}
          />
          <button
            type="submit"
            className="BG-blue h-50 w-full rounded-8 text-white"
          >
            저장
          </button>
        </div>
      </div>
    </form>
  )
}
