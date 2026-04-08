import { Button } from '../ui/Button'
import styles from './CtaSection.module.css'

export function CtaSection() {
  return (
    <section id="join" className={styles.cta}>
      <p className={styles.eyebrow}>Ready to launch?</p>
      <h2>Bring premium music to your Discord server today.</h2>
      <p>
        Install Loopix in minutes, configure your defaults, and give your
        community a modern listening experience from day one.
      </p>
      <div className={styles.actions}>
        <Button href="/docs">Start Free</Button>
        <Button variant="secondary" href="/dashboard">
          View Live Dashboard
        </Button>
      </div>
    </section>
  )
}
