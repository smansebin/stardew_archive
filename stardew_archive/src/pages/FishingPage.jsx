import FishDetailForm from "../components/FishDetailForm";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useState } from "react";
import ItemSelectModal from "../components/ItemSelectModal";
import { fishData } from "../data/fishData";
import "./PageCommon.css";

export default function FishingPage({ searchQuery = "" }) {
  const [showModal, setShowModal] = useState(false);
  const [caughtFish, setCaughtFish] = useLocalStorageState("caughtFish", []);
  const [editingFish, setEditingFish] = useState(null); // 상세 폼에 띄울 물고기 뭔지 저장

  const handleDelete = (id) => {
    setCaughtFish((prev) => prev.filter((f) => f.id !== id));
    setEditingFish(null);
  };

  const visibleFish = caughtFish.filter((fish) =>
    fish.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSaveDetail = (fishWithDetails) => {
    setCaughtFish((prev) => {
      const exists = prev.some((f) => f.id === fishWithDetails.id);
      if (exists) {
        return prev.map((f) =>
          f.id === fishWithDetails.id ? fishWithDetails : f,
        );
      }
      return [...prev, fishWithDetails];
    });
    setEditingFish(null);
  };

  return (
    <div className="page">
      <div className="page__grid">
        {visibleFish.map((fish) => (
          <div
            className="item-card"
            key={fish.id}
            onClick={() => setEditingFish(fish)}
          >
            <img src={fish.image} alt={fish.name} />
            <p>{fish.name}</p>
          </div>
        ))}
        <button className="add-card" onClick={() => setShowModal(true)}>
          +
        </button>
      </div>

      {showModal && (
        <ItemSelectModal
          data={fishData}
          onClose={() => setShowModal(false)}
          onSelect={(item) => {
            setShowModal(false);
            // 이미 추가된 물고기를 검색으로 또 고르면 -> 기존거 수정하기
            const existing = caughtFish.find((f) => f.id === item.id);
            setEditingFish(existing || item);
          }}
        />
      )}
      {editingFish && (
        <FishDetailForm
          fish={editingFish}
          onSave={handleSaveDetail}
          onClose={() => setEditingFish(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
