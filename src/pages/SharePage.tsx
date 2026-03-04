import { useState } from "react";
import { QuizResult } from "@/App";
import { getResultLevel } from "@/data/questions";
import Icon from "@/components/ui/icon";

interface Props {
  result: QuizResult;
  onBack: () => void;
  onHome: () => void;
}

export default function SharePage({ result, onBack, onHome }: Props) {
  const [copied, setCopied] = useState(false);
  const level = getResultLevel(result.score, result.total);
  const pct = Math.round((result.score / result.total) * 100);

  const shareText = `Я прошёл тест «Насколько ты тупой?» и получил: ${level.emoji} ${level.label}!\nМой результат: ${result.score}/${result.total} (${pct}%)\nПройди сам: ${window.location.href}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`${level.emoji} Я получил «${level.label}» в тесте на IQ! Мой результат: ${result.score}/${result.total}. Пройди сам:`)}`);
  };

  const handleVK = () => {
    window.open(`https://vk.com/share.php?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(`${level.emoji} ${level.label} — мой IQ-уровень!`)}`);
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="animate-scale-in w-full max-w-md">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={onBack} className="text-white/40 hover:text-white transition-colors">
            <Icon name="ArrowLeft" size={20} />
          </button>
          <h1 className="text-2xl font-black" style={{ fontFamily: "Oswald, sans-serif" }}>
            Поделиться
          </h1>
        </div>

        {/* Share card preview */}
        <div
          className="rounded-3xl p-8 mb-6 text-center relative overflow-hidden"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${level.color}30 0%, transparent 70%), linear-gradient(135deg, rgba(168,85,247,0.12), rgba(59,130,246,0.08))`,
            border: `1px solid ${level.color}35`,
          }}
        >
          {/* Decorative blobs */}
          <div
            className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-2xl"
            style={{ background: level.color }}
          />
          <div
            className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-10 blur-2xl"
            style={{ background: "#3b82f6" }}
          />

          <div className="relative z-10">
            <div className="text-6xl mb-3">{level.emoji}</div>
            <h2
              className="text-3xl font-black mb-2"
              style={{ fontFamily: "Oswald, sans-serif", color: level.color }}
            >
              {level.label}
            </h2>
            <p className="text-white/50 text-sm mb-5">{level.description}</p>

            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-5xl font-black text-white" style={{ fontFamily: "Oswald, sans-serif" }}>
                {result.score}
              </span>
              <span className="text-2xl text-white/30">/ {result.total}</span>
            </div>

            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
              style={{ background: `${level.color}20`, color: level.color }}
            >
              <Icon name="Star" size={14} />
              {pct}% правильных ответов
            </div>

            <div className="mt-4 text-white/25 text-xs">{result.nickname}</div>
          </div>
        </div>

        {/* Share buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleTelegram}
            className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
            style={{
              background: "rgba(39,174,255,0.12)",
              border: "1px solid rgba(39,174,255,0.25)",
              color: "#27aeff",
            }}
          >
            <span className="text-xl">✈️</span>
            Telegram
          </button>
          <button
            onClick={handleVK}
            className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
            style={{
              background: "rgba(0,119,255,0.12)",
              border: "1px solid rgba(0,119,255,0.25)",
              color: "#0077ff",
            }}
          >
            <span className="text-xl">💙</span>
            ВКонтакте
          </button>
          <button
            onClick={handleWhatsApp}
            className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
            style={{
              background: "rgba(37,211,102,0.12)",
              border: "1px solid rgba(37,211,102,0.25)",
              color: "#25d366",
            }}
          >
            <span className="text-xl">💬</span>
            WhatsApp
          </button>
          <button
            onClick={handleCopy}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] ${
              copied ? "border-green-500/30 text-green-400" : "border-white/10 text-white/60"
            } border`}
            style={{ background: copied ? "rgba(34,197,94,0.08)" : "rgba(255,255,255,0.03)" }}
          >
            <Icon name={copied ? "Check" : "Copy"} size={18} />
            {copied ? "Скопировано!" : "Скопировать текст"}
          </button>
        </div>

        <button
          onClick={onHome}
          className="w-full py-3 rounded-xl text-white/40 hover:text-white text-sm transition-colors flex items-center justify-center gap-2"
        >
          <Icon name="Home" size={14} />
          На главную
        </button>
      </div>
    </div>
  );
}
