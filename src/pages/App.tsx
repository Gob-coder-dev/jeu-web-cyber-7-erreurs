import { useState } from "react";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import GamePage from "./GamePage";
import ResultPage from "./ResultPage";
import type { User } from "../types/User";
import type { Scenario } from "../types/Scenario";
import { UserService } from "../services/userServices";
import LeaderBoardPage from "./LeaderBoardPage";
import { scenarios } from "../data/scenarios";

type Page = "home" | "game" | "result" | "leaderboard";

const userService = new UserService();

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState<Page>("home");
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [scenarioScore, setScenarioScore] = useState(0);
  const [globalScore, setGlobalScore] = useState(0);
  const [scenarioScoresCompleted, setScenarioScoresCompleted] = useState<Record<string, number>>({});
  const [completedScenarioIds, setCompletedScenarioIds] = useState<string[]>([]);
  const [hasSavedGlobalScore, setHasSavedGlobalScore] = useState(false);

  const hasCompletedAllScenarios = Object.keys(scenarioScoresCompleted).length === scenarios.length;

  function handleLogin(pseudo: string) {
    const existingUser = userService.getUserByPseudo(pseudo);
    
    if (existingUser) {
      // Charger l'utilisateur existant avec sa progression
      setUser(existingUser);
      setCompletedScenarioIds(existingUser.completedScenarioIds);
      setGlobalScore(existingUser.score);
    } else {
      // Créer un nouveau compte
      const newUser: User = {
        id: crypto.randomUUID(),
        pseudo,
        completedScenarioIds: [],
        score: 0,
        date: new Date().toISOString(),
      };
      userService.addUser(newUser);
      setUser(newUser);
      setCompletedScenarioIds([]);
      setGlobalScore(0);
    }
    
    setPage("home");
  }

  function handleLogout() {
    setUser(null);
    setPage("home");
    setSelectedScenario(null);
    setScenarioScore(0);
    setGlobalScore(0);
    setScenarioScoresCompleted({});
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
      : [
          ...completedScenarioIds,
          selectedScenario.id
        ];
    const nextGlobalScore = scenarioAlreadyCompleted
      ? globalScore
      : globalScore + score;

    setScenarioScore(score);
    setGlobalScore(nextGlobalScore);
    setCompletedScenarioIds(nextCompletedScenarioIds);
    
    if (user === null) {
      return;
    }


     // Mettre à jour l'utilisateur dans le localStorage
    const updatedUser: User = {
        ...user,
        completedScenarioIds: nextCompletedScenarioIds,
        score: nextGlobalScore,
        date: new Date().toISOString(),
      };
      setUser(updatedUser);
      userService.updateUser(updatedUser);

/*    if (!hasSavedGlobalScore) {
      userService.addScore({
        score: nextGlobalScore,
        pseudo: user?.pseudo || "Anonyme",
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
      });
      setHasSavedGlobalScore(true);
    }*/

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
        scores={userService.getScores()}
        currentPseudo={user.pseudo}
        onBackHome={handleBackHome}
      />
    );
  }

  return (
    <HomePage
      user={user}
      scenarios={scenarios}
      scenarioScoresCompleted={scenarioScoresCompleted}
      globalScore={globalScore}
      onLogout={handleLogout}
      onGoLeaderBoard={handleGoLeaderBoard}
      onStartScenario={handleStartScenario}
    />
  );
}

export default App;
