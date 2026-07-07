import type { Scenario } from '../types/GameData';
import type { ScenarioIntro } from '../types/HomePageCard';
import { scenarios as frenchScenarios } from '../../data/game/scenarios/fr';
import { getUserInDatabase } from './companyJson.repository';

const scenarios: Scenario[] = frenchScenarios;

export function getScenarioById(scenarioId: string): Scenario | undefined {
  return scenarios.find((scenario) => scenario.id === scenarioId);
}

export async function getScenariosCard(userId?: string): Promise<ScenarioIntro[]> {
  let tutorialCompleted = true;

  if (userId) {
    const user = await getUserInDatabase(userId);
    tutorialCompleted = user?.completedScenarioIds?.includes('ceci-est-un-tutoriel') ?? false;
  }

  return scenarios.map((scenario) => ({
    id: scenario.id,
    title: scenario.title,
    description: scenario.description,
    numberOfQuestions: scenario.questions.length,
    isLocked: scenario.id !== 'ceci-est-un-tutoriel' && !tutorialCompleted,
  }));
}
