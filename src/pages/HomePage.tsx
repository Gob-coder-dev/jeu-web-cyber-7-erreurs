import type { User } from "../types/User";

type HomePageProps = {
  user: User;
  onLogout: () => void;
  onStartGame: () => void;
};

function HomePage({ user, onLogout, onStartGame }: HomePageProps) {
  return (
    <main>
      <h1>Bienvenue {user.pseudo}</h1>

      <button onClick={onStartGame}>Lancer le jeu</button>
      <button onClick={onLogout}>Se deconnecter</button>
    </main>
  );
}

export default HomePage;
