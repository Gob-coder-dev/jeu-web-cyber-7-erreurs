import { randomUUID } from "node:crypto";
import type {
  CreateGameAttemptInput,
  GameAttempt,
} from "../types/GameData";

const attempts = new Map<string, GameAttempt>();

export function createGameAttempt(input: CreateGameAttemptInput): GameAttempt {
  const now = new Date().toISOString();
  const attempt: GameAttempt = {
    id: randomUUID(),
    userId: input.userId,
    scenarioId: input.scenarioId,
    language: input.language,
    currentQuestionIndex: 0,
    roundScores: [],
    status: "in_progress",
    isReplay: input.isReplay,
    questionStartedAt: null,
    createdAt: now,
    updatedAt: now,
  };

  attempts.set(attempt.id, attempt);

  return attempt;
}

export function getGameAttemptById(attemptId: string,): GameAttempt | undefined {
  return attempts.get(attemptId);
}
