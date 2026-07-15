import { useState } from "react";
import type { ScenarioIntro } from "../types/Scenario";
import ProgressiveText from "../components/ProgressiveText";
import { useTranslation } from "../i18n/useTranslation";
import "./ScenarioIntroPage.css";

type ScenarioIntroPageProps = {
  scenario: ScenarioIntro;
  onStartGame: () => void;
  onBackHome: () => void;
  isStarting: boolean;
  startError: string | null;
};

function ScenarioIntroPage({
  scenario,
  onStartGame,
  onBackHome,
  isStarting,
  startError,
}: ScenarioIntroPageProps) {
  const t = useTranslation();
  const [revealedIntroTextKey, setRevealedIntroTextKey] = useState<string | null>(null);
  const introTextKey = `${scenario.id}:${scenario.description}`;
  const introTextRevealed = revealedIntroTextKey === introTextKey;

  return (
    <main className="page scenario-intro-page">
      <section className="scenario-intro-page__panel">
        <div className="scenario-intro-page__content">
          <p className="page__eyebrow">{t.scenarioIntro.eyebrow}</p>
          <h1>{t.common.caseLabel} - {scenario.title}</h1>
          <ProgressiveText
            key={introTextKey}
            text={scenario.description}
            className="scenario-intro-page__description"
            onComplete={() => setRevealedIntroTextKey(introTextKey)}
          />
        </div>

        <aside className="scenario-intro-page__side">
          <div className="scenario-intro-page__case-summary">
            <span>{scenario.numberOfQuestions}</span>
            <p>{t.scenarioIntro.piecesToReview}</p>
          </div>

          <div className="scenario-intro-page__actions">
            <button
              className="button"
              disabled={isStarting || !introTextRevealed}
              onClick={onStartGame}
            >
              {isStarting ? t.scenarioIntro.loading : t.scenarioIntro.startInvestigation}
            </button>
            <button
              className="button button--secondary"
              disabled={isStarting}
              onClick={onBackHome}
            >
              {t.common.backToScenarios}
            </button>
          </div>

          {startError !== null && (
            <p role="alert">{startError}</p>
          )}
        </aside>
      </section>
    </main>
  );
}

export default ScenarioIntroPage;
