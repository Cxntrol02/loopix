import { features } from '../../data/siteContent'
import { SectionTitle } from '../ui/SectionTitle'
import styles from './FeaturesSection.module.css'

export function FeaturesSection() {
  return (
    <section id="features" className={styles.section}>
      <SectionTitle
        eyebrow="Features"
        title="Built to scale from chill sessions to high-traffic events"
        description="Every module is designed to keep playback stable, management simple, and your server experience premium."
      />

      <div className={styles.grid}>
        {features.map((feature) => (
          <article key={feature.title} className={styles.card}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <small>{feature.highlight}</small>
          </article>
        ))}
      </div>
    </section>
  )
}
