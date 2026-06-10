import type { Scenario } from "../types/Scenario";
import type { User } from "../types/User";
import "./HomePage.css";

type HomePageProps = {
  user: User;
  scenarios: Scenario[];
  globalScore: number;
  onLogout: () => void;
  onGoLeaderBoard: () => void;
  onStartScenario: (scenario: Scenario) => void;
};

function HomePage({
  user,
  scenarios,
  globalScore,
  onLogout,
  onGoLeaderBoard,
  onStartScenario,
}: HomePageProps) {
  return (
    <main className="page home-page">
      <p className="page__eyebrow">Simulation cybersécurité</p>
      <h1>Bienvenue {user.pseudo}</h1>
      <p className="page__intro">
        Choisis un scénario, repère les anomalies et construis ton score global.
      </p>

      <div className="home-page__score--global">Score global : {globalScore} pts</div>

      <section className="home-page__scenarios" aria-label="Scénarios">
        {scenarios.map((scenario) => {
          const scenarioScore = user.scenarioScores[scenario.id];
          const hasScore = scenarioScore !== undefined;

          return (
            <article className="home-page__scenario" key={scenario.id}>
              <div className="home-page__scenario-meta">
                <span>{scenario.questions.length} questions</span>
                {hasScore && <span>Terminé</span>}
              </div>

              <h2>{scenario.title}</h2>
              <p>{scenario.description}</p>

              <div className="home-page__scenario-footer">
                {hasScore && (
                  <p className="home-page__scenario-replay-note">
                    Score conservé. Rejouer ne modifie pas le score global.
                  </p>
                )}

                <div className="home-page__scenario-actions">
                  <button
                    className={`button${hasScore ? " home-page__button--replay" : ""}`}
                    onClick={() => onStartScenario(scenario)}
                  >
                    {hasScore ? "Rejouer" : "Lancer"}
                  </button>
                  {hasScore && <span className="home-page__score--scenario">{scenarioScore} pts</span>}
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <div className="page__actions">
        <button className="button" onClick={onGoLeaderBoard}>
          Voir le classement
        </button>
        <button className="button button--secondary" onClick={onLogout}>
          Se déconnecter
        </button>
      </div>
    </main>
  );
}

export default HomePage;
