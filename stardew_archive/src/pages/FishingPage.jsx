import { useState } from 'react'
import ItemSelectModal from '../components/ItemSelectModal'
import { fishData } from '../data/fishData'
import './PageCommon.css'

export default function FishingPage() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="page">
      <div className="page__grid">

        <button className="add-card" onClick={() => setShowModal(true)}>
          +
        </button>

      </div>

      {showModal && (
        <ItemSelectModal
          data={fishData}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}


