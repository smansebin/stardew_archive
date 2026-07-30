import { useState } from 'react'
import ItemSelectModal from '../components/ItemSelectModal'
import { forageData } from '../data/forageData'
import './PageCommon.css'

export default function ForagePage() {
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
          data={forageData}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}