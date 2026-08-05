import { useState } from "react";
import { qualityData } from "../data/qualityData";
import "./FishDetailForm.css"; // chip, detail-form 등 공통 스타일 재사용
import "./FarmDetailForm.css";

const SEASONS = ["봄", "여름", "가을", "겨울"];
const LOCATIONS = ["일반 밭", "온실", "화분"];
const FERTILIZERS = [
  "없음",
  "스피드-가로 비료",
  "디럭스 스피드-가로 비료",
  "퀄리티 비료",
  "딜럭스 퀄리티 비료",
];
const PROFESSIONS = ["기본", "재배 전문가"];

// 실제 게임 근사치: 스피드-가로 계열 비료만 성장일수를 줄여줌
const FERTILIZER_GROWTH_REDUCTION = {
  "없음": 0,
  "스피드-가로 비료": 0.1,
  "디럭스 스피드-가로 비료": 0.25,
  "퀄리티 비료": 0,
  "딜럭스 퀄리티 비료": 0,
};

const PROFESSION_MULTIPLIER = { "기본": 1, "재배 전문가": 1.1 };
const QUALITY_MULTIPLIER = { "보통": 1, "은": 1.25, "금": 1.5, "이리듐": 2 };
const QUALITY_OPTIONS = [{ id: 0, name: "보통", image: null }, ...qualityData];

// 파종일 + 성장일수를 계절(28일 기준)에 맞춰 계산
function calcHarvestDate(seasonIdx, day, growDays) {
  let total = day + growDays;
  let idx = seasonIdx;
  while (total > 28) {
    total -= 28;
    idx = (idx + 1) % 4;
  }
  return { season: SEASONS[idx], day: total, crossedSeason: idx !== seasonIdx };
}

export default function FarmDetailForm({ item, kind, onClose, onSave, onDelete }) {
  const isTree = kind === "treeFruit";

  const [seasons, setSeasons] = useState(item.seasons || []);
  const [location, setLocation] = useState(item.location || LOCATIONS[0]);

  const [plantSeason, setPlantSeason] = useState(item.plantSeason || SEASONS[0]);
  const [plantDay, setPlantDay] = useState(item.plantDay ?? 1);
  const [growDays, setGrowDays] = useState(item.growDays ?? (isTree ? 28 : 4));

  const [fertilizer, setFertilizer] = useState(item.fertilizer || "없음");
  const [regrowDays, setRegrowDays] = useState(item.regrowDays ?? 0);

  const [profession, setProfession] = useState(item.profession || "기본");
  const [quality, setQuality] = useState(item.quality || "보통");
  const [basePrice, setBasePrice] = useState(item.price ?? 0);
  const [note, setNote] = useState(item.note || "");

  const toggle = (arr, setArr, value) => {
    setArr(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  };

  const reduction = isTree ? 0 : FERTILIZER_GROWTH_REDUCTION[fertilizer];
  const effectiveGrowDays = Math.max(1, Math.round(growDays * (1 - reduction)));
  const seasonIdx = SEASONS.indexOf(plantSeason);
  const harvest = calcHarvestDate(seasonIdx, Number(plantDay) || 1, effectiveGrowDays);

  const finalPrice = Math.floor(
    basePrice *
      (isTree ? 1 : PROFESSION_MULTIPLIER[profession]) *
      QUALITY_MULTIPLIER[quality]
  );

  const handleSave = () => {
    onSave({
      ...item,
      seasons,
      location: isTree ? undefined : location,
      plantSeason,
      plantDay: Number(plantDay) || 1,
      growDays: Number(growDays) || 1,
      fertilizer: isTree ? undefined : fertilizer,
      regrowDays: isTree ? undefined : Number(regrowDays) || 0,
      profession: isTree ? undefined : profession,
      quality,
      price: Number(basePrice) || 0,
      note,
    });
  };

  const isEditing = Boolean(item.seasons);

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-form" onClick={(e) => e.stopPropagation()}>
        <div className="detail-form__header">
          <img src={item.image} alt={item.name} width={64} />
          <h3>{item.name}</h3>
        </div>

        {/* 재배 조건 */}
        <div className="detail-form__group">
          <h4 className="detail-form__group-title">
            {isTree ? "결실 계절" : "재배 조건"}
          </h4>

          <div className="detail-form__subsection">
            <label>{isTree ? "열매 맺는 계절" : "재배 가능 계절"}</label>
            <div className="chip-row">
              {SEASONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={seasons.includes(s) ? "chip chip--active" : "chip"}
                  onClick={() => toggle(seasons, setSeasons, s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {!isTree && (
            <div className="detail-form__subsection">
              <label>재배 위치</label>
              <div className="chip-row">
                {LOCATIONS.map((l) => (
                  <button
                    key={l}
                    type="button"
                    className={location === l ? "chip chip--active" : "chip"}
                    onClick={() => setLocation(l)}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 수확 예정 기간 자동 계산 */}
        <div className="detail-form__group">
          <h4 className="detail-form__group-title">
            {isTree ? "다 자라기까지" : "수확 예정 기간"}
          </h4>

          <div className="detail-form__row">
            <div className="detail-form__subsection">
              <label>파종 계절</label>
              <select value={plantSeason} onChange={(e) => setPlantSeason(e.target.value)}>
                {SEASONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="detail-form__subsection">
              <label>파종일 (1~28)</label>
              <input
                type="number"
                min={1}
                max={28}
                value={plantDay}
                onChange={(e) => setPlantDay(e.target.value)}
              />
            </div>
            <div className="detail-form__subsection">
              <label>기본 성장일수</label>
              <input
                type="number"
                min={1}
                value={growDays}
                onChange={(e) => setGrowDays(e.target.value)}
              />
            </div>
          </div>

          {!isTree && (
            <div className="detail-form__subsection">
              <label>비료</label>
              <div className="chip-row">
                {FERTILIZERS.map((f) => (
                  <button
                    key={f}
                    type="button"
                    className={fertilizer === f ? "chip chip--active" : "chip"}
                    onClick={() => setFertilizer(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!isTree && (
            <div className="detail-form__subsection">
              <label>재수확까지 걸리는 일수 (0이면 재수확 없음)</label>
              <input
                type="number"
                min={0}
                value={regrowDays}
                onChange={(e) => setRegrowDays(e.target.value)}
              />
            </div>
          )}

          <div className="farm-harvest-output">
            예상 수확일: <strong>{harvest.season} {harvest.day}일차</strong>
            {harvest.crossedSeason && <span className="farm-harvest-note"> (계절이 바뀜)</span>}
            {!isTree && regrowDays > 0 && (
              <span className="farm-harvest-note"> · 이후 {regrowDays}일마다 재수확</span>
            )}
            {isTree && <span className="farm-harvest-note"> · 다 자란 뒤엔 해당 계절 내내 매일 결실</span>}
          </div>
        </div>

        {/* 판매 가격 */}
        <div className="detail-form__group">
          <h4 className="detail-form__group-title">판매 가격</h4>

          <div className="detail-form__subsection">
            <label>기본 가격 (보통 등급 기준)</label>
            <input
              type="number"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
            />
          </div>

          {!isTree && (
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
          )}

          <div className="detail-form__subsection">
            <label>품질 선택</label>
            <div className="quality-row">
              {QUALITY_OPTIONS.map((q) => (
                <button
                  key={q.id}
                  type="button"
                  className={
                    quality === q.name ? "quality-chip quality-chip--active" : "quality-chip"
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

        {/* 비고 */}
        <div className="detail-form__group">
          <h4 className="detail-form__group-title">비고</h4>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="예: 번들에 필요, 딸기시즈 이벤트용 등"
            rows={2}
          />
        </div>

        <div className="detail-form__actions">
          {isEditing && <button onClick={() => onDelete(item.id)}>삭제</button>}
          <button onClick={handleSave}>저장</button>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
}
