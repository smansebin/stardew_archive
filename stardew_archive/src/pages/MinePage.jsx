import MineDetailForm from "../components/MineDetailForm";
import { useState } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import "./PageCommon.css";

export default function MinePage({ searchQuery = "" }) {
  const [zones, setZones] = useLocalStorageState("mineZones", []);
  const [editingZone, setEditingZone] = useState(null);

  const handleAddNew = () => {
    setEditingZone({ id: Date.now(), name: "" });
  };

  const handleSave = (zoneWithDetails) => {
    setZones((prev) => {
      const exists = prev.some((z) => z.id === zoneWithDetails.id);
      if (exists) {
        return prev.map((z) =>
          z.id === zoneWithDetails.id ? zoneWithDetails : z,
        );
      }
      return [...prev, zoneWithDetails];
    });
    setEditingZone(null);
  };

  const handleDelete = (id) => {
    setZones((prev) => prev.filter((z) => z.id !== id));
    setEditingZone(null);
  };

  // 검색어와 구역 이름을 비교해서, 포함하는 것만 남기기
  const visibleZones = zones.filter((zone) =>
    (zone.name || "").toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="page">
      <div className="page__grid">
        {visibleZones.map((zone) => (
          <div
            className="item-card"
            key={zone.id}
            onClick={() => setEditingZone(zone)}
          >
            <p>{zone.name || "이름 없음"}</p>
          </div>
        ))}

        <button className="add-card" onClick={handleAddNew}>
          +
        </button>
      </div>

      {editingZone && (
        <MineDetailForm
          zone={editingZone}
          onSave={handleSave}
          onClose={() => setEditingZone(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
