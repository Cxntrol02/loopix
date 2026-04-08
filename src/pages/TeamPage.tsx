import styles from './TeamPage.module.css'

const owners = [
  {
    name: 'NAME',
    role: 'Owner',
    description:
      'Soon',
    accent: 'linear-gradient(145deg, #7cd6ff 0%, #3f7cff 100%)',
  },
  {
    name: 'NAME',
    role: 'Owner',
    description:
      'Soon',
    accent: 'linear-gradient(145deg, #98d2ff 0%, #4a67ff 100%)',
  },
]

const managers = [
  {
    name: 'NAME',
    role: 'Manager',
    description:
      'Soon',
    accent: 'linear-gradient(145deg, #9ce8ff 0%, #3d8eff 100%)',
  },
]

type StaffMember = {
  name: string
  role: string
  description: string
  accent: string
}

function StaffCards({ members }: { members: StaffMember[] }) {
  return (
    <div className={styles.cardRow}>
      {members.map((member) => (
        <article key={member.name} className={styles.card}>
          <div className={styles.avatar} style={{ background: member.accent }} aria-hidden="true">
            <span>LP</span>
          </div>
          <div>
            <h3>{member.name}</h3>
            <p className={styles.role}>{member.role}</p>
            <p>{member.description}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

export function TeamPage() {
  return (
    <section className={styles.section}>
      <header className={styles.hero}>
        <p className={styles.kicker}>Loopix Staff Team</p>
        <h1>People who keep Loopix running</h1>
        <p>
          This team manages development, infrastructure, and community operations so your guild sessions stay smooth.
        </p>
      </header>

      <div className={styles.group}>
        <h2>Owners</h2>
        <p>These are the project owners leading architecture, roadmap, and long-term platform direction.</p>
        <StaffCards members={owners} />
      </div>

      <div className={styles.group}>
        <h2>Managers</h2>
        <p>Managers coordinate support, release quality, and day-to-day execution across Loopix services.</p>
        <StaffCards members={managers} />
      </div>
    </section>
  )
}
