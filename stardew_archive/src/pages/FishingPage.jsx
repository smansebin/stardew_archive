import FishDetailForm from '../components/FishDetailForm'
import { useLocalStorageState } from '../hooks/useLocalStorageState'
import { useState } from 'react'
import ItemSelectModal from '../components/ItemSelectModal'
import { fishData } from '../data/fishData'
import './PageCommon.css'

export default function FishingPage() {
  const [showModal, setShowModal] = useState(false)
  const [caughtFish, setCaughtFish] = useLocalStorageState('caughtFish', [])
  const [editingFish, setEditingFish] = useState(null) // 상세 폼에 띄울 물고기 뭔지 저장
  return (
    <div className="page">
      <div className="page__grid">

        {caughtFish.map((fish) =>(
          <div className = "fish-card" key={fish.id} onClick={() => setEditingFish(fish)}> 
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
      {editingFish && (
         <FishDetailForm fish={editingFish} onClose={() => setEditingFish(null)} /> // 보여줄 물고기 -> editingFish / 닫힐때는 다시 비우기
        )}  
    </div>
  )
}


