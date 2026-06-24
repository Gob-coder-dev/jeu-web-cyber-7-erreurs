import { useRef, useState, useEffect } from "react";
import PhaserGame, { type PhaserGameHandle } from "../game/PhaserGame";
import type { Scenario } from "../types/Scenario";
import {
  formatOrderNumber,
  formatPieceTitle,
} from "../utils/formatGameLabels";
import "./GamePage.css";

type GamePageProps = {
  scenario: Scenario;
  onBackHome: () => void;
  onGoResults: (score: number, roundScores: number[]) => void;
};

function GamePage({
  scenario,
  onBackHome,
  onGoResults,
}: GamePageProps) {
  const gameRef = useRef<PhaserGameHandle | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [roundScores, setRoundScores] = useState<number[]>([]);
  const [showImage, setShowImage] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [timerDisabled, setTimerDisabled] = useState(false);
  const question = scenario.questions[questionIndex];
  const currentRoundScore = roundScores[questionIndex];
  const hasValidatedCurrentQuestion = currentRoundScore !== undefined;
  const totalScore = roundScores.reduce(
    (previousTotalScore, roundScore) => previousTotalScore + roundScore,
    0
  );
  const buttonReady = timerDisabled || countdown === 0;
  const [magnifierActive, setMagnifierActive] = useState(false);

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
    if (timerDisabled || showImage || countdown <= 0) {
      return;
    }

    const countdownInterval = window.setInterval(() => {
      setCountdown((previousCountdown) => {
        return Math.max(0, previousCountdown - 1);
      });
    }, 1000);

    return () => window.clearInterval(countdownInterval);
  }, [countdown, showImage, timerDisabled]);

  useEffect(() => {
    if (showImage) {
        gameRef.current?.toggleMagnifier(magnifierActive);
      }
  }, [magnifierActive, showImage, questionIndex]);

  function handleValidate() {
    const game = gameRef.current;

    if (game === null) {
      return;
    }

    const score = game.validateSelections();
    setRoundScores((previousRoundScores) => {
      const nextRoundScores = [...previousRoundScores];
      nextRoundScores[questionIndex] = score;
      return nextRoundScores;
    });

    gameRef.current?.toggleDebugHotspots();
  }

  function handleNextQuestion() {
    setQuestionIndex((previousQuestionIndex) => previousQuestionIndex + 1);
    setShowImage(false);
    setCountdown(3);
  }

  return (
    <main className={`page game-page ${showImage ? "game-page--image-visible" : "game-page--image-pas-visible"}`}>
      <section className="game-page__content">
        <div className="game-page__topbar">
          <p className="page__eyebrow">
            Dossier - {scenario.title} - Pièce{" "}
            {formatOrderNumber(questionIndex)} / {formatOrderNumber(scenario.questions.length - 1)}
          </p>

          <button className="button button--secondary" onClick={onBackHome}>
            Retour accueil
          </button>
        </div>

        <header className="game-page__header">
          <h1>{formatPieceTitle(question.title, questionIndex)}</h1>
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
                {hasValidatedCurrentQuestion && (
                  <div className="game-page__score-badge">
                    {currentRoundScore >= 0 ? '+' : ''}{currentRoundScore} point(s)
                  </div>
                )}
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                {showImage && !hasValidatedCurrentQuestion && (
                  <button 
                    type="button"
                    className={`button ${magnifierActive ? 'button--active' : 'button--secondary'}`} 
                    onClick={() => setMagnifierActive(!magnifierActive)}
                  >
                    {magnifierActive ? "Désactiver la loupe" : "Activer la loupe"}
                  </button>
                )}

                {!hasValidatedCurrentQuestion ? (
                  <button className="button" onClick={handleValidate}>
                    Valider
                  </button>
                ) : questionIndex < scenario.questions.length - 1 ? (
                  <button className="button" onClick={handleNextQuestion}>
                    Pièce suivante
                  </button>
                ) : (
                  <button className="button" onClick={() => onGoResults(totalScore, roundScores)}>
                    Voir les résultats
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default GamePage;
