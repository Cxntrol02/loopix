import { SectionTitle } from '../components/ui/SectionTitle'
import styles from './DocsPage.module.css'

const docsItems = [
  {
    title: 'Quick Start',
    description: 'Install the bot, set up permissions, and configure your first music channel.',
  },
  {
    title: 'Command Reference',
    description: 'A complete list of playback, queue, and admin commands with examples.',
  },
  {
    title: 'Troubleshooting',
    description: 'Fix voice connection, playback, and permission issues quickly.',
  },
]

export function DocsPage() {
  return (
    <section className={styles.section}>
      <SectionTitle
        eyebrow="Docs"
        title="Everything you need to run Loopix Music Bot"
        description="Organized documentation for setup, moderation, command usage, and support workflows."
      />

      <div className={styles.grid}>
        {docsItems.map((item) => (
          <article key={item.title} className={styles.card}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
