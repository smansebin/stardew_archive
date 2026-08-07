import { useState } from "react";
import { monsterData } from "../data/monsterData";
import { rewardData } from "../data/rewardData";
import "./MineDetailForm.css";

const THEMES = [
  "갈색 땅",
  "회색 땅",
  "얼음",
  "용암",
  "보라빛",
  "진홍빛",
  "푸른빛",
  "검은빛",
  "마법의 숲",
];
const MONSTER_OPTIONS = [...monsterData];
const REWARD_OPTIONS = [...rewardData];

export default function MineDetailForm({ zone, onClose, onSave, onDelete }) {
  const [name, setName] = useState(zone.name || "");
  {
    /* 구역 특징 */
  }
  // 테마 선택
  const [theme, setTheme] = useState(zone.theme || "");
  // 층 선택
  const [floor, setFloor] = useState(zone.floor ?? 0);

  {
    /* 출현 몬스터 */
  }
  // 몬스터 선택
  const [monsters, setMonsters] = useState(zone.monsters || []);
  // 대처법 작성
  const [monsterFight, setMonsterFight] = useState(zone.monsterFight || "");

  {
    /* 획득 보상 */
  }
  // 보상 선택
  const [rewards, setRewards] = useState(zone.rewards || []);
  // 보상 상세 내용 작성
  const [rewardDetail, setRewardDetail] = useState(zone.rewardDetail || "");

  // 배열에서 값 있으면 빼고 없으면 추가
  const toggle = (arr, setArr, value) => {
    setArr(
      arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
    );
  };

  // 저장 버튼 -> 폼 안 입력값 모두 하나의 객체로 묶어서, 밖으로 전달(minePage.jsx)
  const handleSave = () => {
    onSave({
      ...zone,
      name,
      theme,
      floor,
      monsters,
      monsterFight,
      rewards,
      rewardDetail,
    });
  };
  const isEditing = Boolean(zone.theme);

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-form" onClick={(e) => e.stopPropagation()}>
        <input
          className="mine-name-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="구역 이름 설정..."
        />
        {/* 구역 특징 : 테마 선택 / 층 선택 */}
        <div className=" detail-form__group">
          <h4 className="detail-form__group-title">테마 선택</h4>

          <div className="detail-form__subsection">
            <label>테마 선택</label>
            <div className="chip-row">
              {THEMES.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={theme === t ? "chip chip--active" : "chip"}
                  onClick={() => setTheme(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="detail-form__subsection">
            <label>층 선택</label>
            <input
              type="number"
              value={floor}
              onChange={(e) => setFloor(Number(e.target.value))}
            />
          </div>
        </div>

        {/* 출현 몬스터 : 몬스터 선택 / 대처법 작성 */}
        <div className=" detail-form__group">
          <h4 className="detail-form__group-title">몬스터 선택</h4>

          <div className="detail-form__subsection">
            <label>몬스터 출현</label>
            <div className="mine-option-row">
              {MONSTER_OPTIONS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={
                    monsters.includes(m.name)
                      ? "mine-option-chip mine-option-chip--active"
                      : "mine-option-chip"
                  }
                  onClick={() => toggle(monsters, setMonsters, m.name)}
                >
                  {m.image && <img src={m.image} alt={m.name} />}
                  <span>{m.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="detail-form__subsection">
            <label>대처법 작성</label>
            <textarea
              value={monsterFight}
              onChange={(e) => setMonsterFight(e.target.value)}
              placeholder="예: 스페셜검 사용 등"
              rows={3}
            />
          </div>
        </div>

        {/* 획득 보상 : 보상 선택 / 상세 내용 작성 */}
        <div className="detail-form__group">
          <h4 className="detail-form__group-title">획득 보상</h4>

          <div className="detail-form__subsection">
            <label>보상 선택</label>
            <div className="mine-option-row">
              {REWARD_OPTIONS.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  className={
                    rewards.includes(r.name)
                      ? "mine-option-chip mine-option-chip--active"
                      : "mine-option-chip"
                  }
                  onClick={() => toggle(rewards, setRewards, r.name)}
                >
                  {r.image && <img src={r.image} alt={r.name} />}
                  <span>{r.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="detail-form__subsection">
            <label>상세 내용 작성</label>
            <textarea
              value={rewardDetail}
              onChange={(e) => setRewardDetail(e.target.value)}
              placeholder="예: 불가사리, 10층에서 00몬스터 잡고 얻음"
              rows={2}
            />
          </div>
        </div>
        <div className="detail-form__actions">
          {isEditing && <button onClick={() => onDelete(zone.id)}>삭제</button>}

          <button onClick={handleSave}>저장</button>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
}
