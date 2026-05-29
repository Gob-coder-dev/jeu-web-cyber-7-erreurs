import "./ResultPage.css";

type ResultPageProps = {
  scenarioTitle: string;
  scenarioScore: number;
  globalScore: number;
  hasCompletedAllScenarios: boolean;
  onBackHome: () => void;
  onGoLeaderBoard: () => void;
};

function ResultPage({
  scenarioTitle,
  scenarioScore,
  globalScore,
  hasCompletedAllScenarios,
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

      <div className="page__actions">
        <button className="button" onClick={onBackHome}>
          Retour aux scénarios
        </button>

        {hasCompletedAllScenarios && (
          <button className="button button--secondary" onClick={onGoLeaderBoard}>
            Voir le classement
          </button>
        )}
      </div>
    </main>
  );
}

export default ResultPage;
