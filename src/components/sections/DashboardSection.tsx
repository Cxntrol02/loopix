import { useEffect, useState } from 'react'
import { fetchLiveOpsSnapshot, type LiveOpsSnapshot } from '../../services/mockApi'
import { SectionTitle } from '../ui/SectionTitle'
import styles from './DashboardSection.module.css'

export function DashboardSection() {
  const [snapshot, setSnapshot] = useState<LiveOpsSnapshot | null>(null)

  useEffect(() => {
    void fetchLiveOpsSnapshot().then(setSnapshot)
  }, [])

  const queueDepth = snapshot ? Math.max(12, Math.round(snapshot.songsPlayedToday / 20273)) : 18
  const listenersInVoice = snapshot ? Math.max(2, Math.round(snapshot.activeGuilds / 642)) : 2

  return (
    <section id="dashboard" className={styles.section}>
      <SectionTitle
        eyebrow="Dashboard"
        title="Operate your music ecosystem from one command center"
        description="Track performance, server activity, and queue health in real time with zero clutter."
      />

      <div className={styles.panel}>
        <article className={styles.nowPlaying}>
          <p>Now Playing</p>
          <strong>Nightdrive / Vela Echo</strong>
          <span>
            Queue: {queueDepth} tracks • {listenersInVoice} listeners in voice
          </span>
        </article>

        <div className={styles.waveStrip} aria-hidden="true" />

        <article className={styles.latency}>
          <p>Live Latency</p>
          <strong>{snapshot ? `${snapshot.averageLatencyMs}ms` : 'Loading...'}</strong>
        </article>
      </div>
    </section>
  )
}
