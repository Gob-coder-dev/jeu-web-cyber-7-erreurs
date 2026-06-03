import { useState } from "react";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import GamePage from "./GamePage";
import ResultPage from "./ResultPage";
import type { User } from "../types/User";
import type { Scenario } from "../types/Scenario";
import { ScoreService } from "../services/scoreServices";
import LeaderBoardPage from "./LeaderBoardPage";
import { scenarios } from "../data/scenarios";

type Page = "home" | "game" | "result" | "leaderboard";

const scoreService = new ScoreService();

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState<Page>("home");
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [scenarioScore, setScenarioScore] = useState(0);
  const [globalScore, setGlobalScore] = useState(0);
  const [completedScenarioIds, setCompletedScenarioIds] = useState<string[]>([]);
  const [hasSavedGlobalScore, setHasSavedGlobalScore] = useState(false);

  const hasCompletedAllScenarios = completedScenarioIds.length === scenarios.length;

  function handleLogin(pseudo: string) {
    setUser({ pseudo });
    setPage("home");
  }

  function handleLogout() {
    setUser(null);
    setPage("home");
    setSelectedScenario(null);
    setScenarioScore(0);
    setGlobalScore(0);
    setCompletedScenarioIds([]);
    setHasSavedGlobalScore(false);
  }

  function handleStartScenario(scenario: Scenario) {
    if (completedScenarioIds.includes(scenario.id)) {
      return;
    }

    setSelectedScenario(scenario);
    setPage("game");
  }

  function handleBackHome() {
    setSelectedScenario(null);
    setPage("home");
  }

  function handleGoResults(score: number) {
    if (selectedScenario === null) {
      return;
    }

    const scenarioAlreadyCompleted = completedScenarioIds.includes(selectedScenario.id);
    const nextCompletedScenarioIds = scenarioAlreadyCompleted
      ? completedScenarioIds
      : [...completedScenarioIds, selectedScenario.id];
    const nextGlobalScore = scenarioAlreadyCompleted
      ? globalScore
      : globalScore + score;
    const hasCompletedEveryScenario = nextCompletedScenarioIds.length === scenarios.length;

    setScenarioScore(score);
    setGlobalScore(nextGlobalScore);
    setCompletedScenarioIds(nextCompletedScenarioIds);

    if (hasCompletedEveryScenario && !hasSavedGlobalScore) {
      scoreService.addScore({
        score: nextGlobalScore,
        pseudo: user?.pseudo || "Anonyme",
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
      });
      setHasSavedGlobalScore(true);
    }

    setPage("result");
  }

  function handleGoLeaderBoard() {
    setPage("leaderboard");
  }

  if (user === null) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (page === "game" && selectedScenario !== null) {
    return (
      <GamePage
        scenario={selectedScenario}
        onBackHome={handleBackHome}
        onGoResults={handleGoResults}
      />
    );
  }

  if (page === "result") {
    return (
      <ResultPage
        scenarioTitle={selectedScenario?.title || "Scénario"}
        scenarioScore={scenarioScore}
        globalScore={globalScore}
        hasCompletedAllScenarios={hasCompletedAllScenarios}
        onBackHome={handleBackHome}
        onGoLeaderBoard={handleGoLeaderBoard}
      />
    );
  }

  if (page === "leaderboard") {
    return (
      <LeaderBoardPage
        scores={scoreService.getScores()}
        currentPseudo={user.pseudo}
        onBackHome={handleBackHome}
      />
    );
  }

  return (
    <HomePage
      user={user}
      scenarios={scenarios}
      completedScenarioIds={completedScenarioIds}
      globalScore={globalScore}
      onLogout={handleLogout}
      onGoLeaderBoard={handleGoLeaderBoard}
      onStartScenario={handleStartScenario}
    />
  );
}

export default App;
