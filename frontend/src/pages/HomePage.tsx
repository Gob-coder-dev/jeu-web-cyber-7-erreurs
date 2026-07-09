import { useState } from "react";
import type { ScenarioIntro } from "../types/Scenario";
import type { User } from "../types/User";
import { ConfirmReplayModal } from "../components/ConfirmReplayModal";
import LanguageSelector from "../components/LanguageSelector";
import { useTranslation } from "../i18n/useTranslation";
import { formatScenarioTitle } from "../utils/formatGameLabels";
import "./HomePage.css";

type HomePageProps = {
  user: User;
  scenarioIntros: ScenarioIntro[];
  globalScore: number;
  onLogout: () => void;
  onGoLeaderBoard: () => void;
  onStartScenario: (scenarioId: string) => void;
};

function HomePage({
  user,
  scenarioIntros,
  globalScore,
  onLogout,
  onGoLeaderBoard,
  onStartScenario,
}: HomePageProps) {
  const t = useTranslation();
  const [scenarioToReplay, setScenarioToReplay] = useState<string | null>(null);

  function handleStartScenario(scenarioId: string) {
    const hasPlayed = user.completedScenarioIds.find((scenario) => scenario === scenarioId) !== undefined;

    if (!hasPlayed) {
      onStartScenario(scenarioId);
      return;
    }

    setScenarioToReplay(scenarioId);
  }

  return (
    <>
    <LanguageSelector />
    <main className="page home-page">
      <header className="home-page__hero">
        <div className="home-page__hero-main">
          <p className="page__eyebrow">{t.home.eyebrow}</p>
          <h1>{t.home.welcome} {user.pseudo}</h1>
          <p className="page__intro">
            {t.home.intro}
          </p>

          <div className="home-page__score--global">
            {t.home.globalScore} : {globalScore} {t.common.points}
          </div>
        </div>

        <div className="home-page__hero-actions">
          <button className="button button--secondary" onClick={onLogout}>
            {t.home.logout}
          </button>
          <button className="button" onClick={onGoLeaderBoard}>
            {t.common.leaderboard}
          </button>
        </div>
      </header>

      <section className="home-page__scenarios" aria-label={t.home.scenariosLabel}>
        {scenarioIntros.map((scenario, index) => {
          const scenarioScore = user.scenarioScores[scenario.id]?.score;
          const hasScore = scenarioScore !== undefined;

          return (
            <article className="home-page__scenario" key={scenario.id}>
              <div className="home-page__scenario-meta">
                <span>{scenario.numberOfQuestions} {t.common.questions}</span>
                <span className="home-page__status-slot">
                  {hasScore && t.home.completed}
                </span>
                <span className="home-page__score-slot">
                  {hasScore && (
                    <span className="home-page__score--scenario">
                      {scenarioScore} {t.common.points}
                    </span>
                  )}
                </span>
              </div>

              <div className="home-page__scenario-main">
                <h2>{formatScenarioTitle(scenario.title, index, t.common.caseLabel)}</h2>
                <button
                  className="button home-page__button--play"
                  onClick={() => handleStartScenario(scenario.id)}
                >
                  <span>{t.home.play}</span>
                </button>
              </div>
            </article>
          );
        })}
      </section>

      {scenarioToReplay !== null && (
        <ConfirmReplayModal
          onCancel={() => setScenarioToReplay(null)}
          onConfirm={() => {
            onStartScenario(scenarioToReplay);
            setScenarioToReplay(null);
          }}
        />
      )}
    </main>
    </>
  );
}

export default HomePage;
