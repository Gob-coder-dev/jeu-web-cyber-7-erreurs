import "./ResultPage.css";

type ResultPageProps = {
  score: number;
  onBackHome: () => void;
};

function ResultPage({ score, onBackHome }: ResultPageProps) {
  return (
    <main className="page result-page">
      <p className="page__eyebrow">Fin de manche</p>
      <h1>Résultat</h1>
      <div className="result-page__score">Score final : {score}</div>

      <button className="button" onClick={onBackHome}>Retour accueil</button>
    </main>
  );
}

export default ResultPage;
