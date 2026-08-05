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
const PROFESSIONS = ["기본", "어부", "낚시 장인"];

// 실제 스타듀밸리 판매가 비율 (직업 보너스/ 품질 배율)
const PROFESSION_MULTIPLIER = { 기본: 1, 어부: 1.25, "낚시 장인": 1.5 };
const QUALITY_MULTIPLIER = { 보통: 1, 은: 1.25, 금: 1.5, 이리듐: 2 };

const QUALITY_OPTIONS = [{ id: 0, name: "보통", image: null }, ...qualityData];

export default function FishDetailForm({ fish, onClose, onSave, onDelete }) {
  const [seasons, setSeasons] = useState(fish.seasons || []);
  const [weathers, setWeathers] = useState(fish.weathers || []);
  const [timeStart, setTimeStart] = useState(fish.timeStart || "06:00");
  const [timeEnd, setTimeEnd] = useState(fish.timeEnd || "18:00");
  const [isAnytime, setIsAnytime] = useState(fish.isAnytime ?? false);

  const [locations, setLocations] = useState(fish.locations || []);
  const [locationDetail, setLocationDetail] = useState(
    fish.locationDetail || "",
  );

  const [difficulty, setDifficulty] = useState(fish.difficulty ?? 0);
  const [behavior, setBehavior] = useState(fish.behavior || "보통");
  const [maxSize, setMaxSize] = useState(fish.maxSize ?? 0);

  const [profession, setProfession] = useState(fish.profession || "기본");
  const [quality, setQuality] = useState(fish.quality || "보통");
  const [basePrice, setBasePrice] = useState(fish.price ?? 0);

  // 배열에서 값 있으면 빼고 없으면 추가
  const toggle = (arr, setArr, value) => {
    setArr(
      arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
    );
  };

  // 직업 배율 x 품질 배율로 실제 판매가 계산
  const finalPrice = Math.floor(
    basePrice * PROFESSION_MULTIPLIER[profession] * QUALITY_MULTIPLIER[quality],
  );

  const handleSave = () => {
    onSave({
      ...fish,
      seasons,
      weathers,
      isAnytime,
      locations,
      locationDetail,
      timeStart,
      timeEnd,
      difficulty,
      behavior,
      maxSize,
      profession,
      quality,
      basePrice,
    });
  };
  const isEditing = Boolean(fish.seasons);

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-form" onClick={(e) => e.stopPropagation()}>
        <div className="detail-form__header">
          <img src={fish.image} alt={fish.name} width={64} />
          <h3>{fish.name}</h3>
        </div>

        {/* 출현 시기 : 계절 / 날씨 / 출현 시간 */}
        <div className=" detail-form__group">
          <h4 className="detail-form__group-title">출현시기</h4>

          <div className="detail-form__subsection">
            <label>계절</label>
            <div className="chip-row">
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
                </button>
              ))}
            </div>
          </div>

          <div className="detail-form__subsection">
            <label>날씨</label>
            <div className="chip-row">
              {WEATHERS.map((weather) => (
                <button
                  key={weather}
                  type="button"
                  className={
                    weathers.includes(weather) ? "chip chip--active" : "chip"
                  }
                  onClick={() => toggle(weathers, setWeathers, weather)}
                >
                  {weather}
                </button>
              ))}
            </div>
          </div>

          <div className="detail-form__subsection">
            <label>출현 시간대</label>
            <div className="chip-row">
              {/* <input
              type="time"
              value={timeStart}
              onChange={(e) => setTimeStart(e.target.value)}
            /> */}
              <button
                type="button"
                className={!isAnytime ? "chip chip--active" : "chip"}
                onClick={() => setIsAnytime(false)}
              >
                시간 지정
              </button>
              <button
                type="button"
                className={isAnytime ? "chip chip--active" : "chip"}
                onClick={() => setIsAnytime(true)}
              >
                아무때나
              </button>
            </div>

            {!isAnytime && (
              <div className="time-row">
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
            )}
          </div>
        </div>

        {/* 출현 장소: 장소 선택 / 상세 내용 */}
        <div className=" detail-form__group">
          <h4 className="detail-form__group-title">출현 장소</h4>

          <div className="detail-form__subsection">
            <label>장소</label>
            <div className="chip-row">
              {LOCATIONS.map((location) => (
                <button
                  key={location}
                  type="button"
                  className={
                    locations.includes(location) ? "chip chip--active" : "chip"
                  }
                  onClick={() => toggle(locations, setLocations, location)}
                >
                  {location} {locations.includes(location) ? "✓" : ""}
                </button>
              ))}
            </div>
          </div>

          <div className="detail-form__subsection">
            <label>상세 내용</label>
            <textarea
              value={locationDetail}
              onChange={(e) => setLocationDetail(e.target.value)}
              placeholder="예: 부두 근처, 폭포 아래쪽 등"
              rows={2}
            />
          </div>
        </div>

        {/* 어획 방법 기록: 난이도 / 행동 패턴 / 최대 길이 */}
        <div className="detail-form__group">
          <h4 className="detail-form__group-title">어획 방법</h4>

          <div className="detail-form__row">
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
        </div>
        {/* 판매 가격: 직업 / 경험치(품질) / 가격 출력 */}
        <div className="detail-form__group">
          <h4 className="detail-form__group-title">판매 가격</h4>

          <div className="detail-form__subsection">
            <label>기본 가격 (보통 등급, 기본 직업 기준)</label>
            <input
              type="number"
              value={basePrice}
              onChange={(e) => setBasePrice(Number(e.target.value))}
            />
          </div>

          <div className="detail-form__subsection">
            <label>직업 선택</label>
            <div className="chip-row">
              {PROFESSIONS.map((p) => (
                <button
                  key={p}
                  type="button"
                  className={profession === p ? "chip chip--active" : "chip"}
                  onClick={() => setProfession(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="detail-form__subsection">
            <label>낚시 경험치(품질) 선택</label>
            <div className="quality-row">
              {QUALITY_OPTIONS.map((q) => (
                <button
                  key={q.id}
                  type="button"
                  className={
                    quality === q.name
                      ? "quality-chip quality-chip--active"
                      : "quality-chip"
                  }
                  onClick={() => setQuality(q.name)}
                >
                  {q.image && <img src={q.image} alt={q.name} />}
                  <span>{q.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="detail-form__price-output">
            선택한 조건의 판매가: <strong>{finalPrice}G</strong>
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
