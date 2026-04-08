export type SystemStatusLevel = 'Operational' | 'Degraded' | 'Outage' | 'Unavailable'

export type SystemStatus = {
  status: SystemStatusLevel
  message?: string
  updatedAt?: string
}

export const STATUS_POLL_INTERVAL_MS = 60_000

const STATUS_API_URL = import.meta.env.VITE_STATUS_API_URL?.trim()
const STATUS_TIMEOUT_MS = 5_000

function mapStatusValue(value: string | undefined): SystemStatusLevel {
  const normalized = value?.trim().toLowerCase()

  if (!normalized) {
    return 'Unavailable'
  }

  if (['operational', 'up', 'ok', 'healthy', 'online'].includes(normalized)) {
    return 'Operational'
  }

  if (['degraded', 'partial', 'warning', 'issues'].includes(normalized)) {
    return 'Degraded'
  }

  if (['outage', 'down', 'offline', 'major', 'critical'].includes(normalized)) {
    return 'Outage'
  }

  return 'Unavailable'
}

function normalizeStatus(payload: unknown): SystemStatus {
  if (typeof payload === 'string') {
    return { status: mapStatusValue(payload) }
  }

  if (!payload || typeof payload !== 'object') {
    return { status: 'Unavailable', message: 'Invalid status response' }
  }

  const data = payload as Record<string, unknown>
  const statusValue = [data.status, data.state, data.indicator, data.level].find(
    (value) => typeof value === 'string',
  ) as string | undefined

  const message = [data.message, data.description].find(
    (value) => typeof value === 'string',
  ) as string | undefined

  const updatedAt = typeof data.updatedAt === 'string' ? data.updatedAt : undefined

  return {
    status: mapStatusValue(statusValue),
    message,
    updatedAt,
  }
}

async function fetchJsonWithTimeout(url: string, timeoutMs: number): Promise<unknown> {
  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`Status endpoint returned ${response.status}`)
    }

    return await response.json()
  } finally {
    window.clearTimeout(timeoutId)
  }
}

export async function fetchSystemStatus(): Promise<SystemStatus> {
  if (!STATUS_API_URL) {
    return {
      status: 'Unavailable',
      message: 'Set VITE_STATUS_API_URL to enable live system status.',
    }
  }

  try {
    const payload = await fetchJsonWithTimeout(STATUS_API_URL, STATUS_TIMEOUT_MS)
    return normalizeStatus(payload)
  } catch (error) {
    return {
      status: 'Unavailable',
      message: error instanceof Error ? error.message : 'Status check failed',
    }
  }
}