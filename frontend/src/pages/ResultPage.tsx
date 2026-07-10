import "./ResultPage.css";
import { useState } from "react";
import type { Scenario } from "../types/Scenario";
import { formatPieceCode, formatPieceTitle } from "../utils/formatGameLabels";
import { useTranslation } from "../i18n/useTranslation";

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
  const t = useTranslation();
  const [attackSlideIndex, setAttackSlideIndex] = useState(0);
  const globalAttackSlides =
    scenario?.globalAttackScenario !== undefined &&
    scenario.globalAttackScenario.trim().length > 0
      ? [
          {
            title: t.result.completeAttackScenario,
            text: scenario.globalAttackScenario,
            questionIndex: null,
          },
        ]
      : [];
  const questionAttackSlides =
    scenario?.questions
      .map((question, index) => ({
        title: `${t.result.attackExplanation} - ${formatPieceTitle(
          question.title,
          index,
          t.common.pieceLabel,
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
  const goodPractices = scenario?.goodPractices?.trim() ?? "";

  return (
    <main className="page result-page">
      <header className="result-page__hero">
        <div className="result-page__hero-main">
          <p className="page__eyebrow">{t.result.eyebrow}</p>
          <h1>{scenarioTitle}</h1>
        </div>

        <div className="result-page__scores">
          <div className="result-page__score result-page__score--scenario">
            {t.result.scenarioScore} : {scenarioScore} {t.common.points}
          </div>
          <div className="result-page__score result-page__score--global">
            {t.result.globalScore} : {globalScore} {t.common.points}
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
                aria-label={t.result.previousSlide}
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
                aria-label={t.result.nextSlide}
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

        {(scenarioRoundScores.length > 0 || goodPractices.length > 0) && (
          <div className="result-page__side-content">
            {scenarioRoundScores.length > 0 && (
              <section
                className="result-page__round-scores"
                aria-label={t.result.roundScoresLabel}
              >
                <h2>{t.result.pieceDetails}</h2>

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
                            ? formatPieceTitle(question.title, index, t.common.pieceLabel)
                            : `${t.common.pieceLabel} ${index + 1}`}
                        </span>

                        <span
                          className={`result-page__round-score-value${
                            score < 0
                              ? " result-page__round-score-value--negative"
                              : ""
                          }`}
                        >
                          {score >= 0 ? "+" : ""}
                          {score} {t.common.points}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </section>
            )}

            {goodPractices.length > 0 && (
              <section className="result-page__good-practices">
                <h2>{t.result.goodPracticesTitle}</h2>
                <p>{goodPractices}</p>
              </section>
            )}
          </div>
        )}
      </div>

      <div className="page__actions">
        <button className="button" onClick={onBackHome}>
          {t.common.backToScenarios}
        </button>

        <button className="button button--secondary" onClick={onGoLeaderBoard}>
          {t.common.leaderboard}
        </button>
      </div>
    </main>
  );
}

export default ResultPage;
