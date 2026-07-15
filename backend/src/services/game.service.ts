import { createScoreInDatabase, getUserInDatabaseById } from "../repositories/companyJson.repository";
import { createGameAttempt, getGameAttemptById } from "../repositories/gameAttempt.repository";
import {
  getScenarioById,
  getScenariosCard,
  TUTORIAL_SCENARIO_ID,
} from "../repositories/gameScenario.repository";
import {
  calculateRoundScore,
  evaluateHotspots,
} from "./gameScoring.service";
import type {
  PublicQuestion,
  Question,
  StartScenarioResult,
  SubmitAnswersResult,
} from "../types/GameData";
import type { User } from "../types/CompanyData";
import type { GameLanguage } from "../types/GameLanguage";

export function getScenariosCardService(
  language: GameLanguage,
  userId?: string,
): ReturnType<typeof getScenariosCard> {
  return getScenariosCard(language, userId);
}

type StartScenarioFailure =
  | "USER_NOT_FOUND"
  | "SCENARIO_NOT_FOUND"
  | "SCENARIO_EMPTY"
  | "TUTORIAL_REQUIRED";

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

export async function startScenarioService(
  userId: string,
  scenarioId: string,
  language: GameLanguage,
): Promise<StartScenarioServiceResult> {
  const user = await getUserInDatabaseById(userId);

  if (user === undefined) {
    return { success: false, reason: "USER_NOT_FOUND" };
  }

  const scenario = getScenarioById(scenarioId, language);

  if (scenario === undefined) {
    return { success: false, reason: "SCENARIO_NOT_FOUND" };
  }

  const tutorialCompleted = user.completedScenarioIds.includes(TUTORIAL_SCENARIO_ID);

  if (scenarioId !== TUTORIAL_SCENARIO_ID && !tutorialCompleted) {
    return { success: false, reason: "TUTORIAL_REQUIRED" };
  }

  const firstQuestion = scenario.questions[0];

  if (firstQuestion === undefined) {
    return { success: false, reason: "SCENARIO_EMPTY" };
  }

  const isReplay = user.completedScenarioIds.includes(scenarioId);
  const attempt = createGameAttempt({
    userId,
    scenarioId,
    language,
    isReplay,
  });

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
  questionId: string,
  selections: { x: number; y: number }[],
): Promise<{ success: boolean; reason?: string; data?: SubmitAnswersResult }> {
  const now = Date.now();
  
  const attempt = getGameAttemptById(attemptId);
  if (!attempt) {
    return { success: false, reason: "ATTEMPT_NOT_FOUND" };
  }

  const scenario = getScenarioById(attempt.scenarioId, attempt.language);
  if (!scenario) {
    return { success: false, reason: "SCENARIO_NOT_FOUND" };
  }

  // Ensure the submitted question exists in the scenario
  const questionIndex = scenario.questions.findIndex((q) => q.id === questionId);
  if (questionIndex === -1) {
    return { success: false, reason: "QUESTION_NOT_FOUND" };
  }

  // Enforce that the submitted question matches the current attempt index
  if (questionIndex !== attempt.currentQuestionIndex) {
    return { success: false, reason: "QUESTION_MISMATCH" };
  }

  const question = scenario.questions[questionIndex];

  if (selections.length > question.hotspots.length) {
    return { success: false, reason: "TOO_MANY_SELECTIONS" };
  }

  if (attempt.questionStartedAt === null) {
    return { success: false, reason: "QUESTION_NOT_STARTED" };
  }

  const startedAt = new Date(attempt.questionStartedAt).getTime();
  const timeTaken = Math.round((now - startedAt) / 1000);
  attempt.questionStartedAt = null;

  const hotspotsWithCorrection = evaluateHotspots(
    question.hotspots,
    selections,
  );

  const foundCount = hotspotsWithCorrection.filter((h) => h.found).length;

  const roundScore = calculateRoundScore({
    foundCount,
    hotspotCount: question.hotspots.length,
    timeTakenSeconds: timeTaken,
  });

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
    const user = await getUserInDatabaseById(attempt.userId);
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

export async function startTimerService(
  attemptId: string,
  questionId: string,
): Promise<{ success: boolean; reason?: string }> {
  const attempt = getGameAttemptById(attemptId);
  if (!attempt) {
    return { success: false, reason: "ATTEMPT_NOT_FOUND" };
  }

  const scenario = getScenarioById(attempt.scenarioId, attempt.language);
  if (!scenario) {
    return { success: false, reason: "SCENARIO_NOT_FOUND" };
  }

  // Find question and validate index consistency
  const questionIndex = scenario.questions.findIndex((q) => q.id === questionId);
  if (questionIndex === -1) {
    return { success: false, reason: "QUESTION_NOT_FOUND" };
  }

  if (questionIndex !== attempt.currentQuestionIndex) {
    return { success: false, reason: "QUESTION_MISMATCH" };
  }
  if (attempt.questionStartedAt !== null) {
    return { success: true };
  }
  const now = Date.now();
  attempt.questionStartedAt = new Date(now).toISOString();
  return { success: true };
}
