import assert from "node:assert/strict";
import test from "node:test";
import {
  createGameAttempt,
  getGameAttemptById,
} from "../repositories/gameAttempt.repository";
import {
  getScenarioById,
  getScenariosCard,
} from "../repositories/gameScenario.repository";
import { startTimerService } from "./game.service";

async function getFirstScenarioQuestion() {
  const [scenarioCard] = await getScenariosCard();
  assert.ok(scenarioCard);

  const scenario = getScenarioById(scenarioCard.id);
  assert.ok(scenario);

  const question = scenario.questions[0];
  assert.ok(question);

  return {
    scenario,
    question,
  };
}

test("startTimerService starts the current question timer", async () => {
  const { scenario, question } = await getFirstScenarioQuestion();
  const attempt = createGameAttempt({
    userId: "test-user",
    scenarioId: scenario.id,
    isReplay: true,
  });

  const result = await startTimerService(attempt.id, question.id);
  const updatedAttempt = getGameAttemptById(attempt.id);

  assert.equal(result.success, true);
  assert.ok(updatedAttempt?.questionStartedAt);
});

test("startTimerService does not reset an already started question timer", async () => {
  const { scenario, question } = await getFirstScenarioQuestion();
  const attempt = createGameAttempt({
    userId: "test-user",
    scenarioId: scenario.id,
    isReplay: true,
  });

  await startTimerService(attempt.id, question.id);
  const firstStartedAt = getGameAttemptById(attempt.id)?.questionStartedAt;

  await new Promise((resolve) => {
    setTimeout(resolve, 5);
  });

  const result = await startTimerService(attempt.id, question.id);
  const secondStartedAt = getGameAttemptById(attempt.id)?.questionStartedAt;

  assert.equal(result.success, true);
  assert.equal(secondStartedAt, firstStartedAt);
});

test("startTimerService rejects a question that does not match the current attempt", async () => {
  const { scenario } = await getFirstScenarioQuestion();
  const attempt = createGameAttempt({
    userId: "test-user",
    scenarioId: scenario.id,
    isReplay: true,
  });

  const result = await startTimerService(attempt.id, "wrong-question-id");

  assert.equal(result.success, false);
  assert.equal(result.reason, "QUESTION_MISMATCH");
});
