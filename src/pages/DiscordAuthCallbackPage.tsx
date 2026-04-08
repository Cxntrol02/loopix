import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  clearAuthRedirectPath,
  getAuthRedirectPath,
  useAuth,
} from '../features/auth/AuthContext'
import styles from './DiscordAuthCallbackPage.module.css'

function getAccessTokenFromHash(hashValue: string) {
  const cleanHash = hashValue.startsWith('#') ? hashValue.slice(1) : hashValue
  const searchParams = new URLSearchParams(cleanHash)
  return searchParams.get('access_token')
}

function getDiscordErrorFromHash(hashValue: string) {
  const cleanHash = hashValue.startsWith('#') ? hashValue.slice(1) : hashValue
  const searchParams = new URLSearchParams(cleanHash)
  const error = searchParams.get('error')
  const description = searchParams.get('error_description')

  if (!error) {
    return ''
  }

  return description ? `${error}: ${description.replace(/\+/g, ' ')}` : error
}

export function DiscordAuthCallbackPage() {
  const { completeDiscordLogin } = useAuth()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function completeLogin() {
      const oauthError = getDiscordErrorFromHash(window.location.hash)

      if (oauthError) {
        setErrorMessage(`Discord OAuth error: ${oauthError}`)
        return
      }

      const accessToken = getAccessTokenFromHash(window.location.hash)

      if (!accessToken) {
        setErrorMessage('Discord did not return an access token.')
        return
      }

      try {
        await completeDiscordLogin(accessToken)
        const redirectPath = getAuthRedirectPath()
        clearAuthRedirectPath()
        navigate(redirectPath, { replace: true })
      } catch {
        setErrorMessage('Unable to complete Discord login. Please try again.')
      }
    }

    void completeLogin()
  }, [completeDiscordLogin, navigate])

  if (errorMessage) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <h1>Login failed</h1>
          <p>{errorMessage}</p>
          <Link to="/login" className={styles.link}>
            Back to login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1>Signing you in...</h1>
        <p>Finishing Discord authentication and redirecting to your dashboard.</p>
      </div>
    </div>
  )
}