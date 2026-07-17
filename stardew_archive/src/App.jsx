import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import FarmPage    from './pages/FarmPage'
import NpcPage     from './pages/NpcPage'
import FishingPage from './pages/FishingPage'
import ForagePage  from './pages/ForagePage'
import MinePage    from './pages/MinePage'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <SearchBar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/farm" replace />} />
          <Route path="/farm" element={<FarmPage />} />
          <Route path="/npc" element={<NpcPage />} />
          <Route path="/fishing" element={<FishingPage />} />
          <Route path="/forage" element={<ForagePage />} />
          <Route path="/mine" element={<MinePage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
