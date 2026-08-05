import { useState } from "react";
import { npcData } from "../data/npcData";
import "./FishDetailForm.css"; // chip, detail-form 등 공통 스타일 재사용
import "./NpcDetailForm.css";

const SEASONS = ["봄", "여름", "가을", "겨울", "전체"];
const REACTIONS = ["최고로 좋아함", "좋아함", "보통", "싫어함", "최고로 싫어함"];
// 실제 게임의 대략적인 호감도 증감치
const REACTION_AFFECTION = {
  "최고로 좋아함": 80,
  "좋아함": 45,
  "보통": 20,
  "싫어함": -20,
  "최고로 싫어함": -40,
};

let rowSeq = 0;
const newRowId = () => `row-${Date.now()}-${rowSeq++}`;

export default function NpcDetailForm({ npc, onClose, onSave, onDelete }) {
  const [marriageable, setMarriageable] = useState(npc.marriageable ?? false);
  const [schedule, setSchedule] = useState(npc.schedule || []);
  const [relations, setRelations] = useState(npc.relations || []);
  const [gifts, setGifts] = useState(npc.gifts || []);
  const [note, setNote] = useState(npc.note || "");

  // ---- 하루 일과 ----
  const addScheduleRow = () => {
    setSchedule((prev) => [
      ...prev,
      { rowId: newRowId(), season: "전체", time: "", activity: "" },
    ]);
  };
  const updateScheduleRow = (rowId, field, value) => {
    setSchedule((prev) => prev.map((r) => (r.rowId === rowId ? { ...r, [field]: value } : r)));
  };
  const removeScheduleRow = (rowId) => {
    setSchedule((prev) => prev.filter((r) => r.rowId !== rowId));
  };

  // ---- 주변 관계 ----
  const relationCandidates = npcData.filter((n) => n.id !== npc.id);
  const addRelationRow = () => {
    setRelations((prev) => [
      ...prev,
      { rowId: newRowId(), npcId: relationCandidates[0]?.id ?? "", note: "" },
    ]);
  };
  const updateRelationRow = (rowId, field, value) => {
    setRelations((prev) => prev.map((r) => (r.rowId === rowId ? { ...r, [field]: value } : r)));
  };
  const removeRelationRow = (rowId) => {
    setRelations((prev) => prev.filter((r) => r.rowId !== rowId));
  };

  // ---- 선물 ----
  const addGiftRow = () => {
    setGifts((prev) => [
      ...prev,
      { rowId: newRowId(), itemName: "", reaction: "좋아함", affection: REACTION_AFFECTION["좋아함"] },
    ]);
  };
  const updateGiftRow = (rowId, field, value) => {
    setGifts((prev) =>
      prev.map((r) => {
        if (r.rowId !== rowId) return r;
        if (field === "reaction") {
          return { ...r, reaction: value, affection: REACTION_AFFECTION[value] };
        }
        return { ...r, [field]: value };
      })
    );
  };
  const removeGiftRow = (rowId) => {
    setGifts((prev) => prev.filter((r) => r.rowId !== rowId));
  };

  const handleSave = () => {
    onSave({
      ...npc,
      marriageable,
      schedule,
      relations,
      gifts,
      note,
    });
  };

  const isEditing = Boolean(npc.schedule);

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-form" onClick={(e) => e.stopPropagation()}>
        <div className="detail-form__header">
          <img src={npc.image} alt={npc.name} width={64} />
          <h3>{npc.name}</h3>
        </div>

        {/* 결혼 가능 여부 */}
        <div className="detail-form__group">
          <h4 className="detail-form__group-title">결혼</h4>
          <div className="chip-row">
            <button
              type="button"
              className={marriageable ? "chip chip--active" : "chip"}
              onClick={() => setMarriageable(true)}
            >
              가능
            </button>
            <button
              type="button"
              className={!marriageable ? "chip chip--active" : "chip"}
              onClick={() => setMarriageable(false)}
            >
              불가능
            </button>
          </div>
        </div>

        {/* 하루 일과 */}
        <div className="detail-form__group">
          <h4 className="detail-form__group-title">하루 일과</h4>

          {schedule.map((row) => (
            <div className="npc-row" key={row.rowId}>
              <select
                value={row.season}
                onChange={(e) => updateScheduleRow(row.rowId, "season", e.target.value)}
              >
                {SEASONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <input
                className="npc-row__time"
                type="text"
                placeholder="예: 09:00~12:00"
                value={row.time}
                onChange={(e) => updateScheduleRow(row.rowId, "time", e.target.value)}
              />
              <input
                className="npc-row__text"
                type="text"
                placeholder="행동 (예: 마을 광장에서 산책)"
                value={row.activity}
                onChange={(e) => updateScheduleRow(row.rowId, "activity", e.target.value)}
              />
              <button
                type="button"
                className="npc-row__remove"
                onClick={() => removeScheduleRow(row.rowId)}
                aria-label="삭제"
              >
                ✕
              </button>
            </div>
          ))}

          <button type="button" className="npc-add-row" onClick={addScheduleRow}>
            + 일과 추가
          </button>
        </div>

        {/* 주변 관계 */}
        <div className="detail-form__group">
          <h4 className="detail-form__group-title">주변 관계</h4>

          {relations.map((row) => {
            const relatedNpc = npcData.find((n) => n.id === Number(row.npcId));
            return (
              <div className="npc-row" key={row.rowId}>
                {relatedNpc && (
                  <img className="npc-row__thumb" src={relatedNpc.image} alt={relatedNpc.name} />
                )}
                <select
                  value={row.npcId}
                  onChange={(e) => updateRelationRow(row.rowId, "npcId", Number(e.target.value))}
                >
                  {relationCandidates.map((n) => (
                    <option key={n.id} value={n.id}>{n.name}</option>
                  ))}
                </select>
                <input
                  className="npc-row__text"
                  type="text"
                  placeholder="관계 설명 (예: 소꿉친구, 남매 등)"
                  value={row.note}
                  onChange={(e) => updateRelationRow(row.rowId, "note", e.target.value)}
                />
                <button
                  type="button"
                  className="npc-row__remove"
                  onClick={() => removeRelationRow(row.rowId)}
                  aria-label="삭제"
                >
                  ✕
                </button>
              </div>
            );
          })}

          <button type="button" className="npc-add-row" onClick={addRelationRow}>
            + 관계 추가
          </button>
        </div>

        {/* 선물 */}
        <div className="detail-form__group">
          <h4 className="detail-form__group-title">선물</h4>

          {gifts.map((row) => (
            <div className="npc-row" key={row.rowId}>
              <input
                className="npc-row__text"
                type="text"
                placeholder="선물 이름"
                value={row.itemName}
                onChange={(e) => updateGiftRow(row.rowId, "itemName", e.target.value)}
              />
              <select
                value={row.reaction}
                onChange={(e) => updateGiftRow(row.rowId, "reaction", e.target.value)}
              >
                {REACTIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <input
                className="npc-row__affection"
                type="number"
                value={row.affection}
                onChange={(e) => updateGiftRow(row.rowId, "affection", Number(e.target.value))}
              />
              <button
                type="button"
                className="npc-row__remove"
                onClick={() => removeGiftRow(row.rowId)}
                aria-label="삭제"
              >
                ✕
              </button>
            </div>
          ))}

          <button type="button" className="npc-add-row" onClick={addGiftRow}>
            + 선물 추가
          </button>
        </div>

        {/* 비고 */}
        <div className="detail-form__group">
          <h4 className="detail-form__group-title">비고</h4>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="예: 마음의 편지 이벤트, 8하트 컷씬 위치 등"
            rows={2}
          />
        </div>

        <div className="detail-form__actions">
          {isEditing && <button onClick={() => onDelete(npc.id)}>삭제</button>}
          <button onClick={handleSave}>저장</button>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
}
