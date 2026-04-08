import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/layout/Navbar'
import { CommandsSection } from '../components/sections/CommandsSection'
import { CtaSection } from '../components/sections/CtaSection'
import { DashboardSection } from '../components/sections/DashboardSection'
import { FeaturesSection } from '../components/sections/FeaturesSection'
import { HeroSection } from '../components/sections/HeroSection'
import { StatsStrip } from '../components/sections/StatsStrip'
import { TestimonialsSection } from '../components/sections/TestimonialsSection'
import styles from './AppShell.module.css'

export function AppShell() {
  return (
    <div className={styles.shell}>
      <Navbar />
      <main>
        <HeroSection />
        <StatsStrip />
        <FeaturesSection />
        <CommandsSection />
        <DashboardSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
