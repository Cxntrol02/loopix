import { Outlet } from 'react-router-dom'
import styles from '../../app/AppShell.module.css'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function SiteLayout() {
  return (
    <div className={styles.shell}>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
