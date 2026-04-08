export type LiveOpsSnapshot = {
  activeGuilds: number
  songsPlayedToday: number
  averageLatencyMs: number
}

export async function fetchLiveOpsSnapshot(): Promise<LiveOpsSnapshot> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        activeGuilds: 12847,
        songsPlayedToday: 364912,
        averageLatencyMs: 42,
      })
    }, 220)
  })
}

export type SystemStatus = {
  status: 'Operational' | 'Degraded' | 'Outage'
}

export type DashboardServerStatus = 'Online' | 'Idle' | 'Needs attention'

export type DashboardServer = {
  id: string
  name: string
  region: string
  plan: string
  members: number
  activeListeners: number
  queueDepth: number
  uptime: string
  latencyMs: number
  status: DashboardServerStatus
}

export type DashboardActivity = {
  id: string
  title: string
  detail: string
  timestamp: string
}

export type DashboardSnapshot = {
  totalServers: number
  onlineServers: number
  totalMembers: number
  commandsToday: number
  averageLatencyMs: number
  availableCredits: number
  servers: DashboardServer[]
  activity: DashboardActivity[]
}

export async function fetchSystemStatus(): Promise<SystemStatus> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 'Operational' })
    }, 300)
  })
}

export async function fetchDashboardSnapshot(): Promise<DashboardSnapshot> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalServers: 9,
        onlineServers: 8,
        totalMembers: 28641,
        commandsToday: 9182,
        averageLatencyMs: 39,
        availableCredits: 1420,
        servers: [
          {
            id: 'srv-anchor',
            name: 'AnchorCAD Main',
            region: 'US East',
            plan: 'Pro',
            members: 6240,
            activeListeners: 138,
            queueDepth: 47,
            uptime: '14d 09h',
            latencyMs: 33,
            status: 'Online',
          },
          {
            id: 'srv-europa',
            name: 'Europa Night Drive',
            region: 'EU West',
            plan: 'Growth',
            members: 4028,
            activeListeners: 92,
            queueDepth: 21,
            uptime: '8d 18h',
            latencyMs: 41,
            status: 'Online',
          },
          {
            id: 'srv-onyx',
            name: 'Onyx Collective',
            region: 'US Central',
            plan: 'Starter',
            members: 1895,
            activeListeners: 23,
            queueDepth: 7,
            uptime: '2d 04h',
            latencyMs: 58,
            status: 'Needs attention',
          },
          {
            id: 'srv-halo',
            name: 'Halo Racing Hub',
            region: 'AP Southeast',
            plan: 'Pro',
            members: 2887,
            activeListeners: 74,
            queueDepth: 15,
            uptime: '21d 02h',
            latencyMs: 36,
            status: 'Idle',
          },
        ],
        activity: [
          {
            id: 'act-1',
            title: 'Queue sync recovered',
            detail: 'AnchorCAD Main resumed queue processing after API reconnect.',
            timestamp: '2m ago',
          },
          {
            id: 'act-2',
            title: 'Credit refill applied',
            detail: '500 credits added to workspace wallet from monthly plan cycle.',
            timestamp: '1h ago',
          },
          {
            id: 'act-3',
            title: 'Moderator changed DJ role',
            detail: 'Onyx Collective updated role permissions for /skip and /stop.',
            timestamp: '3h ago',
          },
          {
            id: 'act-4',
            title: 'Latency spike detected',
            detail: 'Europe shard crossed 60ms for 4 minutes and auto-corrected.',
            timestamp: '5h ago',
          },
        ],
      })
    }, 260)
  })
}
