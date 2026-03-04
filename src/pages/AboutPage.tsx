import Icon from "@/components/ui/icon";

interface Props {
  onBack: () => void;
  onStart: () => void;
}

const features = [
  {
    icon: "Brain",
    title: "15 коварных вопросов",
    desc: "Логика, математика, ловушки и внимательность — всё в одном тесте.",
    color: "#a855f7",
  },
  {
    icon: "Clock",
    title: "Таймер на каждый вопрос",
    desc: "20 секунд на ответ. Успеешь подумать? Проверим.",
    color: "#3b82f6",
  },
  {
    icon: "BarChart2",
    title: "Детальная аналитика",
    desc: "Разбивка по категориям, время ответа, быстрые и медленные вопросы.",
    color: "#06b6d4",
  },
  {
    icon: "Trophy",
    title: "Таблица лидеров",
    desc: "Сравни себя с другими. Или просто убедись, что ты хуже всех.",
    color: "#f59e0b",
  },
  {
    icon: "Share2",
    title: "Поделиться результатом",
    desc: "Хвастайся победой или делись позором — с красивой карточкой.",
    color: "#ec4899",
  },
  {
    icon: "RefreshCw",
    title: "Пересдача без стыда",
    desc: "Не вышло? Перепройди сколько угодно раз.",
    color: "#22c55e",
  },
];

const levels = [
  { emoji: "🧠", label: "Гений", range: "15/15", color: "#a855f7" },
  { emoji: "🎓", label: "Умник", range: "12–14", color: "#3b82f6" },
  { emoji: "😐", label: "Средний", range: "9–11", color: "#f59e0b" },
  { emoji: "🤔", label: "Туговатый", range: "6–8", color: "#f97316" },
  { emoji: "🙈", label: "Тупенький", range: "3–5", color: "#ef4444" },
  { emoji: "🪨", label: "Тупой", range: "0–2", color: "#dc2626" },
];

export default function AboutPage({ onBack, onStart }: Props) {
  return (
    <div className="min-h-screen px-4 py-8 max-w-2xl mx-auto">
      <div className="animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={onBack} className="text-white/40 hover:text-white transition-colors">
            <Icon name="ArrowLeft" size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-black" style={{ fontFamily: "Oswald, sans-serif" }}>
              О тесте
            </h1>
            <p className="text-white/40 text-sm">Что тебя ждёт</p>
          </div>
        </div>

        {/* Hero block */}
        <div
          className="rounded-3xl p-8 mb-8 text-center"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.2) 0%, transparent 70%), rgba(255,255,255,0.02)",
            border: "1px solid rgba(168,85,247,0.2)",
          }}
        >
          <div className="text-6xl mb-4">🧠</div>
          <h2 className="text-2xl font-black mb-3 gradient-text" style={{ fontFamily: "Oswald, sans-serif" }}>
            Честный тест интеллекта
          </h2>
          <p className="text-white/50 leading-relaxed">
            Без лишних слов: 15 вопросов, таймер, результат и подробный разбор.
            Узнай, насколько тебе стоит гордиться своим мозгом — или бояться за него.
          </p>
        </div>

        {/* Features grid */}
        <h3 className="font-black text-xl mb-4" style={{ fontFamily: "Oswald, sans-serif" }}>
          Что внутри
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl p-5 flex gap-4 items-start"
              style={{
                background: `${f.color}08`,
                border: `1px solid ${f.color}20`,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: `${f.color}15` }}
              >
                <Icon name={f.icon as never} size={18} style={{ color: f.color }} />
              </div>
              <div>
                <div className="font-bold text-white mb-1">{f.title}</div>
                <div className="text-white/45 text-sm leading-relaxed">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Levels */}
        <h3 className="font-black text-xl mb-4" style={{ fontFamily: "Oswald, sans-serif" }}>
          Уровни результата
        </h3>
        <div className="space-y-2 mb-8">
          {levels.map((l) => (
            <div
              key={l.label}
              className="flex items-center gap-4 p-4 rounded-2xl"
              style={{
                background: `${l.color}08`,
                border: `1px solid ${l.color}20`,
              }}
            >
              <span className="text-2xl">{l.emoji}</span>
              <div className="flex-1">
                <span className="font-bold" style={{ color: l.color }}>{l.label}</span>
              </div>
              <span className="text-white/40 text-sm font-mono">{l.range} баллов</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          className="btn-primary w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 animate-pulse-glow"
        >
          <Icon name="Zap" size={22} />
          Пройти тест прямо сейчас
        </button>
      </div>
    </div>
  );
}
