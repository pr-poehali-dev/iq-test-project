import { useState, useEffect, useRef } from "react";
import { questions } from "@/data/questions";
import { QuizResult } from "@/App";
import Icon from "@/components/ui/icon";

interface Props {
  onFinish: (result: QuizResult) => void;
  onBack: () => void;
}

const CATEGORIES_COLOR: Record<string, string> = {
  Логика: "#a855f7",
  Математика: "#3b82f6",
  Внимательность: "#06b6d4",
  Эрудиция: "#22c55e",
  Ловушка: "#f97316",
};

export default function QuizPage({ onFinish, onBack }: Props) {
  const [nickname, setNickname] = useState("");
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<QuizResult["answers"]>([]);
  const [timeLeft, setTimeLeft] = useState(20);
  const [questionStart, setQuestionStart] = useState(Date.now());
  const [animKey, setAnimKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const q = questions[current];
  const progress = ((current) / questions.length) * 100;

  useEffect(() => {
    if (!started || revealed) return;
    setTimeLeft(20);
    setQuestionStart(Date.now());
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          handleReveal(-1);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [current, started]);

  const handleReveal = (idx: number) => {
    if (revealed) return;
    clearInterval(timerRef.current!);
    setSelected(idx);
    setRevealed(true);
    const timeSpent = Math.round((Date.now() - questionStart) / 1000);
    setAnswers((prev) => [
      ...prev,
      {
        questionId: q.id,
        correct: idx === q.correctIndex,
        timeSpent,
        selectedOption: idx,
      },
    ]);
  };

  const handleNext = () => {
    clearInterval(timerRef.current!);
    if (current + 1 >= questions.length) {
      const finalAnswers = [...answers];
      const score = finalAnswers.filter((a) => a.correct).length;
      onFinish({ score, total: questions.length, answers: finalAnswers, nickname, finishedAt: new Date() });
      return;
    }
    setSelected(null);
    setRevealed(false);
    setCurrent((c) => c + 1);
    setAnimKey((k) => k + 1);
  };

  const timerPct = (timeLeft / 20) * 100;
  const timerColor = timeLeft > 10 ? "#a855f7" : timeLeft > 5 ? "#f97316" : "#ef4444";

  if (!started) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="animate-scale-in w-full max-w-md">
          <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white mb-8 transition-colors text-sm">
            <Icon name="ArrowLeft" size={16} />
            Назад
          </button>
          <div className="card-glow rounded-3xl p-8">
            <div className="text-5xl mb-4 text-center">✏️</div>
            <h2 className="text-2xl font-black text-center mb-2" style={{ fontFamily: "Oswald, sans-serif" }}>
              Введи своё имя
            </h2>
            <p className="text-white/40 text-center text-sm mb-6">
              Оно появится в таблице лидеров
            </p>
            <input
              type="text"
              placeholder="Например: Антон"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={20}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-purple-500/50 transition-colors mb-6"
              onKeyDown={(e) => e.key === "Enter" && nickname.trim() && setStarted(true)}
            />
            <button
              onClick={() => setStarted(true)}
              disabled={!nickname.trim()}
              className="btn-primary w-full py-4 rounded-xl font-bold text-base disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Icon name="Play" size={18} />
              Начать тест
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col px-4 py-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm">
          <Icon name="ArrowLeft" size={16} />
          Выйти
        </button>
        <div className="flex items-center gap-3">
          <span className="text-white/40 text-sm">{nickname}</span>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm"
            style={{ background: `conic-gradient(${timerColor} ${timerPct}%, rgba(255,255,255,0.05) 0%)` }}
          >
            <span style={{ color: timerColor }}>{timeLeft}</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-white/30 mb-2">
          <span>Вопрос {current + 1} из {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: "linear-gradient(90deg, #a855f7, #3b82f6)" }}
          />
        </div>
      </div>

      {/* Question card */}
      <div key={animKey} className="animate-fade-in flex-1">
        <div className="card-glow rounded-3xl p-6 md:p-8 mb-4">
          {/* Category badge */}
          <div className="flex items-center gap-2 mb-5">
            <span
              className="text-xs font-bold px-3 py-1 rounded-full"
              style={{
                background: `${CATEGORIES_COLOR[q.category]}20`,
                color: CATEGORIES_COLOR[q.category],
                border: `1px solid ${CATEGORIES_COLOR[q.category]}40`,
              }}
            >
              {q.category}
            </span>
            <span
              className="text-xs px-2 py-1 rounded-full"
              style={{
                background: q.difficulty === "hard" ? "rgba(239,68,68,0.1)" : q.difficulty === "medium" ? "rgba(249,115,22,0.1)" : "rgba(34,197,94,0.1)",
                color: q.difficulty === "hard" ? "#ef4444" : q.difficulty === "medium" ? "#f97316" : "#22c55e",
              }}
            >
              {q.difficulty === "easy" ? "Лёгкий" : q.difficulty === "medium" ? "Средний" : "Сложный"}
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-white leading-relaxed mb-6">
            {q.text}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              let cls = "option-card";
              if (revealed) {
                if (idx === q.correctIndex) cls += " correct";
                else if (idx === selected) cls += " wrong";
              } else if (idx === selected) {
                cls += " selected";
              }
              return (
                <button
                  key={idx}
                  className={`${cls} w-full rounded-xl px-5 py-4 text-left flex items-center gap-4`}
                  onClick={() => !revealed && handleReveal(idx)}
                >
                  <span
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0"
                    style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-white/90 font-medium">{opt}</span>
                  {revealed && idx === q.correctIndex && (
                    <Icon name="Check" size={16} className="ml-auto text-green-400" />
                  )}
                  {revealed && idx === selected && idx !== q.correctIndex && (
                    <Icon name="X" size={16} className="ml-auto text-red-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation + Next */}
        {revealed && (
          <div className="animate-fade-in">
            <div
              className="rounded-2xl p-4 mb-4 flex items-start gap-3"
              style={{
                background: selected === q.correctIndex ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)",
                border: `1px solid ${selected === q.correctIndex ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}`,
              }}
            >
              <span className="text-xl">{selected === q.correctIndex ? "✅" : "❌"}</span>
              <div>
                <p className="font-bold text-white mb-1">
                  {selected === q.correctIndex ? "Правильно!" : "Неверно"}
                </p>
                <p className="text-white/60 text-sm">{q.explanation}</p>
              </div>
            </div>
            <button
              onClick={handleNext}
              className="btn-primary w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2"
            >
              {current + 1 >= questions.length ? (
                <>
                  <Icon name="Flag" size={18} />
                  Узнать результат
                </>
              ) : (
                <>
                  Следующий вопрос
                  <Icon name="ArrowRight" size={18} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
