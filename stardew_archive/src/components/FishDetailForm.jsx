import './FishDetailForm.css'

export default function FishDetailForm({fish, onClose}){
    return(
        <div className = "detail-overlay" onClick={onClose}>
            <div className = "detail-form" onClick ={(e) => e.stopPropagation()}>
                <h3>{fish.name}</h3>
                <img src = {fish.image} alt ={fish.name} width = {80}/>
                <p>=상세 정보 입력폼=</p>
                <button onClick={onClose} >닫기</button>
            </div>
        </div>
    )
}