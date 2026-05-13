import { questions } from "../data/questions";
import { useRef } from "react";
import PhaserGame, { type PhaserGameHandle } from "../game/PhaserGame";

type GamePageProps = {
  onBackHome: () => void;
};

function GamePage({ onBackHome }: GamePageProps) {
  const gameRef = useRef<PhaserGameHandle | null>(null);
  const question = questions[0];

  return (
    <main>
      <h1>{question.title}</h1>
      <p>{question.hotspots.length} anomalies a trouver.</p>

      <PhaserGame ref={gameRef} question={question} />

      <button onClick={() => gameRef.current?.validateSelections()}>
        Valider
      </button>

      <button onClick={onBackHome}>Retour accueil</button>
    </main>
  );
}

export default GamePage;
