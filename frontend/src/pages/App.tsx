import { useState } from "react";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import GamePage from "./GamePage";
import ResultPage from "./ResultPage";
import ScenarioIntroPage from "./ScenarioIntroPage";
import type { User } from "../types/User";
import type { StartScenarioResult } from "../types/GameSession";
import type { Scenario, ScenarioIntro } from "../types/Scenario";
import type { LeaderboardEntry, LeaderboardUserResult } from "../types/Leaderboard";
import type { PublicQuestion } from "../types/Question";
import type { SubmitAnswersResult } from "../types/Question";
import LeaderBoardPage from "./LeaderBoardPage";
import {
  getLeaderboard,
  getLeaderboardUser,
  getOrCreateUser,
  getScenariosCard,
  postNewUser,
  startScenario,
} from "../services/apiClient";

type Page = "home" | "scenarioIntro" | "game" | "result" | "leaderboard" | "login" | "register";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState<Page>("login");
  const [authPage, setAuthPage] = useState<"login" | "register">("login");
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const [scenarioScore, setScenarioScore] = useState(0);
  const [scenarioRoundScores, setScenarioRoundScores] = useState<number[]>([]);
  const [completedScenarioDetails, setCompletedScenarioDetails] =
    useState<Scenario | null>(null);
  const [leaderboardScores, setLeaderboardScores] = useState<LeaderboardEntry[]>([]);
  const [currentLeaderboardUser, setCurrentLeaderboardUser] = useState<LeaderboardUserResult | null>(null);
  const [scenarioIntros, setScenarioIntros] = useState<ScenarioIntro[]>([]);
  const [gameSession, setGameSession] =
    useState<StartScenarioResult | null>(null);
  const [isStartingGame, setIsStartingGame] = useState(false);
  const [startGameError, setStartGameError] = useState<string | null>(null);

  async function handleRegister(username: string, password: string) {
    try {
      const [registeredUser, cards] = await Promise.all([
        postNewUser(username, password),
        getScenariosCard(),
      ]);

      setUser(registeredUser);
      setScenarioIntros(cards);
      setPage("home");
    } catch (error) {
      console.error("Impossible d'inscrire l'utilisateur", error);
    }
  }

  async function handleLogin(username: string, password: string) {
    try {
      const [connectedUser, cards] = await Promise.all([
        getOrCreateUser(username, password),
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
    setPage("login");
    setAuthPage("login");
    setSelectedScenarioId(null);
    setScenarioScore(0);
    setScenarioRoundScores([]);
    setCompletedScenarioDetails(null);
    setLeaderboardScores([]);
    setCurrentLeaderboardUser(null);
    setScenarioIntros([]);
    setGameSession(null);
    setIsStartingGame(false);
    setStartGameError(null);
  }

  function handleGoToRegister() {
    setAuthPage("register");
  }

  function handleGoToLogin() {
    setAuthPage("login");
  }

  function handleStartScenario(scenarioId: string) {
    setSelectedScenarioId(scenarioId);
    setGameSession(null);
    setCompletedScenarioDetails(null);
    setStartGameError(null);
    setPage("scenarioIntro");
  }

  async function handleStartGame() {
    if (
      user === null ||
      selectedScenarioId === null ||
      isStartingGame
    ) {
      return;
    }

    setIsStartingGame(true);
    setStartGameError(null);

    try {
      const startedGame = await startScenario(user.id, selectedScenarioId);
      setGameSession(startedGame);
      setPage("game");
    } catch (error) {
      console.error("Impossible de démarrer le scénario", error);
      setStartGameError(
        "Le scénario ne peut pas être démarré pour le moment.",
      );
    } finally {
      setIsStartingGame(false);
    }
  }

  function handleBackHome() {
    setSelectedScenarioId(null);
    setGameSession(null);
    setCompletedScenarioDetails(null);
    setStartGameError(null);
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
    if (authPage === "register") {
      return <RegisterPage onRegister={handleRegister} onGoToLogin={handleGoToLogin} />;
    }
    return <LoginPage onLogin={handleLogin} onGoToRegister={handleGoToRegister} />;
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
        isStarting={isStartingGame}
        startError={startGameError}
      />
    );
  }

  if (page === "game" && selectedScenarioId !== null) {
    if (gameSession === null) {
      return (
        <main className="page">
          <h1>Partie introuvable</h1>
          <button className="button" onClick={handleBackHome}>
            Retour aux scénarios
          </button>
        </main>
      );
    }

    const handleScenarioCompleted = (result: SubmitAnswersResult) => {
      setScenarioScore(result.scenarioScore ?? 0);
      setScenarioRoundScores(result.scenarioRoundScores ?? []);
      setCompletedScenarioDetails(result.scenarioDetails ?? null);

      if (result.updatedUser !== undefined) {
        setUser(result.updatedUser);
      }

      setPage("result");
    };

    function handleNextQuestion(nextQuestion: PublicQuestion) {
      if (gameSession === null) {
        return;
      }
      setGameSession({
        ...gameSession,
        question: nextQuestion,
        questionIndex: gameSession.questionIndex + 1,
      });
    }



    return (
      <GamePage
        gameSession={gameSession}
        onBackHome={handleBackHome}
        onScenarioCompleted={handleScenarioCompleted}
        onNextQuestion={handleNextQuestion}
      />
    );
  }

  if (page === "result") {
    return (
      <ResultPage
        scenario={completedScenarioDetails ?? undefined}
        scenarioTitle={
          completedScenarioDetails !== null
            ? `Dossier - ${completedScenarioDetails.title}`
            : selectedScenarioIntro !== null
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
