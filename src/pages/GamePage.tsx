import { useRef, useState, useEffect } from "react";
import PhaserGame, { type PhaserGameHandle } from "../game/PhaserGame";
import type { Scenario } from "../types/Scenario";
import "./GamePage.css";

type GamePageProps = {
  scenario: Scenario;
  onBackHome: () => void;
  onGoResults: (score: number) => void;
};

function GamePage({ scenario, onBackHome, onGoResults }: GamePageProps) {
  const gameRef = useRef<PhaserGameHandle | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [roundScore, setRoundScore] = useState<number | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const question = scenario.questions[questionIndex];

  // Raccourci clavier Maj+D pour basculer les zones de debug
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key === 'D') {
        gameRef.current?.toggleDebugHotspots();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  function handleValidate() {
    const game = gameRef.current;

    if (game === null) {
      return;
    }

    const score = game.validateSelections();
    setRoundScore(score);
    setTotalScore((previousTotalScore) => previousTotalScore + score);
  }

  function handleNextQuestion() {
    setQuestionIndex(questionIndex + 1);
    setRoundScore(null);
  }

  return (
    <main className="page game-page">
      <section className="game-page__content">
        <div className="game-page__topbar">
          <p className="page__eyebrow">
            {scenario.title} - Question {questionIndex + 1} / {scenario.questions.length}
          </p>

          <button className="button button--secondary" onClick={onBackHome}>
            Retour accueil
          </button>
        </div>

        <header className="game-page__header">
          <h1>{question.title}</h1>
          <p className="page__intro">{question.instruction}</p>
          <p className="game-page__instruction">
            {question.hotspots.length} anomalies à trouver.
          </p>
        </header>

        <PhaserGame ref={gameRef} question={question} />

        <div className="game-page__bottom-bar">
          <div className="game-page__score-area">
            {roundScore !== null && (
              <div className="game-page__score-badge">{roundScore >= 0 ? '+' : ''}{roundScore} point(s)</div>
            )}
          </div>

          {roundScore === null ? (
            <button className="button" onClick={handleValidate}>
              Valider
            </button>
          ) : questionIndex < scenario.questions.length - 1 ? (
            <button className="button" onClick={handleNextQuestion}>
              Question suivante
            </button>
          ) : (
            <button className="button" onClick={() => onGoResults(totalScore)}>
              Voir les résultats
            </button>
          )}
        </div>
      </section>
    </main>
  );
}

export default GamePage;
