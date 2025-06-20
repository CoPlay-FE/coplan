import FeatureCard from './FeatureCard'
export default function FeatureCardSection() {
  return (
    <section className="tabletS:items-center flex w-full max-w-1200 flex-col justify-center gap-42">
      <p className="mobileS:text-center text-left text-22 font-bold">
        생산성을 높이는 다양한 설정 ⚡
      </p>

      <div className="mobileS:flex-col tabletS:flex-col mobileS:gap-40 tabletS:justify-center flex w-full flex-row items-center justify-between gap-33">
        <FeatureCard
          image="/images/newdashboard.svg"
          imageAlt="대시보드 설정"
          imageHeight={123}
          imageWidth={300}
          title="대시보드 설정"
          description="대시보드 사진과 이름을 변경할 수 있어요."
        />
        <FeatureCard
          image="/images/invite.svg"
          imageAlt="초대"
          imageHeight={239}
          imageWidth={300}
          title="초대"
          description="새로운 팀원을 초대할 수 있어요."
        />
        <FeatureCard
          image="/images/member.svg"
          imageAlt="구성원"
          imageHeight={195}
          imageWidth={300}
          title="구성원"
          description="구성원을 초대하고 내보낼 수 있어요."
        />
      </div>
    </section>
  )
}
