import Icon from "@/components/ui/icon";

interface Props {
  onStart: () => void;
  onLeaderboard: () => void;
  onAbout: () => void;
}

const stats = [
  { value: "15", label: "вопросов" },
  { value: "~5", label: "минут" },
  { value: "6", label: "уровней" },
];

export default function HomePage({ onStart, onLeaderboard, onAbout }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 glass-panel border-b border-white/5">
        <span className="font-black text-lg tracking-wider gradient-text" style={{ fontFamily: "Oswald, sans-serif" }}>
          IQ ТЕСТ
        </span>
        <div className="flex gap-2">
          <button
            onClick={onAbout}
            className="px-4 py-2 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all"
          >
            О тесте
          </button>
          <button
            onClick={onLeaderboard}
            className="px-4 py-2 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2"
          >
            <Icon name="Trophy" size={14} />
            Лидеры
          </button>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="animate-fade-in" style={{ animationDelay: "0ms" }}>
          <div className="text-8xl mb-6 animate-float">🧠</div>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <h1
            className="text-5xl md:text-7xl font-black mb-4 leading-tight"
            style={{ fontFamily: "Oswald, sans-serif" }}
          >
            Насколько ты{" "}
            <span className="gradient-text">тупой?</span>
          </h1>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <p className="text-white/50 text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
            15 коварных вопросов проверят твой интеллект, внимательность и логику.
            Результат с подробной аналитикой — честно и без пощады.
          </p>
        </div>

        {/* Stats */}
        <div className="animate-fade-in flex gap-8 mb-10" style={{ animationDelay: "300ms" }}>
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div
                className="text-3xl font-black gradient-text"
                style={{ fontFamily: "Oswald, sans-serif" }}
              >
                {s.value}
              </div>
              <div className="text-white/40 text-xs uppercase tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="animate-fade-in" style={{ animationDelay: "400ms" }}>
          <button
            onClick={onStart}
            className="btn-primary relative z-10 px-10 py-5 rounded-2xl text-lg font-bold tracking-wide animate-pulse-glow"
          >
            <span className="relative z-10 flex items-center gap-3">
              <Icon name="Zap" size={22} />
              Начать тест
            </span>
          </button>
        </div>

        <div className="animate-fade-in mt-4 text-white/25 text-sm" style={{ animationDelay: "500ms" }}>
          Уже прошли тест более 10 000 человек
        </div>

        {/* Neon line */}
        <div className="neon-line w-full max-w-sm mt-16 opacity-40" />

        {/* Level preview */}
        <div
          className="animate-fade-in mt-12 grid grid-cols-3 md:grid-cols-6 gap-3 max-w-2xl"
          style={{ animationDelay: "600ms" }}
        >
          {[
            { emoji: "🧠", label: "Гений", color: "#a855f7" },
            { emoji: "🎓", label: "Умник", color: "#3b82f6" },
            { emoji: "😐", label: "Средний", color: "#f59e0b" },
            { emoji: "🤔", label: "Туговатый", color: "#f97316" },
            { emoji: "🙈", label: "Тупенький", color: "#ef4444" },
            { emoji: "🪨", label: "Тупой", color: "#dc2626" },
          ].map((lvl) => (
            <div
              key={lvl.label}
              className="card-glow rounded-2xl p-3 text-center"
              style={{ borderColor: `${lvl.color}30` }}
            >
              <div className="text-2xl mb-1">{lvl.emoji}</div>
              <div className="text-xs text-white/40">{lvl.label}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
