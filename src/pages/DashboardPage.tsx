import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/AuthContext'
import {
  fetchDashboardSnapshot,
  type DashboardServer,
  type DashboardServerStatus,
  type DashboardSnapshot,
} from '../services/mockApi'
import styles from './DashboardPage.module.css'

function statusClassName(status: DashboardServerStatus) {
  if (status === 'Online') {
    return styles.statusOnline
  }

  if (status === 'Idle') {
    return styles.statusIdle
  }

  return styles.statusNeedsAttention
}

function sortedServers(servers: DashboardServer[]) {
  return [...servers].sort((a, b) => b.members - a.members)
}

const statusFilters = ['All', 'Online', 'Idle', 'Needs attention'] as const
type StatusFilter = (typeof statusFilters)[number]

type ModuleConfig = {
  id: string
  name: string
  description: string
  enabled: boolean
}

export function DashboardPage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [snapshot, setSnapshot] = useState<DashboardSnapshot | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All')
  const [selectedServerId, setSelectedServerId] = useState<string | null>(null)
  const [activeNav, setActiveNav] = useState<'overview' | 'servers' | 'activity' | 'billing'>(
    'overview',
  )
  const [modules, setModules] = useState<ModuleConfig[]>([
    {
      id: 'music-player',
      name: 'Music Player',
      description: 'Queue management, autoplay, and smart fallback tracks.',
      enabled: true,
    },
    {
      id: 'welcome-tools',
      name: 'Welcome Tools',
      description: 'Auto-greet, role assignment, and verification rules.',
      enabled: true,
    },
    {
      id: 'moderation',
      name: 'Moderation',
      description: 'Spam filters, channel lock, and warning automations.',
      enabled: false,
    },
    {
      id: 'analytics',
      name: 'Analytics',
      description: 'Daily usage reports and command-level performance metrics.',
      enabled: true,
    },
  ])
  const overviewRef = useRef<HTMLElement | null>(null)
  const serversRef = useRef<HTMLElement | null>(null)
  const activityRef = useRef<HTMLElement | null>(null)
  const billingRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    void fetchDashboardSnapshot().then(setSnapshot)
  }, [])

  const servers = useMemo(() => {
    if (!snapshot) {
      return []
    }

    const normalizedQuery = searchQuery.trim().toLowerCase()

    return sortedServers(snapshot.servers).filter((server) => {
      const matchesStatus = statusFilter === 'All' || server.status === statusFilter

      if (!normalizedQuery) {
        return matchesStatus
      }

      const matchesQuery =
        server.name.toLowerCase().includes(normalizedQuery) ||
        server.region.toLowerCase().includes(normalizedQuery) ||
        server.plan.toLowerCase().includes(normalizedQuery)

      return matchesStatus && matchesQuery
    })
  }, [snapshot, searchQuery, statusFilter])

  function jumpToSection(section: 'overview' | 'servers' | 'activity' | 'billing') {
    setActiveNav(section)

    const sectionMap = {
      overview: overviewRef,
      servers: serversRef,
      activity: activityRef,
      billing: billingRef,
    }

    sectionMap[section].current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const selectedServer = useMemo(() => {
    if (!snapshot?.servers.length) {
      return null
    }

    if (selectedServerId) {
      const matchedServer = snapshot.servers.find((server) => server.id === selectedServerId)

      if (matchedServer) {
        return matchedServer
      }
    }

    return sortedServers(snapshot.servers)[0]
  }, [snapshot, selectedServerId])

  function appendActivityEntry(title: string, detail: string) {
    setSnapshot((previousSnapshot) => {
      if (!previousSnapshot) {
        return previousSnapshot
      }

      const newEntry = {
        id: `act-${Date.now()}`,
        title,
        detail,
        timestamp: 'Just now',
      }

      return {
        ...previousSnapshot,
        activity: [newEntry, ...previousSnapshot.activity].slice(0, 6),
      }
    })
  }

  function handleAddServer() {
    setSnapshot((previousSnapshot) => {
      if (!previousSnapshot) {
        return previousSnapshot
      }

      const newServerNumber = previousSnapshot.totalServers + 1
      const newServer = {
        id: `srv-${Date.now()}`,
        name: `New Workspace ${newServerNumber}`,
        region: 'US West',
        plan: 'Starter',
        members: 420,
        activeListeners: 12,
        queueDepth: 5,
        uptime: '00d 00h',
        latencyMs: 44,
        status: 'Online' as DashboardServerStatus,
      }

      return {
        ...previousSnapshot,
        totalServers: previousSnapshot.totalServers + 1,
        onlineServers: previousSnapshot.onlineServers + 1,
        totalMembers: previousSnapshot.totalMembers + newServer.members,
        servers: [newServer, ...previousSnapshot.servers],
      }
    })

    appendActivityEntry('Server created', 'A new server workspace was added from the dashboard.')
    setStatusFilter('All')
    setSearchQuery('')
    jumpToSection('servers')
  }

  function handleManageCredits() {
    setSnapshot((previousSnapshot) => {
      if (!previousSnapshot) {
        return previousSnapshot
      }

      return {
        ...previousSnapshot,
        availableCredits: previousSnapshot.availableCredits + 250,
      }
    })

    appendActivityEntry('Credits updated', '250 credits were added to your current billing cycle.')
    jumpToSection('billing')
  }

  function handleOpenDiagnostics() {
    setStatusFilter('Needs attention')
    setSearchQuery('')
    appendActivityEntry(
      'Diagnostics started',
      'Filtering to servers that need attention so you can troubleshoot quickly.',
    )
    jumpToSection('servers')
  }

  function handleSelectServer(serverId: string) {
    setSelectedServerId(serverId)
    appendActivityEntry('Server selected', 'Dashboard context switched to the selected server.')
  }

  function handleOpenPanel(serverName: string) {
    appendActivityEntry('Control panel opened', `${serverName} panel opened for module configuration.`)
  }

  function handleInviteBot(serverName: string) {
    appendActivityEntry('Invite started', `Bot invite flow started for ${serverName}.`)
  }

  function handleToggleModule(moduleId: string) {
    setModules((previousModules) => {
      const updatedModules = previousModules.map((moduleItem) =>
        moduleItem.id === moduleId ? { ...moduleItem, enabled: !moduleItem.enabled } : moduleItem,
      )

      const updatedModule = updatedModules.find((moduleItem) => moduleItem.id === moduleId)

      if (updatedModule) {
        appendActivityEntry(
          updatedModule.enabled ? 'Module enabled' : 'Module disabled',
          `${updatedModule.name} was ${updatedModule.enabled ? 'enabled' : 'disabled'} from dashboard controls.`,
        )
      }

      return updatedModules
    })
  }

  function handleLogout() {
    navigate('/', { replace: true })
    logout()
  }

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <Link to="/" className={styles.brandBlock}>
          <img className={styles.brandIcon} src="/favicon.svg" alt="" aria-hidden="true" />
          <div>
            <p className={styles.brandName}>Loopix</p>
            <p className={styles.brandSub}>Workspace</p>
          </div>
        </Link>

        <nav className={styles.nav} aria-label="Dashboard navigation">
          <p className={styles.navLabel}>Platform</p>
          <button
            className={`${styles.navItem} ${activeNav === 'overview' ? styles.navItemActive : ''}`}
            type="button"
            onClick={() => jumpToSection('overview')}
          >
            Overview
          </button>
          <button
            className={`${styles.navItem} ${activeNav === 'servers' ? styles.navItemActive : ''}`}
            type="button"
            onClick={() => jumpToSection('servers')}
          >
            Servers
          </button>
          <button
            className={`${styles.navItem} ${activeNav === 'activity' ? styles.navItemActive : ''}`}
            type="button"
            onClick={() => jumpToSection('activity')}
          >
            Activity
          </button>
          <button
            className={`${styles.navItem} ${activeNav === 'billing' ? styles.navItemActive : ''}`}
            type="button"
            onClick={() => jumpToSection('billing')}
          >
            Billing
          </button>
        </nav>

        <div className={styles.sidebarFooter}>
          <Link to="/docs" className={styles.footerLink}>
            Open docs
          </Link>
          <button className={styles.footerButton} type="button" onClick={handleLogout}>
            Sign out
          </button>
          {user ? (
            <div className={styles.identity}>
              <img className={styles.identityAvatar} src={user.avatarUrl} alt="" aria-hidden="true" />
              <div>
                <p className={styles.identityName}>{user.displayName}</p>
                <p className={styles.identityMeta}>Discord connected</p>
              </div>
            </div>
          ) : null}
        </div>
      </aside>

      <section className={styles.content}>
        <header className={styles.header} ref={overviewRef}>
          <div>
            <p className={styles.eyebrow}>Dashboard</p>
            <h1>
              Welcome back{user ? `, ${user.displayName}` : ''}
            </h1>
            <p className={styles.subtitle}>
              Configure your bot like other top Discord dashboards with quick server and module control.
            </p>
          </div>
          <div className={styles.actions}>
            <button className={styles.primaryAction} type="button" onClick={handleAddServer}>
              Add server
            </button>
            <button className={styles.secondaryAction} type="button" onClick={handleManageCredits}>
              Manage credits
            </button>
          </div>
        </header>

        <section className={styles.statsGrid} aria-label="Key dashboard stats">
          <article className={styles.statCard}>
            <p>Total servers</p>
            <strong>{snapshot ? snapshot.totalServers : '--'}</strong>
            <span>Connected Discord servers</span>
          </article>
          <article className={styles.statCard}>
            <p>Online now</p>
            <strong>{snapshot ? snapshot.onlineServers : '--'}</strong>
            <span>Bots currently responding</span>
          </article>
          <article className={styles.statCard}>
            <p>Total members</p>
            <strong>{snapshot ? snapshot.totalMembers.toLocaleString() : '--'}</strong>
            <span>Audience across all servers</span>
          </article>
          <article className={styles.statCard}>
            <p>Commands today</p>
            <strong>{snapshot ? snapshot.commandsToday.toLocaleString() : '--'}</strong>
            <span>Successful command executions</span>
          </article>
          <article className={styles.statCard}>
            <p>Average latency</p>
            <strong>{snapshot ? `${snapshot.averageLatencyMs}ms` : '--'}</strong>
            <span>Gateway response median</span>
          </article>
          <article className={styles.statCard}>
            <p>Available credits</p>
            <strong>{snapshot ? snapshot.availableCredits.toLocaleString() : '--'}</strong>
            <span>Usage credits remaining</span>
          </article>
        </section>

        <div className={styles.columns}>
          <section className={styles.mainPanel} aria-label="Server list" ref={serversRef}>
            <div className={styles.panelHeading}>
              <h2>Your servers</h2>
              <p>{servers.length} visible results</p>
            </div>

            <div className={styles.tableTools}>
              <label className={styles.searchField}>
                <span>Search</span>
                <input
                  type="search"
                  placeholder="Find by server, region, or plan"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </label>

              <label className={styles.filterField}>
                <span>Status</span>
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
                >
                  {statusFilters.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className={styles.serverCardGrid}>
              {servers.map((server: DashboardServer) => {
                const isSelected = selectedServer?.id === server.id

                return (
                  <article
                    key={server.id}
                    className={`${styles.serverCard} ${isSelected ? styles.serverCardSelected : ''}`}
                  >
                    <div className={styles.serverCardTop}>
                      <button
                        type="button"
                        className={styles.serverSelectButton}
                        onClick={() => handleSelectServer(server.id)}
                      >
                        <span className={styles.serverAvatar} aria-hidden="true">
                          {server.name.charAt(0).toUpperCase()}
                        </span>
                        <span className={styles.serverIdentity}>
                          <strong>{server.name}</strong>
                          <span>
                            {server.region} - {server.plan}
                          </span>
                        </span>
                      </button>
                      <span className={`${styles.statusPill} ${statusClassName(server.status)}`}>
                        {server.status}
                      </span>
                    </div>

                    <dl className={styles.serverMetricRow}>
                      <div>
                        <dt>Members</dt>
                        <dd>{server.members.toLocaleString()}</dd>
                      </div>
                      <div>
                        <dt>Listening</dt>
                        <dd>{server.activeListeners}</dd>
                      </div>
                      <div>
                        <dt>Queue</dt>
                        <dd>{server.queueDepth}</dd>
                      </div>
                      <div>
                        <dt>Latency</dt>
                        <dd>{server.latencyMs}ms</dd>
                      </div>
                    </dl>

                    <div className={styles.serverCardActions}>
                      <button type="button" onClick={() => handleOpenPanel(server.name)}>
                        Open panel
                      </button>
                      <button type="button" onClick={() => handleInviteBot(server.name)}>
                        Invite bot
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>

            {servers.length === 0 ? (
              <p className={styles.emptyCardsMessage}>No servers match your current filters.</p>
            ) : null}

            <section className={styles.moduleSection}>
              <div className={styles.panelHeading}>
                <h2>Modules for {selectedServer ? selectedServer.name : 'selected server'}</h2>
                <p>Toggle features instantly</p>
              </div>

              <div className={styles.moduleGrid}>
                {modules.map((moduleItem) => (
                  <article key={moduleItem.id} className={styles.moduleCard}>
                    <div>
                      <h3>{moduleItem.name}</h3>
                      <p>{moduleItem.description}</p>
                    </div>
                    <button
                      type="button"
                      className={`${styles.moduleToggle} ${moduleItem.enabled ? styles.moduleToggleOn : ''}`}
                      onClick={() => handleToggleModule(moduleItem.id)}
                    >
                      {moduleItem.enabled ? 'Enabled' : 'Disabled'}
                    </button>
                  </article>
                ))}
              </div>
            </section>
          </section>

          <aside className={styles.sidePanel} aria-label="Recent activity and guidance">
            <section className={styles.setupPanel}>
              <h2>Selected server</h2>
              {selectedServer ? (
                <>
                  <p>
                    {selectedServer.name} is in {selectedServer.region} on the {selectedServer.plan} plan.
                  </p>
                  <p>
                    Uptime: <strong>{selectedServer.uptime}</strong> · Queue depth:{' '}
                    <strong>{selectedServer.queueDepth}</strong>
                  </p>
                </>
              ) : (
                <p>Select a server card to see focused controls.</p>
              )}
            </section>

            <section className={styles.activityPanel} ref={activityRef}>
              <div className={styles.panelHeading}>
                <h2>Recent activity</h2>
              </div>
              <ul className={styles.activityList}>
                {(snapshot?.activity ?? []).map((item) => (
                  <li key={item.id}>
                    <p className={styles.activityTitle}>{item.title}</p>
                    <p className={styles.activityDetail}>{item.detail}</p>
                    <span>{item.timestamp}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.setupPanel}>
              <h2>System health</h2>
              <p>
                Voice shards are stable and command success rate is above 99.7%. One server needs
                latency tuning.
              </p>
              <button type="button" className={styles.primaryAction} onClick={handleOpenDiagnostics}>
                Open diagnostics
              </button>
            </section>

            <section className={styles.setupPanel} ref={billingRef}>
              <h2>Billing overview</h2>
              <p>
                Current balance: <strong>{snapshot ? snapshot.availableCredits.toLocaleString() : '--'}</strong>{' '}
                credits. Refill from the action buttons to keep all servers active.
              </p>
              <button type="button" className={styles.secondaryAction} onClick={handleManageCredits}>
                Add 250 credits
              </button>
            </section>
          </aside>
        </div>
      </section>
    </div>
  )
}
