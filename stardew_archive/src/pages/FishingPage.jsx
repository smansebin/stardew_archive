import { useState } from 'react'
import ItemSelectModal from '../components/ItemSelectModal'
import { fishData } from '../data/fishData'
import './PageCommon.css'

export default function FishingPage() {
  const [showModal, setShowModal] = useState(false)
  const [selectedFish, setSelectedFish] = useState(null)  

  return (
    <div className="page">
      <div className="page__grid">

        {selectedFish && (
          <div className = "fish-card">
            <img src = {selectedFish.image} alt = {selectedFish.name} />
            <p>{selectedFish.name}</p>
          </div>
        )}
        <button className="add-card" onClick={() => setShowModal(true)}>
          +
        </button>

      </div>

      {showModal && (
        <ItemSelectModal
          data={fishData}
          onClose={() => setShowModal(false)}
          onSelect = {(item)=> {
            setSelectedFish(item)
            setShowModal(false)
          }}
        />
      )}
    </div>
  )
}


