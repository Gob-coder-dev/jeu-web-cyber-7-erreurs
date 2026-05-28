import { useState } from "react";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import GamePage from "./GamePage";
import ResultPage from "./ResultPage";
import type { User } from "../types/User";
import { ScoreService } from "../services/scoreServices";
import LeaderBoardPage from "./LeaderBoardPage";

type Page = "home" | "game" | "result" | "leaderboard";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState<Page>("home");
  const [score, setScore] = useState(0);
  let scores = new ScoreService();

  function handleLogin(pseudo: string) {
    setUser({ pseudo });
    setPage("home");
  }

  function handleLogout() {
    setUser(null);
    setPage("home");
  }

  function handleStartGame() {
    setPage("game");
  }

  function handleBackHome() {
    setPage("home");
  }

  function handleGoResults(score: number) {
    scores.addScore({score, pseudo: user?.pseudo || "Anonyme", id: crypto.randomUUID(), date: new Date().toISOString()});
    setScore(score);
    setPage("result");
  }

  function handleGoLeaderBoard() {
    setPage("leaderboard");
  }

  if (user === null) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (page === "game") {
    return <GamePage
      onBackHome={handleBackHome}
      onGoResults={handleGoResults}
    />;
  }

  if (page === "result") {
    return <ResultPage score={score} onBackHome={handleBackHome} onGoLeaderBoard={handleGoLeaderBoard} />;
  }

  if (page === "leaderboard") {
    return <LeaderBoardPage scores={scores.getScores()} onBackHome={handleBackHome} />;
  }

  return (
    <HomePage
      user={user}
      onLogout={handleLogout}
      onStartGame={handleStartGame}
    />
  );
}

export default App;
