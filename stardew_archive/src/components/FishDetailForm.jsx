import { useState } from "react";
import { qualityData } from "../data/qualityData";
import "./FishDetailForm.css";

const SEASONS = ["봄", "여름", "가을", "겨울"];
const WEATHERS = ["맑음", "비", "녹색 비", "바람", "폭풍", "눈"];
const LOCATIONS = [
  "바다",
  "산 호수",
  "숲 연못",
  "강",
  "사막",
  "진저 섬 바다",
  "진저 섬 강",
  "진저 섬 호수",
];
const BEHAVIORS = ["잔잔한", "가라앉는", "뜨는", "빠른", "혼합"];

export default function FishDetailForm({ fish, onClose, onSave, onDelete }) {
  const [seasons, setSeasons] = useState(fish.seasons || []);
  const [weathers, setWeathers] = useState(fish.weathers || []);
  const [locations, setLocations] = useState(fish.locations || []);
  const [timeStart, setTimeStart] = useState(fish.timeStart || "06:00");
  const [timeEnd, setTimeEnd] = useState(fish.timeEnd || "18:00");
  const [difficulty, setDifficulty] = useState(fish.difficulty ?? 0);
  const [behavior, setBehavior] = useState(fish.behavior || "보통");
  const [maxSize, setMaxSize] = useState(fish.maxSize ?? 0);
  const [price, setPrice] = useState(fish.price ?? 0);

  // 체크 버튼
  const toggle = (arr, setArr, value) => {
    setArr(
      arr.includes(value)
        ? arr.filter((v) => v !== value) // 있으면 삭제
        : [...arr, value], // 없으면 추가
    );
  };
  const handleSave = () => {
    onSave({
      ...fish,
      seasons,
      weathers,
      locations,
      timeStart,
      timeEnd,
      difficulty,
      behavior,
      maxSize,
      price,
    });
  };
  const isEditing = Boolean(fish.seasons);

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-form" onClick={(e) => e.stopPropagation()}>
        <div className="detail-form__header">
          <img src={fish.image} alt={fish.name} width={80} />
          <h3>{fish.name}</h3>
        </div>

        <div className=" detail-form__group">
          <h4 className="detail-form__group-title">출현시기</h4>

          <div className="detail-form__subsection">
            <label>계절</label>
            {SEASONS.map((season) => (
              <button
                key={season} /* 이름표 */
                type="button"
                className={
                  seasons.includes(season) ? "chip chip--active" : "chip"
                }
                onClick={() => toggle(seasons, setSeasons, season)}
              >
                {season}
                {seasons.includes(season) ? "✓" : ""}
              </button>
            ))}
          </div>

          <div className="detail-form__subsection">
            <label>날씨</label>
            {WEATHERS.map((weather) => (
              <button
                key={weather} /* 이름표 */
                type="button"
                className={
                  weathers.includes(weather) ? "chip chip--active" : "chip"
                }
                onClick={() => toggle(weathers, setWeathers, weather)}
              >
                {weather}
                {weathers.includes(weather) ? "✓" : ""}
              </button>
            ))}
          </div>

          <div className="detail-form__subsection">
            <label>출현 시간</label>
            <input
              type="time"
              value={timeStart}
              onChange={(e) => setTimeStart(e.target.value)}
            />

            <span>~</span>

            <input
              type="time"
              value={timeEnd}
              onChange={(e) => setTimeEnd(e.target.value)}
            />
          </div>
        </div>

        <div className=" detail-form__group">
          <h4 className="detail-form__group-title">출현 장소</h4>
          <div className="detail-form__subsection">
            <label>장소</label>

            {LOCATIONS.map((location) => (
              <button
                key={location}
                type="button"
                onClick={() => toggle(locations, setLocations, location)}
              >
                {location} {locations.includes(location) ? "✓" : ""}
              </button>
            ))}
          </div>
        </div>

        <div className="detail-form__group">
          <h4 className="detail-form__group-title">어획</h4>

          <div className="detail-form__subsection">
            <label>난이도</label>

            <input
              type="number"
              value={difficulty}
              onChange={(e) => setDifficulty(Number(e.target.value))}
            />
          </div>

          <div className="detail-form__subsection">
            <label>행동패턴</label>

            <select
              value={behavior}
              onChange={(e) => setBehavior(e.target.value)}
            >
              {BEHAVIORS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div className="detail-form__subsection">
            <label>최대길이(cm)</label>
            <input
              type="number"
              value={maxSize}
              onChange={(e) => setMaxSize(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="detail-form__group">
          <h4 className="detail-form__group-title">판매 가격</h4>

          <div className="detail-form__subsection">
            <label>판매가격</label>

            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="detail-form__actions">
          {isEditing && <button onClick={() => onDelete(fish.id)}>삭제</button>}

          <button onClick={handleSave}>저장</button>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
}
