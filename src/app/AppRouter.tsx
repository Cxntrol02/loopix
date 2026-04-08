import type { PropsWithChildren } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { SiteLayout } from '../components/layout/SiteLayout'
import { useAuth } from '../features/auth/AuthContext'
import { CommandsPage } from '../pages/CommandsPage'
import { DashboardPage } from '../pages/DashboardPage'
import { DiscordAuthCallbackPage } from '../pages/DiscordAuthCallbackPage'
import { DocsPage } from '../pages/DocsPage'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { TeamPage } from '../pages/TeamPage'

function RequireAuth({ children }: PropsWithChildren) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return children
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/discord/callback" element={<DiscordAuthCallbackPage />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>
          }
        />
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/commands" element={<CommandsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
