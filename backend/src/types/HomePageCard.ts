import type { ScenarioDifficulty } from "./GameData";

export type ScenarioIntro = {
  id: string;
  title: string;
  description: string;
  difficulty: ScenarioDifficulty;
  numberOfQuestions: number;
};
