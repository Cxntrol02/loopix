import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { siteConfig } from '../../config/siteConfig'
import {
  fetchSystemStatus,
  STATUS_POLL_INTERVAL_MS,
  type SystemStatus,
} from '../../services/statusApi'
import styles from './Footer.module.css'

const footerColumns = [
  {
    heading: 'General',
    links: [
      { label: 'Home', href: '/', internal: true },
      { label: 'Commands', href: '/commands', internal: true },
      { label: 'Team', href: '/team', internal: true },
    ],
  },
  {
    heading: 'Bot',
    links: [
      { label: 'Add to Server', href: siteConfig.addBotUrl, internal: false },
      { label: 'Dashboard', href: '/dashboard', internal: true },
      { label: 'Docs', href: '/docs', internal: true },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Discord', href: siteConfig.discordUrl, internal: false },
      { label: 'Support', href: `mailto:${siteConfig.supportEmail}`, internal: false },
    ],
  },
]

const STATUS_DOT: Record<SystemStatus['status'], string> = {
  Operational: styles.dotGreen,
  Degraded: styles.dotYellow,
  Outage: styles.dotRed,
  Unavailable: styles.dotGray,
}

export function Footer() {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    status: 'Unavailable',
    message: 'Checking system status...',
  })

  useEffect(() => {
    let isDisposed = false

    const updateStatus = async () => {
      const nextStatus = await fetchSystemStatus()

      if (!isDisposed) {
        setSystemStatus(nextStatus)
      }
    }

    void updateStatus()

    const intervalId = window.setInterval(() => {
      void updateStatus()
    }, STATUS_POLL_INTERVAL_MS)

    return () => {
      isDisposed = true
      window.clearInterval(intervalId)
    }
  }, [])

  const dotClass = STATUS_DOT[systemStatus.status]
  const statusLabel = systemStatus.status
  const statusTitle = systemStatus.message ?? 'Live system status'

  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <div className={styles.brandName}>
          <svg
            className={styles.brandIcon}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
          <span>Loopix</span>
        </div>
        <p className={styles.tagline}>Crafted for modern Discord communities</p>
        <div className={styles.statusRow} title={statusTitle}>
          <span className={`${styles.dot} ${dotClass}`} aria-hidden="true" />
          <span className={styles.statusText}>
            System Status&nbsp;&nbsp;
            <span className={styles.statusValue}>{statusLabel}</span>
          </span>
        </div>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} Loopix. All rights reserved.
        </p>
      </div>

      <div className={styles.columns}>
        {footerColumns.map((col) => (
          <div className={styles.column} key={col.heading}>
            <span className={styles.colHeading}>{col.heading}</span>
            <ul className={styles.colList}>
              {col.links.map((link) =>
                link.internal ? (
                  <li key={link.label}>
                    <Link to={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ) : (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={styles.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  )
}
