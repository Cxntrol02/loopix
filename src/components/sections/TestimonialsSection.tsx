import { testimonials } from '../../data/siteContent'
import { SectionTitle } from '../ui/SectionTitle'
import styles from './TestimonialsSection.module.css'

export function TestimonialsSection() {
  return (
    <section className={styles.section}>
      <SectionTitle
        eyebrow="Community"
        title="Loved by moderators, creators, and server owners"
        description="Real teams trust Loopix to keep community music sessions smooth and reliable."
      />

      <div className={styles.grid}>
        {testimonials.map((testimonial) => (
          <article key={testimonial.author} className={styles.card}>
            <p className={styles.quote}>"{testimonial.quote}"</p>
            <p className={styles.author}>{testimonial.author}</p>
            <p className={styles.role}>{testimonial.role}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
