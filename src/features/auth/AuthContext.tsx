import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

export type AuthUser = {
  id: string
  username: string
  displayName: string
  avatarUrl: string
}

type AuthContextValue = {
  user: AuthUser | null
  isAuthenticated: boolean
  beginDiscordLogin: (redirectPath?: string) => void
  completeDiscordLogin: (accessToken: string) => Promise<void>
  logout: () => void
}

const storageKey = 'loopix-auth-session'
const redirectStorageKey = 'loopix-auth-redirect'
const discordApiBaseUrl = 'https://discord.com/api/v10'

const AuthContext = createContext<AuthContextValue | null>(null)

function createAvatarDataUrl(username: string) {
  const initial = username.trim().charAt(0).toUpperCase() || 'L'
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" role="img" aria-label="${username}">
      <defs>
        <linearGradient id="avatar-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#78f2ff" />
          <stop offset="55%" stop-color="#3d8bff" />
          <stop offset="100%" stop-color="#2f3cff" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="32" fill="#0b122a" />
      <circle cx="32" cy="32" r="30" fill="url(#avatar-gradient)" opacity="0.94" />
      <text
        x="50%"
        y="53%"
        dominant-baseline="middle"
        text-anchor="middle"
        fill="#f6fbff"
        font-family="'Space Grotesk', Arial, sans-serif"
        font-size="28"
        font-weight="700"
      >${initial}</text>
    </svg>
  `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

function readStoredUser() {
  if (typeof window === 'undefined') {
    return null
  }

  const storedValue = window.localStorage.getItem(storageKey)

  if (!storedValue) {
    return null
  }

  try {
    const parsed = JSON.parse(storedValue) as Partial<AuthUser>

    if (!parsed.id || !parsed.username) {
      return null
    }

    return {
      id: parsed.id,
      username: parsed.username,
      displayName: parsed.displayName ?? parsed.username,
      avatarUrl: parsed.avatarUrl ?? createAvatarDataUrl(parsed.username),
    }
  } catch {
    return null
  }
}

type DiscordUserResponse = {
  id: string
  username: string
  global_name: string | null
  avatar: string | null
}

function getDiscordAvatarUrl(discordUser: DiscordUserResponse) {
  if (discordUser.avatar) {
    const extension = discordUser.avatar.startsWith('a_') ? 'gif' : 'png'
    return `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.${extension}?size=128`
  }

  return createAvatarDataUrl(discordUser.username)
}

function getDiscordClientId() {
  return import.meta.env.VITE_DISCORD_CLIENT_ID?.trim() ?? ''
}

function getDiscordRedirectUri() {
  const configuredRedirectUri = import.meta.env.VITE_DISCORD_REDIRECT_URI?.trim()

  if (configuredRedirectUri) {
    return configuredRedirectUri
  }

  if (typeof window !== 'undefined') {
    return `${window.location.origin}/auth/discord/callback`
  }

  return ''
}

function buildDiscordAuthorizeUrl() {
  const clientId = getDiscordClientId()
  const redirectUri = getDiscordRedirectUri()

  if (!clientId || !redirectUri) {
    throw new Error('Discord OAuth is not configured. Set VITE_DISCORD_CLIENT_ID and VITE_DISCORD_REDIRECT_URI.')
  }

  const searchParams = new URLSearchParams({
    client_id: clientId,
    response_type: 'token',
    redirect_uri: redirectUri,
    scope: 'identify',
  })

  return `https://discord.com/oauth2/authorize?${searchParams.toString()}`
}

async function fetchDiscordUser(accessToken: string): Promise<AuthUser> {
  const response = await fetch(`${discordApiBaseUrl}/users/@me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to load Discord profile.')
  }

  const discordUser = (await response.json()) as DiscordUserResponse

  return {
    id: discordUser.id,
    username: discordUser.username,
    displayName: discordUser.global_name ?? discordUser.username,
    avatarUrl: getDiscordAvatarUrl(discordUser),
  }
}

export function getAuthRedirectPath() {
  if (typeof window === 'undefined') {
    return '/dashboard'
  }

  const storedPath = window.localStorage.getItem(redirectStorageKey)

  if (!storedPath || !storedPath.startsWith('/')) {
    return '/dashboard'
  }

  return storedPath
}

export function clearAuthRedirectPath() {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(redirectStorageKey)
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(() => readStoredUser())

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    if (user) {
      window.localStorage.setItem(storageKey, JSON.stringify(user))
      return
    }

    window.localStorage.removeItem(storageKey)
  }, [user])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      beginDiscordLogin: (redirectPath = '/dashboard') => {
        if (typeof window === 'undefined') {
          return
        }

        window.localStorage.setItem(redirectStorageKey, redirectPath)
        window.location.assign(buildDiscordAuthorizeUrl())
      },
      completeDiscordLogin: async (accessToken: string) => {
        const discordUser = await fetchDiscordUser(accessToken)
        setUser(discordUser)
      },
      logout: () => {
        clearAuthRedirectPath()
        setUser(null)
      },
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}