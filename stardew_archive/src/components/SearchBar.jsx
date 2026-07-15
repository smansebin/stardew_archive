import { useState } from 'react'
import './SearchBar.css'

export default function SearchBar() {
  const [query, setQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) console.log('검색:', query)
  }

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        className="search-bar__input"
        placeholder="아이템 검색 ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="search-bar__btn" aria-label="검색">
        🔍︎
      </button>
    </form>
  )
}
