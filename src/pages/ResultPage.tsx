import "./ResultPage.css";
import { useEffect, useState } from "react";
import type { Scenario } from "../types/Scenario";

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
  const attackSlides =
    scenario?.questions
      ?.map((question) => question.attackScenario)
      ?.filter((slide) => slide && slide.trim().length > 0) ?? [];

  useEffect(() => {
    setAttackSlideIndex(0);
  }, [scenario?.questions]);

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
                disabled={attackSlideIndex <= 0}
                aria-label="Diapositive précédente"
              >
                {"<"}
              </button>

              <h2>Scénario d'attaque complet</h2>

              <button
                className="result-page__attack-arrow-button"
                type="button"
                onClick={() =>
                  setAttackSlideIndex((previousIndex) =>
                    Math.min(previousIndex + 1, attackSlides.length - 1)
                  )
                }
                disabled={attackSlideIndex >= attackSlides.length - 1}
                aria-label="Diapositive suivante"
              >
                {">"}
              </button>
            </div>

            <p className="result-page__attack-text">
              {attackSlides[attackSlideIndex]}
            </p>

            {attackSlides.length > 1 && (
              <div className="result-page__attack-pagination">
                {attackSlideIndex + 1}/{attackSlides.length}
              </div>
            )}
          </section>
        )}

        {scenarioRoundScores.length > 0 && (
          <section
            className="result-page__round-scores"
            aria-label="Scores par question"
          >
            <h2>Détail par question</h2>

            <ol className="result-page__round-score-list">
              {scenarioRoundScores.map((score, index) => {
                const question = scenario?.questions[index];

                return (
                  <li
                    className="result-page__round-score-item"
                    key={question?.id ?? index}
                  >
                    <span className="result-page__round-score-rank">
                      Q{index + 1}
                    </span>

                    <span className="result-page__round-score-label">
                      {question?.title ?? `Question ${index + 1}`}
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
