import express from "express";
import {
  getScenariosCardService,
  startScenarioService,
  submitAnswersService,
  startTimerService,
} from "../services/game.service";
import { normalizeGameLanguage } from "../types/GameLanguage";
import { translations } from "../i18n/translations";

const t = translations.fr;

export async function getScenariosCard(req: express.Request, res: express.Response) {
  const language = normalizeGameLanguage(req.query.lang);
  const userId =
    typeof req.query.userId === "string" && req.query.userId.trim().length > 0
      ? req.query.userId.trim()
      : undefined;
  const scenariosCard = await getScenariosCardService(language, userId);

  if (scenariosCard.length === 0) {
    return res.status(404).json({ message: t.errorMessageGame.noScenarioFound });
  }

  res.status(200).json(scenariosCard);
}

export async function startScenario(req: express.Request, res: express.Response) {
  const { userId, scenarioId, language } = req.body;

  if (typeof userId !== "string" || typeof scenarioId !== "string") {
    return res.status(400).json({
      message: t.errorMessageGame.userIdAndScenarioIdRequired,
    });
  }

  const cleanUserId = userId.trim();
  const cleanScenarioId = scenarioId.trim();

  if (!cleanUserId || !cleanScenarioId) {
    return res.status(400).json({
      message: t.errorMessageGame.userIdAndScenarioIdRequired,
    });
  }

  try {
    const result = await startScenarioService(
      cleanUserId,
      cleanScenarioId,
      normalizeGameLanguage(language),
    );

    if (!result.success) {
      if (result.reason === "USER_NOT_FOUND") {
        return res.status(404).json({ message: t.errorMessageGame.userNotFound });
      }

      if (result.reason === "SCENARIO_NOT_FOUND") {
        return res.status(404).json({ message: t.errorMessageGame.scenarioNotFound });
      }

      if (result.reason === "TUTORIAL_REQUIRED") {
        return res.status(403).json({
          message: t.errorMessageGame.tutorial,
        });
      }

      return res.status(409).json({
        message: t.errorMessageGame.noQuestion,
      });
    }

    return res.status(201).json(result.data);
  } catch (error) {
    console.error(t.errorMessageGame.unableStratScenario, error);
    return res.status(500).json({ message: t.errorMessageGame.unableStratScenario });
  }
}

export async function submitAnswers(req: express.Request, res: express.Response) {
  const { attemptId, questionId } = req.params;
  const { selections } = req.body;

  if (typeof attemptId !== "string" || typeof questionId !== "string") {
    return res.status(400).json({
      message: t.errorMessageGame.userIdAndAttemptIdRequired,
    });
  }

  if (!Array.isArray(selections)) {
    return res.status(400).json({
      message: t.errorMessageGame.array,
    });
  }

  const hasInvalidSelection = selections.some((selection) => {
    return (
      typeof selection !== "object" ||
      selection === null ||
      typeof selection.x !== "number" ||
      typeof selection.y !== "number" ||
      !Number.isFinite(selection.x) ||
      !Number.isFinite(selection.y)
    );
  });

  if (hasInvalidSelection) {
    return res.status(400).json({
      message: t.errorMessageGame.invalidSelection,
    });
  }

  const cleanSelections = selections.map((selection) => ({
    x: selection.x,
    y: selection.y,
  }));

  try {
    const result = await submitAnswersService(
      attemptId,
      questionId,
      cleanSelections,
    );

    if (!result.success) {
      if (result.reason === "ATTEMPT_NOT_FOUND") {
        return res.status(404).json({ message: t.errorMessageGame.attemptNotFound });
      }
      if (result.reason === "SCENARIO_NOT_FOUND") {
        return res.status(404).json({ message: t.errorMessageGame.scenarioNotFound });
      }
      if (result.reason === "QUESTION_NOT_FOUND") {
        return res.status(404).json({ message: t.errorMessageGame.questionNotFound });
      }
      if (result.reason === "QUESTION_MISMATCH") {
        return res.status(409).json({
          message: t.errorMessageGame.questionMismatch,
        });
      }
      return res.status(400).json({ message: result.reason });
    }

    return res.status(200).json(result.data);
  } catch (error) {
    console.error(t.errorMessageGame.unableSubmitAnswers, error);
    return res.status(500).json({ message: t.errorMessageGame.unableSubmitAnswers });
  }
}

export async function startTimer(req: express.Request, res: express.Response) {
  const { attemptId, questionId } = req.params;

  if (typeof attemptId !== "string" || typeof questionId !== "string") {
    return res.status(400).json({
      message: t.errorMessageGame.userIdAndAttemptIdRequired,
    });
  }

  try {
    const result = await startTimerService(attemptId, questionId);

    if (!result.success) {
      if (result.reason === "ATTEMPT_NOT_FOUND") {
        return res.status(404).json({ message: t.errorMessageGame.attemptNotFound });
      }
      if (result.reason === "SCENARIO_NOT_FOUND") {
        return res.status(404).json({ message: t.errorMessageGame.scenarioNotFound });
      }
      if (result.reason === "QUESTION_NOT_FOUND") {
        return res.status(404).json({ message: t.errorMessageGame.questionNotFound });
      }
      if (result.reason === "QUESTION_MISMATCH") {
        return res.status(409).json({
          message: t.errorMessageGame.questionMismatch,
        });
      }
      return res.status(400).json({ message: result.reason });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(t.errorMessageGame.unableStartTimer, error);
    return res.status(500).json({ message: t.errorMessageGame.unableStartTimer });
  }
}
