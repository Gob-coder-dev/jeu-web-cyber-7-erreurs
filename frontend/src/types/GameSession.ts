import type { PublicQuestion } from "./Question";

export type StartScenarioResult = {
  attemptId: string;
  scenarioId: string;
  scenarioTitle: string;
  questionIndex: number;
  questionCount: number;
  question: PublicQuestion;
  isReplay: boolean;
};
