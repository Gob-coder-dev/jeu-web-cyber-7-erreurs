import { useEffect, useState, useRef } from "react";
import PhaserGame, { type PhaserGameHandle } from "../game/PhaserGame";
import ProgressiveText from "../components/ProgressiveText";
import type { StartScenarioResult } from "../types/GameSession";
import type { SubmitAnswersResult, PublicQuestion } from "../types/Question";
import { startTimer, submitAnswers } from "../services/apiClient";
import {
  formatOrderNumber,
  formatPieceTitle,
} from "../utils/formatGameLabels";
import { useTranslation } from "../i18n/useTranslation";
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
  const t = useTranslation();
  const phaserRef = useRef<PhaserGameHandle | null>(null);
  const [showImage, setShowImage] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [timerDisabled, setTimerDisabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [correction, setCorrection] = useState<SubmitAnswersResult | null>(null);
  const [revealedInstructionTextKey, setRevealedInstructionTextKey] = useState<string | null>(null);

  const question = gameSession.question;
  const instructionTextKey = `${question.id}:${question.instruction}`;
  const instructionTextRevealed = revealedInstructionTextKey === instructionTextKey;
  const countdownReady = timerDisabled || countdown === 0;
  const buttonReady = instructionTextRevealed && countdownReady;
  const showImageButtonLabel = countdownReady
    ? t.game.showImage
    : `${t.game.showImageIn} ${countdown}s`;
  const [magnifierActive, setMagnifierActive] = useState(false);

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

  useEffect(() => {
      if (showImage) {
          phaserRef.current?.toggleMagnifier(magnifierActive);
        }
    }, [magnifierActive, showImage, gameSession.questionIndex]);

  async function handleValidate() {
    if (isSubmitting || phaserRef.current === null) {
      return;
    }
    
    setIsSubmitting(true);
    const selections = phaserRef.current.getSelections();

    try {
      const result = await submitAnswers(
        gameSession.attemptId,
        question.id,
        selections
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
      setMagnifierActive(false);
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
            {t.common.caseLabel} - {gameSession.scenarioTitle} - {t.common.pieceLabel}{" "}
            {formatOrderNumber(gameSession.questionIndex)} /{" "}
            {formatOrderNumber(gameSession.questionCount - 1)}
          </p>

          <button className="button button--secondary" onClick={onBackHome}>
            {t.game.backHome}
          </button>
        </div>

        <header className="game-page__header">
          <h1>
            {formatPieceTitle(
              question.title,
              gameSession.questionIndex,
              t.common.pieceLabel,
            )}
          </h1>
          <ProgressiveText
            key={instructionTextKey}
            text={question.instruction}
            className="page__intro"
            onComplete={() => setRevealedInstructionTextKey(instructionTextKey)}
          />
        </header>

        {!showImage ? (
          <div className="game-page__start-panel">
            <p className="game-page__instruction">
              {question.hotspotCount} {t.game.anomaliesToFind}
            </p>
            <button
              className="button"
              disabled={!buttonReady}
              onClick={async () => {
                await startTimer(gameSession.attemptId, question.id);
                setShowImage(true);
              }}
            >
              {showImageButtonLabel}
            </button>
          </div>
        ) : (
          <>
            <p className="game-page__instruction">
              {question.hotspotCount} {t.game.anomaliesToFind}
            </p>

            <PhaserGame ref={phaserRef} question={question} />

            <div className="game-page__bottom-bar">
              <div className="game-page__score-area">
                {correction !== null && (
                  <div className="game-page__score-badge">
                    {t.game.score} : {correction.roundScore >= 0 ? "+" : ""}
                    {correction.roundScore} {t.common.points}
                  </div>
                )}
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                {showImage && !isSubmitting && (
                  <button 
                    type="button"
                    className={`button ${magnifierActive ? 'button--active' : 'button--secondary'}`} 
                    onClick={() => setMagnifierActive(!magnifierActive)}
                  >
                    {magnifierActive ? t.game.disableMagnifier : t.game.enableMagnifier}
                  </button>
                )}
              </div>

              {correction === null ? (
                <button
                  className="button"
                  onClick={handleValidate}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t.game.validating : t.game.validate}
                </button>
              ) : (
                <button className="button" onClick={handleContinue}>
                  {correction.scenarioCompleted
                    ? t.game.finishScenario
                    : t.game.nextQuestion}
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
