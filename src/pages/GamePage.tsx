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
  const [showImage, setShowImage] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [buttonReady, setButtonReady] = useState(false);
  const [timerDisabled, setTimerDisabled] = useState(false);
  const question = scenario.questions[questionIndex];

  // Raccourcis clavier: Shift + D pour debug, Shift + T pour désactiver le timer
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key === 'D') {
        gameRef.current?.toggleDebugHotspots();
      }
      if (event.shiftKey && event.key === 'T') {
        event.preventDefault();
        setTimerDisabled((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    setShowImage(false);
    setButtonReady(false);
    setCountdown(3);
    if (timerDisabled) {
      setButtonReady(true);
      return;
    }

    const countdownInterval = window.setInterval(() => {
      setCountdown((previousCountdown) => {
        if (previousCountdown <= 1) {
          setButtonReady(true);
          window.clearInterval(countdownInterval);
          return 0;
        }

        return previousCountdown - 1;
      });
    }, 1000);

    return () => window.clearInterval(countdownInterval);
  }, [questionIndex, timerDisabled]);

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
    <main className={`page game-page ${showImage ? "game-page--image-visible" : "game-page--image-pas-visible"}`}>
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
        </header>

        {!showImage ? (
          <div className="game-page__start-panel">
            <p className="game-page__instruction">
            {question.hotspots.length} anomalies à trouver.
            </p>
            <button
              className="button"
              disabled={!buttonReady}
              onClick={() => setShowImage(true)}
            >
              {buttonReady
                ? "Afficher l'image"
                : `Afficher l'image dans ${countdown}s`}
            </button>
          </div>
        ) : (
          <>
            <p className="game-page__instruction">
            {question.hotspots.length} anomalies à trouver.
            </p>
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
          </>
        )}
      </section>
    </main>
  );
}

export default GamePage;
