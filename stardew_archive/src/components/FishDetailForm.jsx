import {useState} from 'react'
import './FishDetailForm.css'

const SEASONS = ['봄','여름','가을','겨울']

export default function FishDetailForm({fish, onClose}){
    const[seasons, setSeasons ]=useState([])
    return(
        <div className = "detail-overlay" onClick={onClose}>
            <div className = "detail-form" onClick ={(e) => e.stopPropagation()}>
                <h3>{fish.name}</h3>
                <img src = {fish.image} alt ={fish.name} width = {80}/>
                <p>계절</p>
                {SEASONS.map((season) => (
                <button
                key={season} /* 이름표 */
                onClick={() =>
                    setSeasons((prev) =>
                    prev.includes(season) ? prev.filter((s) => s !== season) : [...prev, season]
                    )
                }
                >
                {season} {seasons.includes(season) ? '✓' : ''}
                </button>
            ))}
                <button onClick={onClose} >닫기</button>
            </div>
        </div>
    )
}