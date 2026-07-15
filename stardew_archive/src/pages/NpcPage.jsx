import { useState } from 'react'
import ItemSelectModal from '../components/ItemSelectModal'
import { npcData } from '../data/npcData'
import './PageCommon.css'

export default function NpcPage() {
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
          data={npcData}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}

