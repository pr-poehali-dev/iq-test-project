import { useState } from "react";
import { QuizResult } from "@/App";
import { getResultLevel } from "@/data/questions";
import Icon from "@/components/ui/icon";

interface Props {
  onBack: () => void;
  currentResult: QuizResult | null;
}

const MOCK_LEADERS = [
  { nickname: "Александр В.", score: 15, total: 15, finishedAt: "2 мин назад" },
  { nickname: "Маша К.", score: 14, total: 15, finishedAt: "7 мин назад" },
  { nickname: "Дмитрий П.", score: 13, total: 15, finishedAt: "15 мин назад" },
  { nickname: "Olga88", score: 12, total: 15, finishedAt: "23 мин назад" },
  { nickname: "Паша Т.", score: 11, total: 15, finishedAt: "1 ч назад" },
  { nickname: "Nastya_M", score: 10, total: 15, finishedAt: "1 ч назад" },
  { nickname: "Игорь С.", score: 9, total: 15, finishedAt: "2 ч назад" },
  { nickname: "ValeriyK", score: 8, total: 15, finishedAt: "3 ч назад" },
  { nickname: "Арина Л.", score: 7, total: 15, finishedAt: "4 ч назад" },
  { nickname: "Тимур Н.", score: 5, total: 15, finishedAt: "5 ч назад" },
];

type Period = "today" | "week" | "all";

export default function LeaderboardPage({ onBack, currentResult }: Props) {
  const [period, setPeriod] = useState<Period>("today");

  const leaders = currentResult
    ? [
        ...MOCK_LEADERS,
        { nickname: `${currentResult.nickname} (ты)`, score: currentResult.score, total: currentResult.total, finishedAt: "Только что" },
      ].sort((a, b) => b.score - a.score)
    : MOCK_LEADERS;

  const getRankStyle = (rank: number) => {
    if (rank === 1) return { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)" };
    if (rank === 2) return { color: "#94a3b8", bg: "rgba(148,163,184,0.1)", border: "rgba(148,163,184,0.3)" };
    if (rank === 3) return { color: "#cd7c3f", bg: "rgba(205,124,63,0.1)", border: "rgba(205,124,63,0.3)" };
    return { color: "rgba(255,255,255,0.3)", bg: "transparent", border: "transparent" };
  };

  const getRankEmoji = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  return (
    <div className="min-h-screen px-4 py-8 max-w-2xl mx-auto">
      <div className="animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors">
            <Icon name="ArrowLeft" size={18} />
          </button>
          <div>
            <h1 className="text-3xl font-black" style={{ fontFamily: "Oswald, sans-serif" }}>
              🏆 Таблица лидеров
            </h1>
            <p className="text-white/40 text-sm">Лучшие умы планеты</p>
          </div>
        </div>

        {/* Period tabs */}
        <div className="flex gap-2 mb-6 glass-panel rounded-2xl p-1">
          {(["today", "week", "all"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                period === p ? "btn-primary" : "text-white/40 hover:text-white"
              }`}
            >
              {p === "today" ? "Сегодня" : p === "week" ? "Неделя" : "Всё время"}
            </button>
          ))}
        </div>

        {/* Top 3 podium */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {leaders.slice(0, 3).map((l, idx) => {
            const rank = idx + 1;
            const s = getRankStyle(rank);
            const lvl = getResultLevel(l.score, l.total);
            return (
              <div
                key={idx}
                className={`rounded-2xl p-4 text-center ${idx === 0 ? "col-start-2 order-first md:order-none" : ""}`}
                style={{ background: s.bg, border: `1px solid ${s.border}` }}
              >
                <div className="text-2xl mb-1">{getRankEmoji(rank)}</div>
                <div className="text-2xl mb-1">{lvl.emoji}</div>
                <div className="font-bold text-xs text-white/80 mb-1 truncate">{l.nickname}</div>
                <div className="font-black text-lg" style={{ color: s.color, fontFamily: "Oswald, sans-serif" }}>
                  {l.score}/{l.total}
                </div>
                <div className="text-xs text-white/30 mt-1">{lvl.label}</div>
              </div>
            );
          })}
        </div>

        <div className="neon-line mb-6 opacity-30" />

        {/* Full list */}
        <div className="space-y-2">
          {leaders.map((l, idx) => {
            const rank = idx + 1;
            const s = getRankStyle(rank);
            const lvl = getResultLevel(l.score, l.total);
            const isMe = l.nickname.includes("(ты)");
            return (
              <div
                key={idx}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${isMe ? "border border-purple-500/40" : "border border-white/5 hover:border-white/10"}`}
                style={{
                  background: isMe ? "rgba(168,85,247,0.08)" : "rgba(255,255,255,0.02)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0"
                  style={{ color: s.color, background: s.bg }}
                >
                  {rank <= 3 ? getRankEmoji(rank) : rank}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white truncate">{l.nickname}</span>
                    {isMe && <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">ты</span>}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs" style={{ color: lvl.color }}>{lvl.label}</span>
                    <span className="text-white/20 text-xs">•</span>
                    <span className="text-white/30 text-xs">{l.finishedAt}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black text-lg" style={{ fontFamily: "Oswald, sans-serif", color: s.color }}>
                    {l.score}/{l.total}
                  </div>
                  <div className="text-xs text-white/30">{Math.round((l.score / l.total) * 100)}%</div>
                </div>
              </div>
            );
          })}
        </div>

        {!currentResult && (
          <div className="mt-6 glass-panel rounded-2xl p-5 text-center">
            <p className="text-white/40 text-sm mb-3">Пройди тест, чтобы попасть в таблицу</p>
            <button onClick={onBack} className="btn-primary px-6 py-3 rounded-xl font-bold text-sm">
              Начать тест
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
