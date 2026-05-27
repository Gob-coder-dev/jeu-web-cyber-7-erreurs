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
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = questions[questionIndex];
  const [roundScore, setRoundScore] = useState<number | null>(null);
  const [totalScore, setTotalScore] = useState(0);

  function handleValidate() {
    const game = gameRef.current;

    if (game === null) {
      return;
    }

    const score = game.validateSelections();
    setRoundScore(score);
    setTotalScore(totalScore + score);
  }

  return (
    <main className="page game-page">
      <p className="page__eyebrow">Problème {questionIndex + 1}</p>
      <h1>{question.title}</h1>
      <p className="page__intro">{question.instruction}</p>
      <p className="page__instruction">{question.hotspots.length} anomalies à trouver.</p>

      <div className="page__actions">
        {roundScore === null ? (
          <button className="button" onClick={handleValidate}>
            Valider
          </button>
        ) : questionIndex < questions.length - 1 ? (
          <button className="button" onClick={() => {
            setQuestionIndex(questionIndex + 1);
            setRoundScore(null);
          }}>
            Question suivante
          </button>
        ) : (
          <button className="button" onClick={() => onGoResults(totalScore)}>
            Voir les résultats
          </button>
        )}

        <button className="button button--secondary" onClick={onBackHome}>
          Retour accueil
        </button>

        {roundScore !== null && (
          <div className="game-page__score-badge">+{roundScore} point(s)</div>
        )}
      </div>

      <PhaserGame ref={gameRef} question={question} />
    </main>
  );
}

export default GamePage;
