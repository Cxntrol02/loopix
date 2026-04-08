import { commandCategories } from '../../data/siteContent'
import { SectionTitle } from '../ui/SectionTitle'
import styles from './CommandsSection.module.css'

export function CommandsSection() {
  return (
    <section id="commands" className={styles.section}>
      <SectionTitle
        eyebrow="Commands"
        title="Battle-tested commands your members actually use"
        description="Organized command packs keep onboarding easy while giving power users deep control."
      />

      <div className={styles.grid}>
        {commandCategories.map((category) => (
          <article key={category.category} className={styles.card}>
            <h3>{category.category}</h3>
            <ul>
              {category.commands.map((command) => (
                <li key={command}>/{command}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
