import { useState } from 'react'
import ItemSelectModal from '../components/ItemSelectModal'
import NpcDetailForm from '../components/NpcDetailForm'
import { useLocalStorageState } from '../hooks/useLocalStorageState'
import { npcData } from '../data/npcData'
import './PageCommon.css'

export default function NpcPage() {
  const [showModal, setShowModal] = useState(false)
  const [myNpcs, setMyNpcs] = useLocalStorageState('myNpcs', [])
  const [editingNpc, setEditingNpc] = useState(null)

  const handleDelete = (id) => {
    setMyNpcs((prev) => prev.filter((n) => n.id !== id))
    setEditingNpc(null)
  }

  const handleSaveDetail = (npcWithDetails) => {
    setMyNpcs((prev) => {
      const exists = prev.some((n) => n.id === npcWithDetails.id)
      if (exists) {
        return prev.map((n) => (n.id === npcWithDetails.id ? npcWithDetails : n))
      }
      return [...prev, npcWithDetails]
    })
    setEditingNpc(null)
  }

  return (
    <div className="page">
      <div className="page__grid">
        {myNpcs.map((npc) => (
          <div className="item-card" key={npc.id} onClick={() => setEditingNpc(npc)}>
            <img src={npc.image} alt={npc.name} />
            <p>{npc.name}</p>
          </div>
        ))}

        <button className="add-card" onClick={() => setShowModal(true)}>
          +
        </button>
      </div>

      {showModal && (
        <ItemSelectModal
          data={npcData}
          onClose={() => setShowModal(false)}
          onSelect={(npc) => {
            setShowModal(false)
            const existing = myNpcs.find((n) => n.id === npc.id)
            setEditingNpc(existing || npc)
          }}
        />
      )}

      {editingNpc && (
        <NpcDetailForm
          npc={editingNpc}
          onSave={handleSaveDetail}
          onClose={() => setEditingNpc(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}
