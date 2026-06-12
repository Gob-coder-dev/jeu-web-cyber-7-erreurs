export type User = {
  id: string;
  pseudo: string;
  completedScenarioIds: string[];
  score: number;
  scenarioScores: { [scenarioId: string]: number };
  date: string;
};