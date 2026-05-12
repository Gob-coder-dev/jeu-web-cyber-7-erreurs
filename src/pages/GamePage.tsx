type GamePageProps = {
  onBackHome: () => void;
};

function GamePage({ onBackHome }: GamePageProps) {
  return (
    <main>
      <h1>Jeu</h1>
      <p>Premiere question de cybersecurite a venir.</p>

      <button onClick={onBackHome}>Retour accueil</button>
    </main>
  );
}

export default GamePage;
