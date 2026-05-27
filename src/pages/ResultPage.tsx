type ResultPageProps = {
  score: number;
  onBackHome: () => void;
};

function ResultPage({ score, onBackHome }: ResultPageProps) {
  return (
    <main>
      <h1>Résultat</h1>
      <p>Score final : {score}</p>

      <button onClick={onBackHome}>Retour accueil</button>
    </main>
  );
}

export default ResultPage;
