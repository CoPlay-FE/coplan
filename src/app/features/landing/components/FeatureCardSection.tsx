import FeatureCard from './FeatureCard'
export default function FeatureCardSection() {
  return (
    <section className="flex w-full max-w-1200 flex-col justify-center gap-42 tablet-wide:items-center">
      <p className="text-left text-22 font-bold mobile-wide:text-center">
        생산성을 높이는 다양한 설정 ⚡
      </p>

      <div className="flex w-full flex-row items-center justify-between gap-33 mobile-wide:flex-col mobile-wide:gap-40 tablet-wide:flex-col tablet-wide:justify-center">
        <FeatureCard
          image="/images/newdashboard.svg"
          imageAlt="대시보드 설정"
          title="대시보드 설정"
          description="대시보드 사진과 이름을 변경할 수 있어요."
          imageClassName="h-123 w-300"
        />
        <FeatureCard
          image="/images/invite.svg"
          imageAlt="초대"
          title="초대"
          description="새로운 팀원을 초대할 수 있어요."
          imageClassName="h-230 w-300 mobile-wide:w-260 mobile-wide:h-200"
        />
        <FeatureCard
          image="/images/member.svg"
          imageAlt="구성원"
          imageClassName="h-195 w-300"
          title="구성원"
          description="구성원을 초대하고 내보낼 수 있어요."
        />
      </div>
    </section>
  )
}
