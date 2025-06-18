'use client'

import CloseCircleIcon from '@components/common/CloseCircleIcon/CloseCircleIcon'
import PlusIcon from '@components/common/PlusIcon/PlusIcon'
import WhitePenIcon from '@components/common/WhitePenIcon/WhitePenIcon'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface Props {
  value: string | null // RHF에서 연결된 이미지 URL 상태 (미리보기용)
  onChange: (url: string | null) => void // RHF 필드 상태 변경 함수
  onFileChange?: (file: File) => void // 실제 업로드할 파일을 상위에서 처리할 수 있게 전달
}

export default function ProfileImageUpload({
  value,
  onChange,
  onFileChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  // RHF나 상위 컴포넌트로부터 받은 value가 바뀌면 미리보기를 갱신
  useEffect(() => {
    setPreview(value)
  }, [value])

  // 파일이 선택되었을 때 처리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const url = URL.createObjectURL(file) // 로컬 미리보기 URL 생성
    setPreview(url)
    onChange(url) // RHF 상태 업데이트

    // 서버 업로드용 파일을 상위로 전달
    if (onFileChange) onFileChange(file)

    // 같은 파일 다시 선택할 수 있도록 초기화
    if (inputRef.current) inputRef.current.value = ''
  }

  // 이미지 삭제 처리
  const handleDelete = () => {
    if (preview) URL.revokeObjectURL(preview) // 메모리 누수 방지
    setPreview(null)
    onChange(null) // RHF 상태 초기화
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="relative size-182 basis-182">
      {/* 파일 선택 트리거 역할 */}
      <label
        htmlFor="userProfile"
        className="BG-gray group relative flex size-full cursor-pointer items-center justify-center overflow-hidden rounded-lg"
      >
        {preview ? (
          <>
            {/* hover 시 연필 아이콘 */}
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
              <WhitePenIcon size={30} />
            </div>
            {/* 이미지 미리보기 */}
            <Image
              src={preview}
              alt="프로필 미리보기"
              fill
              className="z-0 object-cover"
            />
          </>
        ) : (
          // 아무 이미지도 없을 때 Plus 아이콘 표시
          <PlusIcon className="Text-blue" />
        )}
      </label>

      {/* 미리보기가 있을 때 삭제 버튼 표시 */}
      {preview && (
        <button
          type="button"
          onClick={handleDelete}
          className="absolute right-5 top-5 z-20 opacity-50 hover:opacity-100"
        >
          <CloseCircleIcon className="Text-gray" />
        </button>
      )}

      <input
        id="userProfile"
        type="file"
        accept="image/*"
        className="hidden"
        ref={inputRef}
        onChange={handleChange}
      />
    </div>
  )
}
