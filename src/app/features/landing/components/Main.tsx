import FeatureCardSection from './FeatureCardSection'
import HeroSection from './HeroSection'
import PointSection from './PointSection'

export default function Main() {
  return (
    <main className="mb-160 mt-94 mobile-wide:mb-120 mobile-wide:mt-42">
      <HeroSection />
      <div className="flex flex-col items-center justify-center">
        <PointSection />
        <FeatureCardSection />
      </div>
    </main>
  )
}
