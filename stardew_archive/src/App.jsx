import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import FarmPage from "./pages/FarmPage";
import NpcPage from "./pages/NpcPage";
import FishingPage from "./pages/FishingPage";
import ForagePage from "./pages/ForagePage";
import MinePage from "./pages/MinePage";
import "./App.css";
import { useState } from "react";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <BrowserRouter>
      <Navbar />

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/farm" replace />} />
          <Route path="/farm" element={<FarmPage />} />
          <Route path="/npc" element={<NpcPage />} />
          <Route
            path="/fishing"
            element={<FishingPage searchQuery={searchQuery} />}
          />
          <Route path="/forage" element={<ForagePage />} />
          <Route
            path="/mine"
            element={<MinePage searchQuery={searchQuery} />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
