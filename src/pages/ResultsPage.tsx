import { QuizResult } from "@/App";
import { questions, getResultLevel } from "@/data/questions";
import Icon from "@/components/ui/icon";

interface Props {
  result: QuizResult;
  onShare: () => void;
  onLeaderboard: () => void;
  onRetry: () => void;
  onHome: () => void;
}

const CATEGORIES_COLOR: Record<string, string> = {
  Логика: "#a855f7",
  Математика: "#3b82f6",
  Внимательность: "#06b6d4",
  Эрудиция: "#22c55e",
  Ловушка: "#f97316",
};

export default function ResultsPage({ result, onShare, onLeaderboard, onRetry, onHome }: Props) {
  const level = getResultLevel(result.score, result.total);
  const pct = Math.round((result.score / result.total) * 100);
  const avgTime = Math.round(result.answers.reduce((a, b) => a + b.timeSpent, 0) / result.answers.length);

  // Category breakdown
  const categoryStats: Record<string, { correct: number; total: number }> = {};
  result.answers.forEach((ans, i) => {
    const q = questions[i];
    if (!categoryStats[q.category]) categoryStats[q.category] = { correct: 0, total: 0 };
    categoryStats[q.category].total++;
    if (ans.correct) categoryStats[q.category].correct++;
  });

  // Per-question timeline
  const fastestQuestion = [...result.answers].sort((a, b) => a.timeSpent - b.timeSpent)[0];
  const slowestQuestion = [...result.answers].sort((a, b) => b.timeSpent - a.timeSpent)[0];
  const fastQ = questions.find((q) => q.id === fastestQuestion.questionId);
  const slowQ = questions.find((q) => q.id === slowestQuestion.questionId);

  return (
    <div className="min-h-screen px-4 py-8 max-w-2xl mx-auto">
      <div className="animate-fade-in">
        {/* Result hero */}
        <div
          className="rounded-3xl p-8 text-center mb-6 relative overflow-hidden"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${level.color}25 0%, transparent 70%), rgba(255,255,255,0.03)`,
            border: `1px solid ${level.color}30`,
          }}
        >
          <div className="text-7xl mb-4 animate-float">{level.emoji}</div>
          <h1 className="text-4xl font-black mb-2" style={{ fontFamily: "Oswald, sans-serif", color: level.color }}>
            {level.label}
          </h1>
          <p className="text-white/50 mb-6">{level.description}</p>

          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-6xl font-black gradient-text" style={{ fontFamily: "Oswald, sans-serif" }}>
              {result.score}
            </span>
            <span className="text-3xl text-white/30 font-bold">/ {result.total}</span>
          </div>

          {/* Score ring */}
          <div className="flex justify-center mb-2">
            <div className="relative w-24 h-24">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="40" fill="none"
                  stroke={level.color} strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 40 * pct / 100} ${2 * Math.PI * 40 * (100 - pct) / 100}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-black text-white">{pct}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Правильных", value: result.score, icon: "Check", color: "#22c55e" },
            { label: "Неверных", value: result.total - result.score, icon: "X", color: "#ef4444" },
            { label: "Сред. время", value: `${avgTime}с`, icon: "Clock", color: "#3b82f6" },
          ].map((s) => (
            <div key={s.label} className="card-glow rounded-2xl p-4 text-center" style={{ borderColor: `${s.color}20` }}>
              <Icon name={s.icon as never} size={20} className="mx-auto mb-2" style={{ color: s.color }} />
              <div className="text-2xl font-black text-white" style={{ fontFamily: "Oswald, sans-serif" }}>{s.value}</div>
              <div className="text-xs text-white/40 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Category breakdown */}
        <div className="card-glow rounded-3xl p-6 mb-6">
          <h3 className="font-black text-lg mb-4 flex items-center gap-2" style={{ fontFamily: "Oswald, sans-serif" }}>
            <Icon name="BarChart2" size={18} className="text-purple-400" />
            Аналитика по категориям
          </h3>
          <div className="space-y-4">
            {Object.entries(categoryStats).map(([cat, stat]) => {
              const catPct = Math.round((stat.correct / stat.total) * 100);
              const col = CATEGORIES_COLOR[cat] || "#a855f7";
              return (
                <div key={cat}>
                  <div className="flex justify-between text-sm mb-1">
                    <span style={{ color: col }}>{cat}</span>
                    <span className="text-white/50">{stat.correct}/{stat.total}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${catPct}%`, background: col }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Time insights */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="card-glow rounded-2xl p-4" style={{ borderColor: "rgba(34,197,94,0.2)" }}>
            <div className="text-xs text-white/40 mb-2 flex items-center gap-1">
              <Icon name="Zap" size={12} className="text-green-400" />
              Быстрее всего
            </div>
            <div className="text-green-400 font-bold text-sm mb-1">{fastestQuestion.timeSpent}с</div>
            <div className="text-white/60 text-xs line-clamp-2">{fastQ?.text}</div>
          </div>
          <div className="card-glow rounded-2xl p-4" style={{ borderColor: "rgba(249,115,22,0.2)" }}>
            <div className="text-xs text-white/40 mb-2 flex items-center gap-1">
              <Icon name="Clock" size={12} className="text-orange-400" />
              Дольше всего
            </div>
            <div className="text-orange-400 font-bold text-sm mb-1">{slowestQuestion.timeSpent}с</div>
            <div className="text-white/60 text-xs line-clamp-2">{slowQ?.text}</div>
          </div>
        </div>

        {/* Question log */}
        <div className="card-glow rounded-3xl p-6 mb-8">
          <h3 className="font-black text-lg mb-4 flex items-center gap-2" style={{ fontFamily: "Oswald, sans-serif" }}>
            <Icon name="List" size={18} className="text-purple-400" />
            Все ответы
          </h3>
          <div className="space-y-2">
            {result.answers.map((ans, i) => {
              const q = questions[i];
              return (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${ans.correct ? "bg-green-500/20" : "bg-red-500/20"}`}>
                    <Icon name={ans.correct ? "Check" : "X"} size={10} className={ans.correct ? "text-green-400" : "text-red-400"} />
                  </span>
                  <span className="text-white/70 text-sm flex-1 line-clamp-1">{q.text}</span>
                  <span className="text-white/30 text-xs shrink-0">{ans.timeSpent}с</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <button
            onClick={onShare}
            className="btn-primary py-4 rounded-xl font-bold flex items-center justify-center gap-2"
          >
            <Icon name="Share2" size={18} />
            Поделиться
          </button>
          <button
            onClick={onLeaderboard}
            className="py-4 rounded-xl font-bold flex items-center justify-center gap-2 border border-white/10 text-white/70 hover:bg-white/5 transition-all"
          >
            <Icon name="Trophy" size={18} />
            Лидеры
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onRetry}
            className="py-4 rounded-xl font-bold flex items-center justify-center gap-2 border border-white/10 text-white/70 hover:bg-white/5 transition-all"
          >
            <Icon name="RefreshCw" size={16} />
            Ещё раз
          </button>
          <button
            onClick={onHome}
            className="py-4 rounded-xl font-bold flex items-center justify-center gap-2 border border-white/10 text-white/70 hover:bg-white/5 transition-all"
          >
            <Icon name="Home" size={16} />
            На главную
          </button>
        </div>
      </div>
    </div>
  );
}
