"use client";

import { useMemo, useState } from "react";
import type { Member } from "@/data/members";

type Rung = { level: number; left: number };

function shuffle<T>(items: T[]) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

function makeRungs(count: number, levels = 11) {
  const rungs: Rung[] = [];
  for (let level = 0; level < levels; level += 1) {
    const used = new Set<number>();
    for (let left = 0; left < count - 1; left += 1) {
      if (!used.has(left) && !used.has(left + 1) && Math.random() < 0.38) {
        rungs.push({ level, left });
        used.add(left);
        used.add(left + 1);
      }
    }
  }
  return rungs;
}

export function LuckLadder({ members }: { members: Member[] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [players, setPlayers] = useState<Member[]>([]);
  const [rungs, setRungs] = useState<Rung[]>([]);
  const [results, setResults] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [message, setMessage] = useState("참가 회원을 2~8명 선택해 주세요.");

  const levels = 11;
  const width = 800;
  const top = 62;
  const bottom = 410;
  const levelGap = (bottom - top) / (levels + 1);
  const positions = useMemo(() => {
    if (players.length < 2) return [];
    const side = 54;
    const gap = (width - side * 2) / (players.length - 1);
    return players.map((_, index) => side + gap * index);
  }, [players]);

  function toggle(phone: string) {
    setSelected((current) => {
      if (current.includes(phone)) return current.filter((item) => item !== phone);
      if (current.length >= 8) {
        setMessage("사다리 참여자는 최대 8명입니다.");
        return current;
      }
      return [...current, phone];
    });
  }

  function createLadder() {
    if (selected.length < 2) {
      setMessage("최소 2명을 선택해 주세요.");
      return;
    }
    const nextPlayers = shuffle(members.filter((member) => selected.includes(member.phone)));
    setPlayers(nextPlayers);
    setRungs(makeRungs(nextPlayers.length, levels));
    setResults(shuffle(["🍠 고구마 1박스", ...Array(nextPlayers.length - 1).fill("다음 기회에")]));
    setActiveIndex(null);
    setMessage("사다리가 완성됐습니다. 닉네임을 눌러 결과를 확인하세요.");
  }

  function trace(startIndex: number) {
    let column = startIndex;
    const points: Array<[number, number]> = [[positions[column], top]];
    for (let level = 0; level < levels; level += 1) {
      const y = top + (level + 1) * levelGap;
      points.push([positions[column], y]);
      const leftRung = rungs.some((rung) => rung.level === level && rung.left === column - 1);
      const rightRung = rungs.some((rung) => rung.level === level && rung.left === column);
      if (leftRung) column -= 1;
      else if (rightRung) column += 1;
      points.push([positions[column], y]);
    }
    points.push([positions[column], bottom]);
    return { column, points };
  }

  const activeTrace = activeIndex === null || !positions.length ? null : trace(activeIndex);

  function reset() {
    setSelected([]);
    setPlayers([]);
    setRungs([]);
    setResults([]);
    setActiveIndex(null);
    setMessage("참가 회원을 2~8명 선택해 주세요.");
  }

  return (
    <div className="ladder-panel">
      <div className="ladder-picker">
        {members.map((member) => (
          <label className={`ladder-member${selected.includes(member.phone) ? " selected" : ""}`} key={member.phone}>
            <input type="checkbox" checked={selected.includes(member.phone)} onChange={() => toggle(member.phone)} />
            <span>{member.nickname}</span>
          </label>
        ))}
      </div>

      <div className="ladder-actions">
        <button className="button primary" type="button" onClick={createLadder}>사다리 만들기</button>
        <button className="button ladder-reset" type="button" onClick={reset}>초기화</button>
        <span>{selected.length}/8명 선택</span>
      </div>
      <p className="ladder-message" role="status">{message}</p>

      {players.length >= 2 && (
        <div className="ladder-stage">
          <div className="ladder-player-buttons" style={{ gridTemplateColumns: `repeat(${players.length}, 1fr)` }}>
            {players.map((player, index) => (
              <button className={activeIndex === index ? "active" : ""} type="button" key={player.phone} onClick={() => setActiveIndex(index)}>
                {player.nickname}
              </button>
            ))}
          </div>
          <svg className="ladder-svg" viewBox={`0 0 ${width} 450`} role="img" aria-label="행운상 사다리">
            {positions.map((x) => <line className="ladder-line" key={`v-${x}`} x1={x} y1={top} x2={x} y2={bottom} />)}
            {rungs.map((rung) => {
              const y = top + (rung.level + 1) * levelGap;
              return <line className="ladder-line" key={`${rung.level}-${rung.left}`} x1={positions[rung.left]} y1={y} x2={positions[rung.left + 1]} y2={y} />;
            })}
            {activeTrace && <polyline className="ladder-path" points={activeTrace.points.map(([x, y]) => `${x},${y}`).join(" ")} />}
          </svg>
          <div className="ladder-results" style={{ gridTemplateColumns: `repeat(${players.length}, 1fr)` }}>
            {results.map((result, index) => (
              <span className={activeTrace?.column === index ? "revealed" : ""} key={`${result}-${index}`}>
                {activeTrace?.column === index ? result : "?"}
              </span>
            ))}
          </div>
          {activeTrace && (
            <p className="ladder-winner">
              <strong>{players[activeIndex!].nickname}</strong>님의 결과: <b>{results[activeTrace.column]}</b>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
