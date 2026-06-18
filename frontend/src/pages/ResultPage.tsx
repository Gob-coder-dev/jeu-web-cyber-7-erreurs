import "./ResultPage.css";
import { useState } from "react";
import type { Scenario } from "../types/Scenario";
import { formatPieceCode, formatPieceTitle } from "../utils/formatGameLabels";

type ResultPageProps = {
  scenario?: Scenario;
  scenarioTitle: string;
  scenarioScore: number;
  globalScore: number;
  scenarioRoundScores: number[];
  onBackHome: () => void;
  onGoLeaderBoard: () => void;
};

function ResultPage({
  scenario,
  scenarioTitle,
  scenarioScore,
  globalScore,
  scenarioRoundScores,
  onBackHome,
  onGoLeaderBoard,
}: ResultPageProps) {
  const [attackSlideIndex, setAttackSlideIndex] = useState(0);
  const globalAttackSlides =
    scenario?.globalAttackScenario !== undefined &&
    scenario.globalAttackScenario.trim().length > 0
      ? [
          {
            title: "Scénario d'attaque complet",
            text: scenario.globalAttackScenario,
            questionIndex: null,
          },
        ]
      : [];
  const questionAttackSlides =
    scenario?.questions
      .map((question, index) => ({
        title: `Explication d'attaque - ${formatPieceTitle(
          question.title,
          index
        )}`,
        text: question.attackScenario,
        questionIndex: index,
      }))
      .filter((slide) => slide.text.trim().length > 0) ?? [];
  const attackSlides = [...globalAttackSlides, ...questionAttackSlides];
  const lastAttackSlideIndex = Math.max(attackSlides.length - 1, 0);
  const currentAttackSlideIndex = Math.min(
    attackSlideIndex,
    lastAttackSlideIndex
  );
  const currentAttackSlide = attackSlides[currentAttackSlideIndex];

  return (
    <main className="page result-page">
      <header className="result-page__hero">
        <div className="result-page__hero-main">
          <p className="page__eyebrow">Fin de scénario</p>
          <h1>{scenarioTitle}</h1>
        </div>

        <div className="result-page__scores">
          <div className="result-page__score result-page__score--scenario">
            Score du scénario : {scenarioScore} pts
          </div>
          <div className="result-page__score result-page__score--global">
            Score global : {globalScore} pts
          </div>
        </div>
      </header>

      <div className="result-page__content-grid">
        {attackSlides.length > 0 && (
          <section className="result-page__attack-section">
            <div className="result-page__attack-header">
              <button
                className="result-page__attack-arrow-button"
                type="button"
                onClick={() =>
                  setAttackSlideIndex((previousIndex) =>
                    Math.max(previousIndex - 1, 0)
                  )
                }
                disabled={currentAttackSlideIndex <= 0}
                aria-label="Diapositive précédente"
              >
                {"<"}
              </button>

              <h2>{currentAttackSlide.title}</h2>

              <button
                className="result-page__attack-arrow-button"
                type="button"
                onClick={() =>
                  setAttackSlideIndex((previousIndex) =>
                    Math.min(previousIndex + 1, lastAttackSlideIndex)
                  )
                }
                disabled={currentAttackSlideIndex >= lastAttackSlideIndex}
                aria-label="Diapositive suivante"
              >
                {">"}
              </button>
            </div>

            <p className="result-page__attack-text">
              {currentAttackSlide.text}
            </p>

            {attackSlides.length > 1 && (
              <div className="result-page__attack-pagination">
                {currentAttackSlideIndex + 1}/{attackSlides.length}
              </div>
            )}
          </section>
        )}

        {scenarioRoundScores.length > 0 && (
          <section
            className="result-page__round-scores"
            aria-label="Scores par question"
          >
            <h2>Détail par pièce</h2>

            <ol className="result-page__round-score-list">
              {scenarioRoundScores.map((score, index) => {
                const question = scenario?.questions[index];
                const isCurrentQuestionSlide =
                  currentAttackSlide?.questionIndex === index;

                return (
                  <li
                    className={`result-page__round-score-item${
                      isCurrentQuestionSlide
                        ? " result-page__round-score-item--current"
                        : ""
                    }`}
                    key={question?.id ?? index}
                  >
                    <span className="result-page__round-score-rank">
                      {formatPieceCode(index)}
                    </span>

                    <span className="result-page__round-score-label">
                      {question !== undefined
                        ? formatPieceTitle(question.title, index)
                        : `Pièce ${index + 1}`}
                    </span>

                    <span
                      className={`result-page__round-score-value${
                        score < 0
                          ? " result-page__round-score-value--negative"
                          : ""
                      }`}
                    >
                      {score >= 0 ? "+" : ""}
                      {score} pts
                    </span>
                  </li>
                );
              })}
            </ol>
          </section>
        )}
      </div>

      <div className="page__actions">
        <button className="button" onClick={onBackHome}>
          Retour aux scénarios
        </button>

        <button className="button button--secondary" onClick={onGoLeaderBoard}>
          Voir le classement
        </button>
      </div>
    </main>
  );
}

export default ResultPage;
