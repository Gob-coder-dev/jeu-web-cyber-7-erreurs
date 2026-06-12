import "./ResultPage.css";
import type { Scenario } from "../types/Scenario";

type ResultPageProps = {
  scenario?: Scenario;
  scenarioTitle: string;
  scenarioScore: number;
  globalScore: number;
  onBackHome: () => void;
  onGoLeaderBoard: () => void;
};

function ResultPage({
  scenario,
  scenarioTitle,
  scenarioScore,
  globalScore,
  onBackHome,
  onGoLeaderBoard,
}: ResultPageProps) {
  return (
    <main className="page result-page">
      <p className="page__eyebrow">Fin de scénario</p>
      <h1>{scenarioTitle}</h1>

      <div className="result-page__scores">
        <div className="result-page__score">
          Score du scénario : {scenarioScore} pts
        </div>
        <div className="result-page__score result-page__score--global">
          Score global : {globalScore} pts
        </div>
      </div>

      {scenario?.globalAttackScenario && (
        <div className="result-page__attack-section">
          <h2>Scénario d'attaque complet</h2>
          <p className="result-page__attack-text">
            {scenario.globalAttackScenario}
          </p>
        </div>
      )}

      <div className="page__actions">
        <button className="button" onClick={onBackHome}>
          Retour aux scénarios
        </button>


        <button className="button button--secondary" onClick={onGoLeaderBoard}>
          Voir le classement
        </button>
      </div>
    </main>
  );
}

export default ResultPage;
