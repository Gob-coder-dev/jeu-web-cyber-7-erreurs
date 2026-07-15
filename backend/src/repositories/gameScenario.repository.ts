import type { Scenario } from '../types/GameData';
import type { GameLanguage } from '../types/GameLanguage';
import type { ScenarioIntro } from '../types/HomePageCard';
import { DEFAULT_GAME_LANGUAGE } from '../types/GameLanguage';
import { scenarios as englishScenarios } from '../../data/game/scenarios/en';
import { scenarios as frenchScenarios } from '../../data/game/scenarios/fr';

const scenariosByLanguage: Record<GameLanguage, Scenario[]> = {
  fr: frenchScenarios,
  en: englishScenarios,
};

function getScenariosByLanguage(language: GameLanguage): Scenario[] {
  return scenariosByLanguage[language] ?? scenariosByLanguage[DEFAULT_GAME_LANGUAGE];
}

export function getScenarioById(
  scenarioId: string,
  language: GameLanguage = DEFAULT_GAME_LANGUAGE,
): Scenario | undefined {
  const scenarios = getScenariosByLanguage(language);
  return scenarios.find((scenario) => scenario.id === scenarioId);
}

export function getScenariosCard(
  language: GameLanguage = DEFAULT_GAME_LANGUAGE,
): ScenarioIntro[] {
  const scenarios = getScenariosByLanguage(language);

  return scenarios.map((scenario) => ({
    id: scenario.id,
    title: scenario.title,
    description: scenario.description,
    difficulty: scenario.difficulty ?? 1,
    numberOfQuestions: scenario.questions.length,
  }));
}
