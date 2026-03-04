import { useState } from "react";
import HomePage from "@/pages/HomePage";
import QuizPage from "@/pages/QuizPage";
import ResultsPage from "@/pages/ResultsPage";
import LeaderboardPage from "@/pages/LeaderboardPage";
import AboutPage from "@/pages/AboutPage";
import SharePage from "@/pages/SharePage";

export type Page = "home" | "quiz" | "results" | "leaderboard" | "about" | "share";

export interface QuizResult {
  score: number;
  total: number;
  answers: { questionId: number; correct: boolean; timeSpent: number; selectedOption: number }[];
  nickname: string;
  finishedAt: Date;
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const navigate = (p: Page) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(p);
  };

  return (
    <div className="min-h-screen">
      {page === "home" && (
        <HomePage
          onStart={() => navigate("quiz")}
          onLeaderboard={() => navigate("leaderboard")}
          onAbout={() => navigate("about")}
        />
      )}
      {page === "quiz" && (
        <QuizPage
          onFinish={(result) => { setQuizResult(result); navigate("results"); }}
          onBack={() => navigate("home")}
        />
      )}
      {page === "results" && quizResult && (
        <ResultsPage
          result={quizResult}
          onShare={() => navigate("share")}
          onLeaderboard={() => navigate("leaderboard")}
          onRetry={() => navigate("quiz")}
          onHome={() => navigate("home")}
        />
      )}
      {page === "leaderboard" && (
        <LeaderboardPage
          onBack={() => navigate("home")}
          currentResult={quizResult}
        />
      )}
      {page === "about" && (
        <AboutPage
          onBack={() => navigate("home")}
          onStart={() => navigate("quiz")}
        />
      )}
      {page === "share" && quizResult && (
        <SharePage
          result={quizResult}
          onBack={() => navigate("results")}
          onHome={() => navigate("home")}
        />
      )}
    </div>
  );
}
