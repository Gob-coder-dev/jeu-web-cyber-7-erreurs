import { useState } from "react";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import ResultPage from "./ResultPage";
import ScenarioIntroPage from "./ScenarioIntroPage";
import type { User } from "../types/User";
import type { ScenarioIntro } from "../types/Scenario";
import type { LeaderboardEntry, LeaderboardUserResult } from "../types/Leaderboard";
import LeaderBoardPage from "./LeaderBoardPage";
import {
  getLeaderboard,
  getLeaderboardUser,
  getOrCreateUser,
  getScenariosCard,
} from "../services/apiClient";

type Page = "home" | "scenarioIntro" | "game" | "result" | "leaderboard";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState<Page>("home");
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const [scenarioScore, setScenarioScore] = useState(0);
  const [scenarioRoundScores, setScenarioRoundScores] = useState<number[]>([]);
  const [leaderboardScores, setLeaderboardScores] = useState<LeaderboardEntry[]>([]);
  const [currentLeaderboardUser, setCurrentLeaderboardUser] = useState<LeaderboardUserResult | null>(null);
  const [scenarioIntros, setScenarioIntros] = useState<ScenarioIntro[]>([]);

  async function handleLogin(pseudo: string) {
    try {
      const [connectedUser, cards] = await Promise.all([
        getOrCreateUser(pseudo),
        getScenariosCard(),
      ]);

      setUser(connectedUser);
      setScenarioIntros(cards);
      setPage("home");
    } catch (error) {
      console.error("Impossible de connecter l'utilisateur", error);
    }
  }

  function handleLogout() {
    setUser(null);
    setPage("home");
    setSelectedScenarioId(null);
    setScenarioScore(0);
    setScenarioRoundScores([]);
    setLeaderboardScores([]);
    setCurrentLeaderboardUser(null);
    setScenarioIntros([]);
  }

  function handleStartScenario(scenarioId: string) {
    setSelectedScenarioId(scenarioId);
    setPage("scenarioIntro");
  }

  function handleStartGame() {
    setPage("game");
  }

  function handleBackHome() {
    setSelectedScenarioId(null);
    setPage("home");
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

  const selectedScenarioIntro =
    selectedScenarioId === null
      ? null
      : (scenarioIntros.find(
          (scenario) => scenario.id === selectedScenarioId,
        ) ?? null);

  if (user === null) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (page === "scenarioIntro" && selectedScenarioId !== null) {
    if (selectedScenarioIntro === null) {
      return (
        <main className="page">
          <h1>Scénario introuvable</h1>
          <button className="button" onClick={handleBackHome}>
            Retour aux scénarios
          </button>
        </main>
      );
    }

    return (
      <ScenarioIntroPage
        scenario={selectedScenarioIntro}
        onStartGame={handleStartGame}
        onBackHome={handleBackHome}
      />
    );
  }

  if (page === "game" && selectedScenarioId !== null) {
    return (
      <main className="page">
        <h1>Chargement du jeu</h1>
        <p>La première question sera chargée par le backend à l’étape 2.</p>
        <button className="button button--secondary" onClick={handleBackHome}>
          Retour aux scénarios
        </button>
      </main>
    );
  }

  if (page === "result") {
    return (
      <ResultPage
        scenarioTitle={
          selectedScenarioIntro !== null
            ? `Dossier - ${selectedScenarioIntro.title}`
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
      scenarioIntros={scenarioIntros}
      globalScore={user.globalScore}
      onLogout={handleLogout}
      onGoLeaderBoard={handleGoLeaderBoard}
      onStartScenario={handleStartScenario}
    />
  );
}

export default App;
