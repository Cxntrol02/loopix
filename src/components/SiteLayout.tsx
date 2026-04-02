import { NavLink, Outlet } from 'react-router-dom'

const navClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'main-nav-link active' : 'main-nav-link'

export function SiteLayout() {
  return (
    <>
      <header className="main-header-wrap">
        <div className="main-header">
          <NavLink className="brand" to="/" aria-label="Loopix Home">
            <img className="brand-logo" src="/loopix.png" alt="Loopix logo" />
            <span>
              <strong>Loopix</strong>
              <small>Discord Music Bot</small>
            </span>
          </NavLink>

          <nav className="main-nav" aria-label="Primary">
            <NavLink className={navClass} to="/">
              Home
            </NavLink>
            <NavLink className={navClass} to="/music">
              Music
            </NavLink>
            <NavLink className={navClass} to="/commands">
              Commands
            </NavLink>
          </nav>

          <a className="btn invite-btn" href="https://discord.com" target="_blank" rel="noreferrer">
            Invite Loopix
          </a>
        </div>
      </header>

      <div className="app-shell">

        <Outlet />

        <footer className="main-footer">
          <p>© {new Date().getFullYear()} Loopix. Music for modern Discord servers.</p>
          <div>
            <a href="https://discord.com" target="_blank" rel="noreferrer">
              Support Server
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </footer>
      </div>
    </>
  )
}
