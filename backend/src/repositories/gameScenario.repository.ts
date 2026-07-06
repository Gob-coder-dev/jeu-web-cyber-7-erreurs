import type { Scenario } from '../types/GameData';
import type { ScenarioIntro } from '../types/HomePageCard';
import { scenarios as frenchScenarios } from '../../data/game/scenarios/fr';

const scenarios: Scenario[] = frenchScenarios;

export function getScenarioById(scenarioId: string): Scenario | undefined {
  return scenarios.find((scenario) => scenario.id === scenarioId);
}

export function getScenariosCard(): ScenarioIntro[] {
  return scenarios.map((scenario) => ({
    id: scenario.id,
    title: scenario.title,
    description: scenario.description,
    numberOfQuestions: scenario.questions.length,
  }));
}
