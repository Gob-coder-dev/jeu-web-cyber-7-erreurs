import "./ResultPage.css";

type ResultPageProps = {
  score: number;
  onBackHome: () => void;
  onGoLeaderBoard: () => void;
};

function ResultPage({ score, onBackHome, onGoLeaderBoard }: ResultPageProps) {
  return (
    <main className="page result-page">
      <p className="page__eyebrow">Fin de manche</p>
      <h1>Résultat</h1>
      <div className="result-page__score">Score final : {score}</div>

      <button className="button" onClick={onBackHome}>Retour accueil</button>
      <button className="button" onClick={onGoLeaderBoard}>Voir le classement</button>
    </main>
  );
}

export default ResultPage;
