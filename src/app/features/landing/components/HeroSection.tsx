import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center pb-180">
      <div className="tablet-wide:mb-48 tablet-wide:h-314 tablet-wide:w-537 mobile-wide:h-168 mobile-wide:w-287 relative mb-24 h-422 w-722">
        <Image
          src="/images/banner.png"
          alt="invitations"
          fill
          priority
          sizes="(max-width: 683px) 287px, (max-width: 1439px) 537px, 722px"
        />
      </div>

      <h1 className="tablet-wide:mb-110 tablet-wide:text-55 mobile-wide:text-40 mb-100 text-center text-76 font-bold">
        새로운 일정 관리 <span className="Text-blue">CoPlan</span>
      </h1>

      <Link
        href="/login"
        className="BG-blue mt-8 flex h-54 w-280 items-center justify-center rounded-8 text-center text-lg font-medium text-white"
      >
        로그인하기
      </Link>
    </section>
  )
}
