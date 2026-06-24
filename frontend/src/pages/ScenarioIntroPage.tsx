import type { ScenarioIntro } from "../types/Scenario";
import "./ScenarioIntroPage.css";

type ScenarioIntroPageProps = {
  scenario: ScenarioIntro;
  onStartGame: () => void;
  onBackHome: () => void;
  isStarting: boolean;
  startError: string | null;
};

function ScenarioIntroPage({
  scenario,
  onStartGame,
  onBackHome,
  isStarting,
  startError,
}: ScenarioIntroPageProps) {
  return (
    <main className="page scenario-intro-page">
      <section className="scenario-intro-page__panel">
        <div className="scenario-intro-page__content">
          <p className="page__eyebrow">Introduction du dossier</p>
          <h1>Dossier - {scenario.title}</h1>
          <p className="scenario-intro-page__description">
            {scenario.description}
          </p>
        </div>

        <aside className="scenario-intro-page__side">
          <div className="scenario-intro-page__case-summary">
            <span>{scenario.numberOfQuestions}</span>
            <p>pièces à examiner</p>
          </div>

          <div className="scenario-intro-page__actions">
            <button
              className="button"
              disabled={isStarting}
              onClick={onStartGame}
            >
              {isStarting ? "Chargement..." : "Commencer l'enquête"}
            </button>
            <button
              className="button button--secondary"
              disabled={isStarting}
              onClick={onBackHome}
            >
              Retour aux scénarios
            </button>
          </div>

          {startError !== null && (
            <p role="alert">{startError}</p>
          )}
        </aside>
      </section>
    </main>
  );
}

export default ScenarioIntroPage;
