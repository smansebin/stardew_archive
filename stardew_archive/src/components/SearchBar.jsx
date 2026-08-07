import "./SearchBar.css";

export default function SearchBar({ value, onChange }) {
  return (
    <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        className="search-bar__input"
        placeholder="아이템 검색 ..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button type="submit" className="search-bar__btn" aria-label="검색">
        🔍︎
      </button>
    </form>
  );
}
