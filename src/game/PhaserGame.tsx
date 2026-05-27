import { useImperativeHandle, forwardRef, useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import type { Question } from "../types/Question";
import { CyberDifferenceScene } from "./scenes/CyberDifferenceScene";

type PhaserGameProps = {
  question: Question;
};

export type PhaserGameHandle = {
  validateSelections: () => number;
};

type GameSize = {
  width: number;
  height: number;
};

function calculateGameSize(question: Question, availableWidth: number): GameSize {
  const maxWidth = Math.min(availableWidth, question.imageWidth);
  const maxHeight = Math.min(window.innerHeight * 0.72, question.imageHeight);
  const scale = Math.min(
    maxWidth / question.imageWidth,
    maxHeight / question.imageHeight,
    1
  );

  return {
    width: Math.round(question.imageWidth * scale),
    height: Math.round(question.imageHeight * scale),
  };
}

const PhaserGame = forwardRef<PhaserGameHandle, PhaserGameProps>(
function PhaserGame({ question }, ref) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<CyberDifferenceScene | null>(null);
  const [gameSize, setGameSize] = useState<GameSize | null>(null);

  useImperativeHandle(ref, () => ({
      validateSelections: () => {
        return sceneRef.current?.validateSelections() ?? 0;
      },
    }));

  useEffect(() => {
    const container = containerRef.current;

    if (container === null) {
      return;
    }

    const gameContainer = container;

    function updateGameSize() {
      const availableWidth = gameContainer.clientWidth;

      if (availableWidth <= 0) {
        return;
      }

      const nextGameSize = calculateGameSize(question, availableWidth);

      setGameSize((previousGameSize) => {
        if (
          previousGameSize?.width === nextGameSize.width &&
          previousGameSize.height === nextGameSize.height
        ) {
          return previousGameSize;
        }

        return nextGameSize;
      });
    }

    updateGameSize();

    const resizeObserver = new ResizeObserver(updateGameSize);
    resizeObserver.observe(gameContainer);
    window.addEventListener("resize", updateGameSize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateGameSize);
    };
  }, [question]);

  useEffect(() => {
    if (containerRef.current === null || gameSize === null) {
      return;
    }

    const scene = new CyberDifferenceScene(question);
    sceneRef.current = scene;

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      width: gameSize.width,
      height: gameSize.height,
      parent: containerRef.current,
      scene: [scene],
      backgroundColor: "#111827",
    });

    return () => {
      game.destroy(true);
      sceneRef.current = null;
    };
  }, [question, gameSize]);

  return <div className="phaser-game" ref={containerRef} />;
});

export default PhaserGame;
