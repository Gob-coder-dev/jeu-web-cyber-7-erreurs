import type { User } from "../types/User";
import "./HomePage.css";

type HomePageProps = {
  user: User;
  onLogout: () => void;
  onStartGame: () => void;
};

function HomePage({ user, onLogout, onStartGame }: HomePageProps) {
  return (
    <main className="page home-page">
      <p className="page__eyebrow">Simulation cybersécurité</p>
      <h1>Bienvenue {user.pseudo}</h1>
      <p className="page__intro">
        Repère les anomalies dans une scène professionnelle et marque un maximum de points.
      </p>

      <div className="page__actions">
        <button className="button" onClick={onStartGame}>Lancer le jeu</button>
        <button className="button button--secondary" onClick={onLogout}>Se déconnecter</button>
      </div>
    </main>
  );
}

export default HomePage;
