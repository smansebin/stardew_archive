import { useState } from 'react'
import './ItemSelectModal.css'

export default function ItemSelectModal({ data, onClose, onSelect }) {
  const [query, setQuery] = useState('')

  const filtered = data.filter((item) =>
    item.name.includes(query.trim())
  )

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>

        <div className="modal__search-wrap">
          <span className="modal__search-icon">🔍︎</span>
          <input
            className="modal__search"
            type="text"
            placeholder="이름으로 검색..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>

        <hr className="modal__divider" />

        <div className="modal__grid">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <div key={item.id} className="modal__item"
                onClick ={ ()=> onSelect(item)}> 
                <img src={item.image} alt={item.name} draggable={false} />
                <span>{item.name}</span>
              </div>
            ))
          ) : (
            <p className="modal__empty">검색 결과 없음</p>
          )}
        </div>

      </div>
    </div>
  )
}

