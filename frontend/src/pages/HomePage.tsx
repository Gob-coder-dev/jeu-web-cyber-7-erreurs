import { useState } from "react";
import type { ScenarioIntro } from "../types/Scenario";
import type { User } from "../types/User";
import { ConfirmReplayModal } from "../components/ConfirmReplayModal";
import { formatScenarioTitle } from "../utils/formatGameLabels";
import "./HomePage.css";

type HomePageProps = {
  user: User;
  scenarioIntros: ScenarioIntro[];
  globalScore: number;
  onLogout: () => void;
  onGoLeaderBoard: () => void;
  onStartScenario: (scenarioId: string) => void;
};

function HomePage({
  user,
  scenarioIntros,
  globalScore,
  onLogout,
  onGoLeaderBoard,
  onStartScenario,
}: HomePageProps) {
  const [scenarioToReplay, setScenarioToReplay] = useState<string | null>(null);

  function handleStartScenario(scenarioId: string) {
    const hasPlayed = user.completedScenarioIds.find((scenario) => scenario === scenarioId) !== undefined;

    if (!hasPlayed) {
      onStartScenario(scenarioId);
      return;
    }

    setScenarioToReplay(scenarioId);
  }

  return (
    <main className="page home-page">
      <header className="home-page__hero">
        <div className="home-page__hero-main">
          <p className="page__eyebrow">Simulation cybersécurité</p>
          <h1>Bienvenue {user.pseudo}</h1>
          <p className="page__intro">
            Choisis un scénario, repère les anomalies et construis ton score global.
          </p>

          <div className="home-page__score--global">
            Score global : {globalScore} pts
          </div>
        </div>

        <div className="home-page__hero-actions">
          <button className="button button--secondary" onClick={onLogout}>
            Se déconnecter
          </button>
          <button className="button" onClick={onGoLeaderBoard}>
            Voir le classement
          </button>
        </div>
      </header>

      <section className="home-page__scenarios" aria-label="Scénarios">
        {scenarioIntros.map((scenario, index) => {
          const scenarioScore = user.scenarioScores[scenario.id]?.score;
          const hasScore = scenarioScore !== undefined;
          const isLocked = scenario.isLocked ?? false;

          return (
            <article className="home-page__scenario" key={scenario.id}>
              <div className="home-page__scenario-meta">
                <span>{scenario.numberOfQuestions} questions</span>
                <span className="home-page__status-slot">
                  {hasScore && "Terminé"}
                  {isLocked && "Verrouillé"}
                </span>
                <span className="home-page__score-slot">
                  {hasScore && (
                    <span className="home-page__score--scenario">
                      {scenarioScore} pts
                    </span>
                  )}
                </span>
              </div>

              <div className="home-page__scenario-main">
                <h2>{formatScenarioTitle(scenario.title, index)}</h2>
                {isLocked ? (
                  <div className="home-page__scenario-locked">
                    <p>Complète d'abord le tutoriel pour accéder à ce scénario</p>
                  </div>
                ) : (
                  <button
                    className="button home-page__button--play"
                    onClick={() => handleStartScenario(scenario.id)}
                  >
                    <span>Jouer</span>
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </section>

      {scenarioToReplay !== null && (
        <ConfirmReplayModal
          onCancel={() => setScenarioToReplay(null)}
          onConfirm={() => {
            onStartScenario(scenarioToReplay);
            setScenarioToReplay(null);
          }}
        />
      )}
    </main>
  );
}

export default HomePage;
