import { useEffect, useMemo, useRef, useState } from "react";
import "./ProgressiveText.css";

type ProgressiveTextProps = {
  text: string;
  className?: string;
  as?: "p" | "span" | "div";
  onComplete?: () => void;
};

const TICK_MS = 26;
const MIN_DURATION_MS = 2000;
const MAX_DURATION_MS = 10000;
const MS_BY_CHARACTER = 34;
const WAVE_SIZE = 7;

function ProgressiveText({
  text,
  className,
  as = "p",
  onComplete,
}: ProgressiveTextProps) {
  const characters = useMemo(() => Array.from(text), [text]);
  const [animationState, setAnimationState] = useState({
    text,
    visibleCharacterCount: 0,
  });
  const onCompleteRef = useRef(onComplete);
  const Component = as;
  const visibleCharacterCount =
    animationState.text === text ? animationState.visibleCharacterCount : 0;

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const characterCount = characters.length;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (characterCount === 0 || prefersReducedMotion) {
      const timeoutId = window.setTimeout(() => {
        setAnimationState({ text, visibleCharacterCount: characterCount });
        onCompleteRef.current?.();
      }, 0);

      return () => {
        window.clearTimeout(timeoutId);
      };
    }

    const targetDuration = Math.min(
      Math.max(characterCount * MS_BY_CHARACTER, MIN_DURATION_MS),
      MAX_DURATION_MS,
    );
    const charactersPerTick = Math.max(
      1,
      Math.ceil(characterCount / (targetDuration / TICK_MS)),
    );
    let nextVisibleCharacterCount = 0;

    const intervalId = window.setInterval(() => {
      nextVisibleCharacterCount = Math.min(
        characterCount,
        nextVisibleCharacterCount + charactersPerTick,
      );

      setAnimationState({
        text,
        visibleCharacterCount: nextVisibleCharacterCount,
      });

      if (nextVisibleCharacterCount >= characterCount) {
        window.clearInterval(intervalId);
        onCompleteRef.current?.();
      }
    }, TICK_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [characters.length, text]);

  const complete = visibleCharacterCount >= characters.length;

  function getCharacterClassName(characterIndex: number) {
    if (complete || characterIndex < visibleCharacterCount - WAVE_SIZE) {
      return "progressive-text__character progressive-text__character--visible";
    }

    if (characterIndex < visibleCharacterCount) {
      return "progressive-text__character progressive-text__character--wave";
    }

    return "progressive-text__character progressive-text__character--hidden";
  }

  return (
    <Component
      className={[
        "progressive-text",
        complete ? "progressive-text--complete" : "",
        className ?? "",
      ].join(" ").trim()}
      aria-label={text}
    >
      <span aria-hidden="true">
        {characters.map((character, index) => (
          <span className={getCharacterClassName(index)} key={`${character}-${index}`}>
            {character}
          </span>
        ))}
      </span>
    </Component>
  );
}

export default ProgressiveText;
