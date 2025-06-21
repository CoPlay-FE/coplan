'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()

  return (
    <>
      <div>
        <button
          className="flex cursor-pointer items-center gap-12 p-16"
          type="button"
          onClick={() => router.back()}
        >
          <Image src="/images/back.png" alt="돌아가기" width={8} height={4} />
          <p>돌아가기</p>
        </button>
      </div>
    </>
  )
}
