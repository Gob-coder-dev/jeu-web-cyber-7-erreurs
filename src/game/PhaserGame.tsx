import { useImperativeHandle, forwardRef, useEffect, useRef } from "react";
import Phaser from "phaser";
import type { Question } from "../types/Question";
import { CyberDifferenceScene } from "./scenes/CyberDifferenceScene";

type PhaserGameProps = {
  question: Question;
};

export type PhaserGameHandle = {
  validateSelections: () => number;
};

const PhaserGame = forwardRef<PhaserGameHandle, PhaserGameProps>(
function PhaserGame({ question }, ref) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<CyberDifferenceScene | null>(null);

  useImperativeHandle(ref, () => ({
      validateSelections: () => {
        return sceneRef.current?.validateSelections() ?? 0;
      },
    }));

  useEffect(() => {
    if (containerRef.current === null) {
      return;
    }

    const scene = new CyberDifferenceScene(question);
    sceneRef.current = scene;

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      width: 1000,
      height: 700,
      parent: containerRef.current,
      scene: [scene],
      backgroundColor: "#111827",
    });

    return () => {
      game.destroy(true);
      sceneRef.current = null;
    };
  }, [question]);

  return <div ref={containerRef} />;
});

export default PhaserGame;
