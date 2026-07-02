import { getUserInDatabase, createScoreInDatabase } from "../repositories/companyJson.repository";
import { createGameAttempt, getGameAttemptById } from "../repositories/gameAttempt.repository";
import {
  getScenarioById,
  getScenariosCard,
} from "../repositories/gameScenario.repository";
import type {
  PublicQuestion,
  Question,
  StartScenarioResult,
  SubmitAnswersResult,
} from "../types/GameData";
import type { User } from "../types/CompanyData";

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

export async function submitAnswersService(
  attemptId: string,
  selections: { x: number; y: number }[],
  timeTaken: number
): Promise<{ success: boolean; reason?: string; data?: SubmitAnswersResult }> {
  const attempt = getGameAttemptById(attemptId);
  if (!attempt) {
    return { success: false, reason: "ATTEMPT_NOT_FOUND" };
  }

  const scenario = getScenarioById(attempt.scenarioId);
  if (!scenario) {
    return { success: false, reason: "SCENARIO_NOT_FOUND" };
  }

  const question = scenario.questions[attempt.currentQuestionIndex];
  if (!question) {
    return { success: false, reason: "QUESTION_NOT_FOUND" };
  }

  // 1. Evaluate selections against hotspots
  const hotspotsWithCorrection = question.hotspots.map((hotspot) => {
    // Check if at least one selection falls inside this hotspot's bounding box
    const found = selections.some((sel) => {
      return (
        sel.x >= hotspot.x &&
        sel.x <= hotspot.x + hotspot.width &&
        sel.y >= hotspot.y &&
        sel.y <= hotspot.y + hotspot.height
      );
    });

    return {
      ...hotspot,
      found,
    };
  });

  // 2. Calculate score for this question/round
  const foundCount = hotspotsWithCorrection.filter((h) => h.found).length;
  const missedCount = hotspotsWithCorrection.length - foundCount;

  // Formula: 20 points per found hotspot, -5 points per missed hotspot, -2 point per second taken
  
  const roundScore = Math.max(0,Math.round(
                      foundCount * 20
                      + Math.max(0, 20
                        * foundCount
                        - timeTaken * 2
                      )
                      - missedCount * 5
                    ));

  // Store round score
  attempt.roundScores.push(roundScore);

  // 3. Move to next question index
  attempt.currentQuestionIndex += 1;

  const scenarioCompleted = attempt.currentQuestionIndex >= scenario.questions.length;
  let nextQuestion: PublicQuestion | null = null;
  let updatedUser: User | undefined;
  let scenarioScore: number | undefined;

  if (scenarioCompleted) {
    attempt.status = "completed";
    scenarioScore = attempt.roundScores.reduce((sum, score) => sum + score, 0);

    // Save score to database
    if (!attempt.isReplay &&
        attempt.userId &&
        attempt.scenarioId &&
        scenarioScore !== undefined) {
      await createScoreInDatabase(attempt.userId, attempt.scenarioId, scenarioScore);
    }

    // Retrieve updated user to send back
    const user = await getUserInDatabase(attempt.userId);
    if (user) {
      updatedUser = user;
    }
  } else {
    const nextQ = scenario.questions[attempt.currentQuestionIndex];
    if (nextQ) {
      nextQuestion = toPublicQuestion(nextQ);
    }
  }

  return {
    success: true,
    data: {
      roundScore,
      hotspots: hotspotsWithCorrection,
      attackScenario: question.attackScenario,
      nextQuestion,
      scenarioCompleted,
      scenarioScore,
      scenarioRoundScores: attempt.roundScores,
      scenarioDetails: scenarioCompleted ? scenario : undefined,
      updatedUser,
    },
  };
}

