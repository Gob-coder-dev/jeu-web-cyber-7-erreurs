import { useState } from "react";
import type { Scenario } from "../types/Scenario";
import type { User } from "../types/User";
import { ConfirmReplayModal } from "../components/ConfirmReplayModal";
import { formatScenarioTitle } from "../utils/formatGameLabels";
import "./HomePage.css";

type HomePageProps = {
  user: User;
  scenarios: Scenario[];
  globalScore: number;
  onLogout: () => void;
  onGoLeaderBoard: () => void;
  onStartScenario: (scenario: Scenario) => void;
};

function HomePage({
  user,
  scenarios,
  globalScore,
  onLogout,
  onGoLeaderBoard,
  onStartScenario,
}: HomePageProps) {
  const [scenarioToReplay, setScenarioToReplay] = useState<Scenario | null>(null);

  function handleStartScenario(scenario: Scenario) {
    const hasPlayed = user.scenarioScores[scenario.id] !== undefined;

    if (!hasPlayed) {
      onStartScenario(scenario);
      return;
    }

    setScenarioToReplay(scenario);
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
        {scenarios.map((scenario, index) => {
          const scenarioScore = user.scenarioScores[scenario.id]?.score;
          const hasScore = scenarioScore !== undefined;

          return (
            <article className="home-page__scenario" key={scenario.id}>
              <div className="home-page__scenario-meta">
                <span>{scenario.questions.length} questions</span>
                <span className="home-page__status-slot">
                  {hasScore && "Terminé"}
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
                <button
                  className="button home-page__button--play"
                  onClick={() => handleStartScenario(scenario)}
                >
                  Jouer
                </button>
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
