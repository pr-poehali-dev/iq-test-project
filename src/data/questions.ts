export interface Question {
  id: number;
  category: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

export const questions: Question[] = [
  {
    id: 1,
    category: "Логика",
    text: "Если у тебя 3 яблока и ты съел 2 апельсина, сколько яблок у тебя осталось?",
    options: ["1", "2", "3", "0"],
    correctIndex: 2,
    explanation: "Ты съел апельсины, а не яблоки. Яблок осталось 3.",
    difficulty: "easy",
  },
  {
    id: 2,
    category: "Математика",
    text: "Чему равно: 8 ÷ 2(2 + 2) = ?",
    options: ["1", "16", "8", "4"],
    correctIndex: 1,
    explanation: "По правилам порядка действий: 8 ÷ 2 × 4 = 4 × 4 = 16.",
    difficulty: "medium",
  },
  {
    id: 3,
    category: "Внимательность",
    text: "Сколько раз буква \"а\" встречается в слове «банан»?",
    options: ["1", "2", "3", "4"],
    correctIndex: 2,
    explanation: "Б-А-Н-А-Н: три буквы «а».",
    difficulty: "easy",
  },
  {
    id: 4,
    category: "Логика",
    text: "Петя старше Васи, Вася старше Коли. Кто самый молодой?",
    options: ["Петя", "Вася", "Коля", "Все одного возраста"],
    correctIndex: 2,
    explanation: "Петя > Вася > Коля, значит Коля самый молодой.",
    difficulty: "easy",
  },
  {
    id: 5,
    category: "Эрудиция",
    text: "Какая планета Солнечной системы самая большая?",
    options: ["Сатурн", "Нептун", "Юпитер", "Уран"],
    correctIndex: 2,
    explanation: "Юпитер — крупнейшая планета Солнечной системы.",
    difficulty: "easy",
  },
  {
    id: 6,
    category: "Математика",
    text: "Поезд едет 120 км за 2 часа. Какова его скорость?",
    options: ["50 км/ч", "60 км/ч", "80 км/ч", "240 км/ч"],
    correctIndex: 1,
    explanation: "120 ÷ 2 = 60 км/ч.",
    difficulty: "easy",
  },
  {
    id: 7,
    category: "Логика",
    text: "Какое слово лишнее: яблоко, груша, огурец, апельсин?",
    options: ["Яблоко", "Груша", "Огурец", "Апельсин"],
    correctIndex: 2,
    explanation: "Огурец — овощ, а остальные — фрукты.",
    difficulty: "easy",
  },
  {
    id: 8,
    category: "Внимательность",
    text: "AAABBBCCCAAA — сколько букв «C» в последовательности?",
    options: ["2", "3", "4", "6"],
    correctIndex: 1,
    explanation: "В группе CCC ровно 3 буквы C.",
    difficulty: "medium",
  },
  {
    id: 9,
    category: "Эрудиция",
    text: "В каком году высадились люди на Луне?",
    options: ["1965", "1969", "1972", "1961"],
    correctIndex: 1,
    explanation: "Аполлон-11 приземлился 20 июля 1969 года.",
    difficulty: "medium",
  },
  {
    id: 10,
    category: "Логика",
    text: "У фермера 17 овец. Все, кроме 9, убежали. Сколько осталось?",
    options: ["8", "9", "17", "0"],
    correctIndex: 1,
    explanation: "«Все, кроме 9» значит, что 9 овец осталось.",
    difficulty: "medium",
  },
  {
    id: 11,
    category: "Математика",
    text: "Сколько нулей в числе миллиард?",
    options: ["6", "7", "8", "9"],
    correctIndex: 3,
    explanation: "Миллиард = 1 000 000 000, девять нулей.",
    difficulty: "medium",
  },
  {
    id: 12,
    category: "Ловушка",
    text: "Врач даёт тебе 3 таблетки и говорит принимать каждые полчаса. На сколько часов хватит таблеток?",
    options: ["1,5 часа", "1 час", "2 часа", "3 часа"],
    correctIndex: 1,
    explanation: "1-я сразу, 2-я через 30 мин, 3-я через 60 мин = 1 час.",
    difficulty: "hard",
  },
  {
    id: 13,
    category: "Эрудиция",
    text: "Сколько сторон у пятиугольника?",
    options: ["4", "5", "6", "7"],
    correctIndex: 1,
    explanation: "«Пятиугольник» — 5 углов и 5 сторон.",
    difficulty: "easy",
  },
  {
    id: 14,
    category: "Логика",
    text: "Что тяжелее: килограмм железа или килограмм пуха?",
    options: ["Железо", "Пух", "Одинаково", "Зависит от условий"],
    correctIndex: 2,
    explanation: "Оба весят ровно по 1 кг.",
    difficulty: "easy",
  },
  {
    id: 15,
    category: "Ловушка",
    text: "Если в 12 часов дня идёт дождь, может ли через 72 часа светить солнце?",
    options: ["Да", "Нет", "Возможно", "Зависит от погоды"],
    correctIndex: 1,
    explanation: "Через 72 часа снова будет полночь, а не день — солнца не видно.",
    difficulty: "hard",
  },
];

export const getResultLevel = (score: number, total: number) => {
  const pct = (score / total) * 100;
  if (pct === 100) return { label: "Гений", emoji: "🧠", color: "#a855f7", description: "Невероятно! Ты на вершине интеллекта." };
  if (pct >= 80) return { label: "Умник", emoji: "🎓", color: "#3b82f6", description: "Отличный результат! Мозги работают на полную." };
  if (pct >= 60) return { label: "Средний", emoji: "😐", color: "#f59e0b", description: "Неплохо, но есть куда расти." };
  if (pct >= 40) return { label: "Туговатый", emoji: "🤔", color: "#f97316", description: "Есть вопросы к твоим извилинам." };
  if (pct >= 20) return { label: "Тупенький", emoji: "🙈", color: "#ef4444", description: "Ммм... Стараешься, но получается не очень." };
  return { label: "Тупой", emoji: "🪨", color: "#dc2626", description: "Поздравляем! Ты достиг дна. Ниже только мантия Земли." };
};
