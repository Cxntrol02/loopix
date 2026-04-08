import { heroStats } from '../../data/siteContent'
import styles from './StatsStrip.module.css'

export function StatsStrip() {
  return (
    <section className={styles.strip} aria-label="Key metrics">
      {heroStats.map((stat) => (
        <article key={stat.label} className={styles.item}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </article>
      ))}
    </section>
  )
}
