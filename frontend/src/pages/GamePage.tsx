import { useEffect, useState, useRef } from "react";
import PhaserGame, { type PhaserGameHandle } from "../game/PhaserGame";
import type { StartScenarioResult } from "../types/GameSession";
import type { SubmitAnswersResult, PublicQuestion } from "../types/Question";
import { submitAnswers } from "../services/apiClient";
import {
  formatOrderNumber,
  formatPieceTitle,
} from "../utils/formatGameLabels";
import "./GamePage.css";

type GamePageProps = {
  gameSession: StartScenarioResult;
  onBackHome: () => void;
  onScenarioCompleted: (result: SubmitAnswersResult) => void;
  onNextQuestion: (nextQuestion: PublicQuestion) => void;
};

function GamePage({
  gameSession,
  onBackHome,
  onScenarioCompleted,
  onNextQuestion,
}: GamePageProps) {
  const phaserRef = useRef<PhaserGameHandle | null>(null);
  const [showImage, setShowImage] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [timerDisabled, setTimerDisabled] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [correction, setCorrection] = useState<SubmitAnswersResult | null>(null);

  const question = gameSession.question;
  const buttonReady = timerDisabled || countdown === 0;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key === "T") {
        event.preventDefault();
        setTimerDisabled((previousValue) => !previousValue);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (timerDisabled || showImage || countdown <= 0) {
      return;
    }

    const countdownInterval = window.setInterval(() => {
      setCountdown((previousCountdown) =>
        Math.max(0, previousCountdown - 1),
      );
    }, 1000);

    return () => {
      window.clearInterval(countdownInterval);
    };
  }, [countdown, showImage, timerDisabled]);

  async function handleValidate() {
    if (isSubmitting || phaserRef.current === null || startTime === null) {
      return;
    }

    setIsSubmitting(true);
    const selections = phaserRef.current.getSelections();
    const timeTaken = Math.round((Date.now() - startTime) / 1000);

    try {
      const result = await submitAnswers(
        gameSession.attemptId,
        selections,
        timeTaken
      );
      setCorrection(result);
      phaserRef.current.showCorrection(result.hotspots);
    } catch (err) {
      console.error("Erreur lors de la validation", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleContinue() {
    if (correction === null) {
      return;
    }

    if (correction.scenarioCompleted) {
      onScenarioCompleted(correction);
    } else if (correction.nextQuestion !== null) {
      onNextQuestion(correction.nextQuestion);
      // Reset state for the next question
      setCorrection(null);
      setShowImage(false);
      setCountdown(3);
      setStartTime(null);
    }
  }

  return (
    <main
      className={`page game-page ${
        showImage
          ? "game-page--image-visible"
          : "game-page--image-pas-visible"
      }`}
    >
      <section className="game-page__content">
        <div className="game-page__topbar">
          <p className="page__eyebrow">
            Dossier - {gameSession.scenarioTitle} - Pièce{" "}
            {formatOrderNumber(gameSession.questionIndex)} /{" "}
            {formatOrderNumber(gameSession.questionCount - 1)}
          </p>

          <button className="button button--secondary" onClick={onBackHome}>
            Retour accueil
          </button>
        </div>

        <header className="game-page__header">
          <h1>
            {formatPieceTitle(question.title, gameSession.questionIndex)}
          </h1>
          <p className="page__intro">{question.instruction}</p>
        </header>

        {!showImage ? (
          <div className="game-page__start-panel">
            <p className="game-page__instruction">
              {question.hotspotCount} anomalies à trouver.
            </p>
            <button
              className="button"
              disabled={!buttonReady}
              onClick={() => {
                setShowImage(true);
                setStartTime(Date.now());
              }}
            >
              {buttonReady
                ? "Afficher l'image"
                : `Afficher l'image dans ${countdown}s`}
            </button>
          </div>
        ) : (
          <>
            <p className="game-page__instruction">
              {question.hotspotCount} anomalies à trouver.
            </p>

            <PhaserGame ref={phaserRef} question={question} />

            <div className="game-page__bottom-bar">
              <div className="game-page__score-area">
                {correction !== null && (
                  <div className="game-page__score-badge">
                    Score : {correction.roundScore >= 0 ? "+" : ""}
                    {correction.roundScore} pts
                  </div>
                )}
              </div>

              {correction === null ? (
                <button
                  className="button"
                  onClick={handleValidate}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Validation..." : "Valider"}
                </button>
              ) : (
                <button className="button" onClick={handleContinue}>
                  {correction.scenarioCompleted
                    ? "Terminer le scénario"
                    : "Question suivante"}
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
