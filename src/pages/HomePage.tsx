import { CtaSection } from '../components/sections/CtaSection'
import { DashboardSection } from '../components/sections/DashboardSection'
import { FeaturesSection } from '../components/sections/FeaturesSection'
import { HeroSection } from '../components/sections/HeroSection'
import { StatsStrip } from '../components/sections/StatsStrip'
import { TestimonialsSection } from '../components/sections/TestimonialsSection'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsStrip />
      <DashboardSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  )
}
