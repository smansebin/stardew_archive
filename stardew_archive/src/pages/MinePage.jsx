import { useState } from 'react'
import './PageCommon.css'

export default function FarmPage() {
  const [setShowModal] = useState(false)

  return (
    <div className="page">
      <div className="page__grid">

        <button className="add-card" onClick={() => setShowModal(true)}>
          +
        </button>

      </div>
    </div>
  )
}