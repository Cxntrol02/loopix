import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../features/auth/AuthContext'
import styles from './LoginPage.module.css'

function getRedirectPath(state: unknown) {
  if (
    state &&
    typeof state === 'object' &&
    'from' in state &&
    typeof state.from === 'string' &&
    state.from.startsWith('/')
  ) {
    return state.from
  }

  return '/dashboard'
}

export function LoginPage() {
  const { beginDiscordLogin, isAuthenticated } = useAuth()
  const location = useLocation()
  const [errorMessage, setErrorMessage] = useState('')
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const redirectPath = getRedirectPath(location.state)

  return (
    <div className={styles.page}>
      <section className={styles.panel}>
        <div className={styles.card}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Loopix Access</p>
            <h1>Login to your account</h1>
            <p className={styles.lead}>Sign in with Discord to open your Loopix dashboard.</p>
          </div>

          <button
            className={styles.loginButton}
            type="button"
            onClick={() => {
              setErrorMessage('')

              try {
                beginDiscordLogin(redirectPath)
              } catch (error) {
                const message =
                  error instanceof Error
                    ? error.message
                    : 'Unable to start Discord login. Please check your OAuth setup.'

                setErrorMessage(message)
              }
            }}
          >
            <span className={styles.discordIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path
                  fill="currentColor"
                  d="M20.32 4.37a16.7 16.7 0 0 0-4.1-1.28.06.06 0 0 0-.07.03c-.18.33-.38.76-.52 1.1a15.46 15.46 0 0 0-4.64 0 11.2 11.2 0 0 0-.53-1.1.06.06 0 0 0-.07-.03 16.64 16.64 0 0 0-4.1 1.28.05.05 0 0 0-.02.02C3.67 8.28 2.86 12.08 3.26 15.84a.07.07 0 0 0 .03.05 16.84 16.84 0 0 0 5.03 2.54.07.07 0 0 0 .08-.03c.39-.53.73-1.08 1.02-1.66a.07.07 0 0 0-.04-.1 10.98 10.98 0 0 1-1.56-.74.07.07 0 0 1-.01-.12c.1-.08.2-.16.29-.25a.06.06 0 0 1 .07-.01c3.28 1.5 6.84 1.5 10.08 0a.06.06 0 0 1 .07.01l.3.25a.07.07 0 0 1-.01.12c-.5.29-1.02.54-1.57.74a.07.07 0 0 0-.04.1c.3.58.64 1.13 1.03 1.66a.07.07 0 0 0 .08.03 16.78 16.78 0 0 0 5.03-2.54.07.07 0 0 0 .03-.05c.48-4.34-.8-8.1-2.94-11.45a.05.05 0 0 0-.02-.02ZM9.76 13.55c-.99 0-1.8-.91-1.8-2.03 0-1.12.8-2.03 1.8-2.03s1.81.91 1.8 2.03c0 1.12-.8 2.03-1.8 2.03Zm4.48 0c-.99 0-1.8-.91-1.8-2.03 0-1.12.8-2.03 1.8-2.03 1 0 1.81.91 1.8 2.03 0 1.12-.8 2.03-1.8 2.03Z"
                />
              </svg>
            </span>
            Login
          </button>

          {errorMessage ? <p className={styles.error}>{errorMessage}</p> : null}

          <p className={styles.note}>You&apos;ll be redirected to your dashboard after signing in.</p>
        </div>
      </section>

      <aside className={styles.visual} aria-hidden="true">
        <div className={styles.visualGlow} />
        <div className={styles.sceneFrame}>
          <div className={styles.lightBar} />
          <div className={styles.carSilhouette} />
          <div className={styles.floorGlow} />
        </div>
      </aside>
    </div>
  )
}