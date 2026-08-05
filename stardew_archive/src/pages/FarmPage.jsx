import { useState } from 'react'
import ItemSelectModal from '../components/ItemSelectModal'
import FarmDetailForm from '../components/FarmDetailForm'
import { useLocalStorageState } from '../hooks/useLocalStorageState'
import { cropData } from '../data/cropData'
import { treeFruitData } from '../data/treeFruitData'
import './PageCommon.css'
import '../components/FarmDetailForm.css'

const TABS = [
  { id: 'crop', label: '작물', data: cropData },
  { id: 'treeFruit', label: '나무열매', data: treeFruitData },
]

export default function FarmPage() {
  const [tab, setTab] = useState('crop')
  const [showModal, setShowModal] = useState(false)

  const [myCrops, setMyCrops] = useLocalStorageState('myCrops', [])
  const [myTreeFruits, setMyTreeFruits] = useLocalStorageState('myTreeFruits', [])

  const [editingItem, setEditingItem] = useState(null)
  const [editingKind, setEditingKind] = useState('crop') // 팝업이 어느 탭 소속인지 기억

  const currentTab = TABS.find((t) => t.id === tab)
  const currentRecords = tab === 'crop' ? myCrops : myTreeFruits

  const handleDelete = (id) => {
    const setter = editingKind === 'crop' ? setMyCrops : setMyTreeFruits
    setter((prev) => prev.filter((it) => it.id !== id))
    setEditingItem(null)
  }

  const handleSaveDetail = (itemWithDetails) => {
    const setter = editingKind === 'crop' ? setMyCrops : setMyTreeFruits
    setter((prev) => {
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
      <div className="farm-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`farm-tabs__btn ${tab === t.id ? 'farm-tabs__btn--active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="page__grid">
        {currentRecords.map((record) => (
          <div
            className="item-card"
            key={record.id}
            onClick={() => {
              setEditingKind(tab)
              setEditingItem(record)
            }}
          >
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
          data={currentTab.data}
          onClose={() => setShowModal(false)}
          onSelect={(item) => {
            setShowModal(false)
            setEditingKind(tab)
            const existing = currentRecords.find((r) => r.id === item.id)
            setEditingItem(existing || item)
          }}
        />
      )}

      {editingItem && (
        <FarmDetailForm
          item={editingItem}
          kind={editingKind}
          onSave={handleSaveDetail}
          onClose={() => setEditingItem(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}
