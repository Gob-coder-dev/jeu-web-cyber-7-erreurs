import { useState } from "react";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import GamePage from "./GamePage";
import ResultPage from "./ResultPage";
import ScenarioIntroPage from "./ScenarioIntroPage";
import type { User } from "../types/User";
import type { Scenario } from "../types/Scenario";
import type { LeaderboardEntry, LeaderboardUserResult } from "../types/Leaderboard";
import LeaderBoardPage from "./LeaderBoardPage";
import { scenarios } from "../data/scenarios";
import {
  getLeaderboard,
  getLeaderboardUser,
  getOrCreateUser,
  saveScenarioScore,
} from "../services/apiClient";

type Page = "home" | "scenarioIntro" | "game" | "result" | "leaderboard";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState<Page>("home");
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [scenarioScore, setScenarioScore] = useState(0);
  const [scenarioRoundScores, setScenarioRoundScores] = useState<number[]>([]);
  const [leaderboardScores, setLeaderboardScores] = useState<LeaderboardEntry[]>([]);
  const [currentLeaderboardUser, setCurrentLeaderboardUser] =
    useState<LeaderboardUserResult | null>(null);

  async function refreshCurrentUser(userId: string) {
    const refreshedUser = await getOrCreateUser(userId);

    setUser(refreshedUser);

    return refreshedUser;
  }

  async function handleLogin(pseudo: string) {
    try {
      await refreshCurrentUser(pseudo);
      setPage("home");
    } catch (error) {
      console.error("Impossible de connecter l'utilisateur", error);
    }
  }

  function handleLogout() {
    setUser(null);
    setPage("home");
    setSelectedScenario(null);
    setScenarioScore(0);
    setScenarioRoundScores([]);
    setLeaderboardScores([]);
    setCurrentLeaderboardUser(null);
  }

  function handleStartScenario(scenario: Scenario) {
    setSelectedScenario(scenario);
    setPage("scenarioIntro");
  }

  function handleStartGame() {
    setPage("game");
  }

  function handleBackHome() {
    setSelectedScenario(null);
    setPage("home");
  }

  async function handleGoResults(score: number, roundScores: number[]) {
    if (selectedScenario === null || user === null) {
      return;
    }

    const normalizedScore = Math.max(0, score);
    const scenarioAlreadyCompleted = user.completedScenarioIds.includes(
      selectedScenario.id,
    );

    setScenarioScore(normalizedScore);
    setScenarioRoundScores(roundScores);

    if (!scenarioAlreadyCompleted) {
      try {
        await saveScenarioScore(user.id, selectedScenario.id, normalizedScore);
        await refreshCurrentUser(user.id);
      } catch (error) {
        console.error("Impossible de sauvegarder le score du scenario", error);
      }
    }

    setPage("result");
  }

  async function handleGoLeaderBoard() {
    if (user === null) {
      return;
    }

    try {
      const [leaderboard, leaderboardUser] = await Promise.all([
        getLeaderboard(),
        getLeaderboardUser(user.id),
      ]);

      setLeaderboardScores(leaderboard);
      setCurrentLeaderboardUser(leaderboardUser);
      setPage("leaderboard");
    } catch (error) {
      console.error("Impossible de charger le classement", error);
      setLeaderboardScores([]);
      setCurrentLeaderboardUser(null);
      setPage("leaderboard");
    }
  }

  if (user === null) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (page === "scenarioIntro" && selectedScenario !== null) {
    return (
      <ScenarioIntroPage
        scenario={selectedScenario}
        onStartGame={handleStartGame}
        onBackHome={handleBackHome}
      />
    );
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
        scenario={selectedScenario || undefined}
        scenarioTitle={
          selectedScenario !== null
            ? `Dossier - ${selectedScenario.title}`
            : "Scenario"
        }
        scenarioScore={scenarioScore}
        scenarioRoundScores={scenarioRoundScores}
        globalScore={user.globalScore}
        onBackHome={handleBackHome}
        onGoLeaderBoard={handleGoLeaderBoard}
      />
    );
  }

  if (page === "leaderboard") {
    return (
      <LeaderBoardPage
        topScores={leaderboardScores}
        currentLeaderboardUser={currentLeaderboardUser}
        onBackHome={handleBackHome}
      />
    );
  }

  return (
    <HomePage
      user={user}
      scenarios={scenarios}
      globalScore={user.globalScore}
      onLogout={handleLogout}
      onGoLeaderBoard={handleGoLeaderBoard}
      onStartScenario={handleStartScenario}
    />
  );
}

export default App;
