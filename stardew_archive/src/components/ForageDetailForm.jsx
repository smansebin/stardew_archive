import { useState } from "react";
import { qualityData } from "../data/qualityData";
import "./FishDetailForm.css"; // chip, detail-form 등 공통 스타일 재사용
import "./ForageDetailForm.css";

const SEASONS = ["봄", "여름", "가을", "겨울"];
const LOCATIONS = ["마을", "버스 정류장", "숲", "산", "해변", "사막", "비밀의 숲", "광산 입구"];
const PROFESSIONS = ["기본", "식물학자"];

const QUALITY_MULTIPLIER = { "보통": 1, "은": 1.25, "금": 1.5, "이리듐": 2 };
const QUALITY_OPTIONS = [{ id: 0, name: "보통", image: null }, ...qualityData];

export default function ForageDetailForm({ item, onClose, onSave, onDelete }) {
  const [seasons, setSeasons] = useState(item.seasons || []);
  const [locations, setLocations] = useState(item.locations || []);
  const [locationDetail, setLocationDetail] = useState(item.locationDetail || "");

  const [isAnytime, setIsAnytime] = useState(item.isAnytime ?? true);
  const [timeStart, setTimeStart] = useState(item.timeStart || "06:00");
  const [timeEnd, setTimeEnd] = useState(item.timeEnd || "20:00");

  const [profession, setProfession] = useState(item.profession || "기본");
  // 식물학자 전문직은 채집품이 항상 이리듐 등급으로 고정되는 실제 게임 규칙 반영
  const [quality, setQuality] = useState(item.quality || "보통");
  const [basePrice, setBasePrice] = useState(item.price ?? 0);
  const [note, setNote] = useState(item.note || "");

  const toggle = (arr, setArr, value) => {
    setArr(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  };

  const handleProfessionChange = (p) => {
    setProfession(p);
    if (p === "식물학자") setQuality("이리듐");
  };

  const effectiveQuality = profession === "식물학자" ? "이리듐" : quality;
  const finalPrice = Math.floor(basePrice * QUALITY_MULTIPLIER[effectiveQuality]);

  const handleSave = () => {
    onSave({
      ...item,
      seasons,
      locations,
      locationDetail,
      isAnytime,
      timeStart,
      timeEnd,
      profession,
      quality: effectiveQuality,
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

        {/* 출현 시기 */}
        <div className="detail-form__group">
          <h4 className="detail-form__group-title">출현 시기</h4>

          <div className="detail-form__subsection">
            <label>계절</label>
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

          <div className="detail-form__subsection">
            <label>출현 시간대</label>
            <div className="chip-row">
              <button
                type="button"
                className={isAnytime ? "chip chip--active" : "chip"}
                onClick={() => setIsAnytime(true)}
              >
                아무때나
              </button>
              <button
                type="button"
                className={!isAnytime ? "chip chip--active" : "chip"}
                onClick={() => setIsAnytime(false)}
              >
                시간 지정
              </button>
            </div>
            {!isAnytime && (
              <div className="time-row">
                <input type="time" value={timeStart} onChange={(e) => setTimeStart(e.target.value)} />
                <span>~</span>
                <input type="time" value={timeEnd} onChange={(e) => setTimeEnd(e.target.value)} />
              </div>
            )}
          </div>
        </div>

        {/* 출현 장소 */}
        <div className="detail-form__group">
          <h4 className="detail-form__group-title">출현 장소</h4>

          <div className="detail-form__subsection">
            <label>장소</label>
            <div className="chip-row">
              {LOCATIONS.map((l) => (
                <button
                  key={l}
                  type="button"
                  className={locations.includes(l) ? "chip chip--active" : "chip"}
                  onClick={() => toggle(locations, setLocations, l)}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="detail-form__subsection">
            <label>상세 내용</label>
            <textarea
              value={locationDetail}
              onChange={(e) => setLocationDetail(e.target.value)}
              placeholder="예: 나무 근처, 바위 사이 등"
              rows={2}
            />
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

          <div className="detail-form__subsection">
            <label>직업 선택</label>
            <div className="chip-row">
              {PROFESSIONS.map((p) => (
                <button
                  key={p}
                  type="button"
                  className={profession === p ? "chip chip--active" : "chip"}
                  onClick={() => handleProfessionChange(p)}
                >
                  {p}
                </button>
              ))}
            </div>
            {profession === "식물학자" && (
              <p className="forage-hint">식물학자는 채집품이 항상 이리듐 등급으로 고정돼요.</p>
            )}
          </div>

          <div className="detail-form__subsection">
            <label>품질 선택</label>
            <div className="quality-row">
              {QUALITY_OPTIONS.map((q) => (
                <button
                  key={q.id}
                  type="button"
                  disabled={profession === "식물학자"}
                  className={
                    effectiveQuality === q.name
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

        {/* 비고 */}
        <div className="detail-form__group">
          <h4 className="detail-form__group-title">비고</h4>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="예: 번들 재료, 특정 이벤트 관련 등"
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
