import { getUserInDatabase } from "../repositories/companyJson.repository";
import { createGameAttempt } from "../repositories/gameAttempt.repository";
import {
  getScenarioById,
  getScenariosCard,
} from "../repositories/gameScenario.repository";
import type {
  PublicQuestion,
  Question,
  StartScenarioResult,
} from "../types/GameData";

export function getScenariosCardService(): ReturnType<typeof getScenariosCard> {
  return getScenariosCard();
}

type StartScenarioFailure =
  | "USER_NOT_FOUND"
  | "SCENARIO_NOT_FOUND"
  | "SCENARIO_EMPTY";

type StartScenarioServiceResult =
  | {
      success: true;
      data: StartScenarioResult;
    }
  | {
      success: false;
      reason: StartScenarioFailure;
    };

function toPublicQuestion(question: Question): PublicQuestion {
  return {
    id: question.id,
    title: question.title,
    instruction: question.instruction,
    image: question.image,
    imageWidth: question.imageWidth,
    imageHeight: question.imageHeight,
    hotspotCount: question.hotspots.length,
  };
}

export async function startScenarioService(userId: string, scenarioId: string): Promise<StartScenarioServiceResult> {
  const user = await getUserInDatabase(userId);

  if (user === undefined) {
    return { success: false, reason: "USER_NOT_FOUND" };
  }

  const scenario = getScenarioById(scenarioId);

  if (scenario === undefined) {
    return { success: false, reason: "SCENARIO_NOT_FOUND" };
  }

  const firstQuestion = scenario.questions[0];

  if (firstQuestion === undefined) {
    return { success: false, reason: "SCENARIO_EMPTY" };
  }

  const isReplay = user.completedScenarioIds.includes(scenarioId);
  const attempt = createGameAttempt({userId, scenarioId, isReplay});

  return {
    success: true,
    data: {
      attemptId: attempt.id,
      scenarioId: scenario.id,
      scenarioTitle: scenario.title,
      questionIndex: attempt.currentQuestionIndex,
      questionCount: scenario.questions.length,
      question: toPublicQuestion(firstQuestion),
      isReplay,
    },
  };
}
