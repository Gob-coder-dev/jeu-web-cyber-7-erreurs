import { useEffect, useState } from "react";
import PhaserGame from "../game/PhaserGame";
import type { StartScenarioResult } from "../types/GameSession";
import {
  formatOrderNumber,
  formatPieceTitle,
} from "../utils/formatGameLabels";
import "./GamePage.css";

type GamePageProps = {
  gameSession: StartScenarioResult;
  onBackHome: () => void;
};

function GamePage({ gameSession, onBackHome }: GamePageProps) {
  const [showImage, setShowImage] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [timerDisabled, setTimerDisabled] = useState(false);
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
              {question.hotspotCount} anomalies à trouver.
            </p>

            <PhaserGame question={question} />

            <div className="game-page__bottom-bar">
              <div className="game-page__score-area" />
              <button className="button" disabled>
                Valider
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default GamePage;
