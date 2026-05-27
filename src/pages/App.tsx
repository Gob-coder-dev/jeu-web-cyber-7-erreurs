import { useState } from "react";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import GamePage from "./GamePage";
import ResultPage from "./ResultPage";
import type { User } from "../types/User";

type Page = "home" | "game" | "result";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState<Page>("home");
  const [finalScore, setFinalScore] = useState(0);

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

  function handleGameFinished(score: number) {
    setFinalScore(score);
    setPage("result");
  }

  if (user === null) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (page === "game") {
    return <GamePage onBackHome={handleBackHome} />;
  }

  if (page === "result") {
    return <ResultPage score={finalScore} onBackHome={handleBackHome} />;
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
