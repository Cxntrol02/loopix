import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navItems } from '../../data/siteContent'
import { useAuth } from '../../features/auth/AuthContext'
import styles from './Navbar.module.css'

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    function handlePointerDown(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isMenuOpen])

  return (
    <header className={styles.navbar}>
      <Link className={styles.brand} to="/" aria-label="Loopix Music Bot home">
        <img className={styles.brandIcon} src="/favicon.svg" alt="" aria-hidden="true" />
      </Link>

      <nav className={styles.links} aria-label="Primary">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {isAuthenticated && user ? (
        <div className={styles.profileMenu} ref={menuRef}>
          <button
            className={styles.profile}
            type="button"
            aria-label="Open user menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
          >
            <img className={styles.avatar} src={user.avatarUrl} alt={`${user.username} avatar`} />
            <span className={styles.caret} aria-hidden="true">
              ▾
            </span>
          </button>

          {isMenuOpen ? (
            <div className={styles.menuPanel} role="menu" aria-label="User menu">
              <div className={styles.menuIdentity}>
                <img className={styles.menuAvatar} src={user.avatarUrl} alt="" aria-hidden="true" />
                <div>
                  <p className={styles.menuUsername}>{user.username}</p>
                  <p className={styles.menuLabel}>Discord</p>
                </div>
              </div>

              <div className={styles.menuActions}>
                <Link className={styles.menuLink} to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </Link>
                <button
                  className={styles.menuButton}
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false)
                    logout()
                  }}
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <Link className={styles.signup} to="/login">
          Sign Up
        </Link>
      )}
    </header>
  )
}
