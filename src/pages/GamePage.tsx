import { questions } from "../data/questions";
import { useRef, useState } from "react";
import PhaserGame, { type PhaserGameHandle } from "../game/PhaserGame";
import "./GamePage.css";

type GamePageProps = {
  onBackHome: () => void;
  onGoResults: (score: number) => void;
};

function GamePage({ onBackHome, onGoResults }: GamePageProps) {
  const gameRef = useRef<PhaserGameHandle | null>(null);
  const question = questions[1];
  const [roundScore, setRoundScore] = useState<number | null>(null);

  function handleValidate() {
    const game = gameRef.current;

    if (game === null) {
      return;
    }

    const score = game.validateSelections();
    setRoundScore(score);
  }

  return (
    <main className="page game-page">
      <p className="page__eyebrow">Manche exemple</p>
      <h1>{question.title}</h1>
      <p className="page__intro">{question.hotspots.length} anomalies à trouver.</p>

      {roundScore !== null && (
        <div className="game-page__score-badge">+{roundScore} point(s)</div>
      )}

      <div className="page__actions">
        {roundScore === null ? (
          <button className="button" onClick={handleValidate}>
            Valider
          </button>
        ) : (
          <button className="button" onClick={() => onGoResults(roundScore)}>
            Voir les résultats
          </button>
        )}

        <button className="button button--secondary" onClick={onBackHome}>
          Retour accueil
        </button>
      </div>

      <PhaserGame ref={gameRef} question={question} />
    </main>
  );
}

export default GamePage;
