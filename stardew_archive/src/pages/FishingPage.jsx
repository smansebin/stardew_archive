import { useState } from 'react'
import ItemSelectModal from '../components/ItemSelectModal'
import { fishData } from '../data/fishData'
import './PageCommon.css'

export default function FishingPage() {
  const [showModal, setShowModal] = useState(false)
  const [caughtFish, setCaughtFish] = useState([]) 

  return (
    <div className="page">
      <div className="page__grid">

        {caughtFish.map((fish) =>(
          <div className = "fish-card" key={fish.id}>
            <img src = {fish.image} alt = {fish.name} />
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
          onSelect = {(item)=> {
            setCaughtFish((prev)=>[...prev,item])
            setShowModal(false)
          }}
        />
      )}
    </div>
  )
}


