import type { Scenario } from '../types/GameData';
import type { ScenarioIntro } from '../types/HomePageCard';
import { scenario1 } from '../../data/game/scenarios/scenario1';
import { scenario2 } from '../../data/game/scenarios/scenario2';
import { scenario3 } from '../../data/game/scenarios/scenario3';
import { scenario4 } from '../../data/game/scenarios/scenario4';

const scenarios: Scenario[] = [scenario1, scenario2, scenario3, scenario4];

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
