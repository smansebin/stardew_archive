import { useState } from 'react'
import ItemSelectModal from '../components/ItemSelectModal'
import ForageDetailForm from '../components/ForageDetailForm'
import { useLocalStorageState } from '../hooks/useLocalStorageState'
import { forageData } from '../data/forageData'
import './PageCommon.css'

export default function ForagePage() {
  const [showModal, setShowModal] = useState(false)
  const [myForage, setMyForage] = useLocalStorageState('myForage', [])
  const [editingItem, setEditingItem] = useState(null)

  const handleDelete = (id) => {
    setMyForage((prev) => prev.filter((it) => it.id !== id))
    setEditingItem(null)
  }

  const handleSaveDetail = (itemWithDetails) => {
    setMyForage((prev) => {
      const exists = prev.some((it) => it.id === itemWithDetails.id)
      if (exists) {
        return prev.map((it) => (it.id === itemWithDetails.id ? itemWithDetails : it))
      }
      return [...prev, itemWithDetails]
    })
    setEditingItem(null)
  }

  return (
    <div className="page">
      <div className="page__grid">
        {myForage.map((record) => (
          <div className="item-card" key={record.id} onClick={() => setEditingItem(record)}>
            <img src={record.image} alt={record.name} />
            <p>{record.name}</p>
          </div>
        ))}

        <button className="add-card" onClick={() => setShowModal(true)}>
          +
        </button>
      </div>

      {showModal && (
        <ItemSelectModal
          data={forageData}
          onClose={() => setShowModal(false)}
          onSelect={(item) => {
            setShowModal(false)
            const existing = myForage.find((r) => r.id === item.id)
            setEditingItem(existing || item)
          }}
        />
      )}

      {editingItem && (
        <ForageDetailForm
          item={editingItem}
          onSave={handleSaveDetail}
          onClose={() => setEditingItem(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}
