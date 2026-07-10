import type { Question } from "./Question";

export type ScenarioDifficulty = 1 | 2 | 3;

export type Scenario = {
  id: string;
  title: string;
  description: string;
  difficulty?: ScenarioDifficulty;
  questions: Question[];
  globalAttackScenario?: string;
  goodPractices?: string;
};

export type ScenarioIntro = {
  id: string;
  title: string;
  description: string;
  difficulty: ScenarioDifficulty;
  numberOfQuestions: number;
};
