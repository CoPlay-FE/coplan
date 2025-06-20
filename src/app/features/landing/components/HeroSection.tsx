import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center pb-180">
      <div className="tabletS:mb-48 tabletS:h-314 tabletS:w-537 mobileS:h-168 mobileS:w-287 relative mb-24 h-422 w-722">
        <Image
          src="/images/banner.png"
          alt="invitations"
          fill
          priority
          sizes="(max-width: 683px) 287px, (max-width: 1439px) 537px, 722px"
        />
      </div>

      <h1 className="tabletS:mb-110 tabletS:text-55 mobileS:text-40 mb-100 text-center text-76 font-bold">
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
