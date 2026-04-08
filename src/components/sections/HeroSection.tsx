import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { classNames } from '../../lib/classNames'
import { Button } from '../ui/Button'
import styles from './HeroSection.module.css'

export function HeroSection() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>Premium Discord music experience</p>
        <h1>Launch a pro-grade Music Bot that sounds incredible.</h1>
        <p className={styles.lead}>
          Loopix Music Bot gives your server studio-quality playback, modern
          controls, and intelligent queue automation in one clean platform.
        </p>
        <div className={styles.actions}>
          <Button href="/login">Sign Up</Button>
          <Button variant="secondary" href="/commands">
            Explore Commands
          </Button>
        </div>
      </div>

      <div
        className={classNames(styles.visual, !prefersReducedMotion && styles.animate)}
        aria-hidden="true"
      >
        <div className={styles.playerCard}>
          <span>Now Playing</span>
          <strong>Nightdrive / Vela Echo</strong>
          <p>Queue: 18 tracks · 2 listeners in voice</p>
        </div>
        <div className={styles.wave} />
        <div className={styles.metricCard}>
          <span>Live Latency</span>
          <strong>42ms</strong>
        </div>
      </div>
    </section>
  )
}
