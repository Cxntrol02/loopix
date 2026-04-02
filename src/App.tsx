import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { SiteLayout } from './components/SiteLayout'
import { CommandsPage } from './pages/CommandsPage'
import { HomePage } from './pages/HomePage'
import { MusicPage } from './pages/MusicPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="commands" element={<CommandsPage />} />
          <Route path="music" element={<MusicPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
