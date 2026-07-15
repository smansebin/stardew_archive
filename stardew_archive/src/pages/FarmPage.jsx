import { useState } from 'react'
import ItemSelectModal from '../components/ItemSelectModal'
import { cropData } from '../data/cropData'
import './PageCommon.css'

export default function FarmPage() {
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
          data={cropData}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}

