import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import FarmPage    from './pages/FarmPage'
import NpcPage     from './pages/NpcPage'
import FishingPage from './pages/FishingPage'
import MinePage    from './pages/MinePage'
import ForagePage  from './pages/ForagePage'
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
          <Route path="/mine" element={<MinePage />} />
          <Route path="/forage" element={<ForagePage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
