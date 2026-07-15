import express from "express";
import {
  getScenariosCardService,
  startScenarioService,
  submitAnswersService,
  startTimerService,
} from "../services/game.service";
import { normalizeGameLanguage } from "../types/GameLanguage";


export async function getScenariosCard(req: express.Request, res: express.Response) {
  const language = normalizeGameLanguage(req.query.lang);
  const userId =
    typeof req.query.userId === "string" && req.query.userId.trim().length > 0
      ? req.query.userId.trim()
      : undefined;
  const scenariosCard = await getScenariosCardService(language, userId);

  if (scenariosCard.length === 0) {
    return res.status(404).json({ message: "No scenarios found" });
  }

  res.status(200).json(scenariosCard);
}

export async function startScenario(req: express.Request, res: express.Response) {
  const { userId, scenarioId, language } = req.body;

  if (typeof userId !== "string" || typeof scenarioId !== "string") {
    return res.status(400).json({
      message: "User ID and Scenario ID are required",
    });
  }

  const cleanUserId = userId.trim();
  const cleanScenarioId = scenarioId.trim();

  if (!cleanUserId || !cleanScenarioId) {
    return res.status(400).json({
      message: "User ID and Scenario ID are required",
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
        return res.status(404).json({ message: "User not found" });
      }

      if (result.reason === "SCENARIO_NOT_FOUND") {
        return res.status(404).json({ message: "Scenario not found" });
      }

      if (result.reason === "TUTORIAL_REQUIRED") {
        return res.status(403).json({
          message: "Tutorial must be completed before starting this scenario",
        });
      }

      return res.status(409).json({
        message: "Scenario does not contain any question",
      });
    }

    return res.status(201).json(result.data);
  } catch (error) {
    console.error("Unable to start scenario", error);
    return res.status(500).json({ message: "Unable to start scenario" });
  }
}

export async function submitAnswers(req: express.Request, res: express.Response) {
  const { attemptId, questionId } = req.params;
  const { selections } = req.body;

  if (typeof attemptId !== "string" || typeof questionId !== "string") {
    return res.status(400).json({
      message: "Attempt ID and question ID are required",
    });
  }

  if (!Array.isArray(selections)) {
    return res.status(400).json({
      message: "Selections must be an array",
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
      message: "Each selection must contain finite numeric x and y values",
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
        return res.status(404).json({ message: "Attempt not found" });
      }
      if (result.reason === "SCENARIO_NOT_FOUND") {
        return res.status(404).json({ message: "Scenario not found" });
      }
      if (result.reason === "QUESTION_NOT_FOUND") {
        return res.status(404).json({ message: "Question not found" });
      }
      if (result.reason === "QUESTION_MISMATCH") {
        return res.status(409).json({
          message: "Question does not match the current attempt question",
        });
      }
      return res.status(400).json({ message: result.reason });
    }

    return res.status(200).json(result.data);
  } catch (error) {
    console.error("Unable to submit answers", error);
    return res.status(500).json({ message: "Unable to submit answers" });
  }
}

export async function startTimer(req: express.Request, res: express.Response) {
  const { attemptId, questionId } = req.params;

  if (typeof attemptId !== "string" || typeof questionId !== "string") {
    return res.status(400).json({
      message: "Attempt ID and question ID are required",
    });
  }

  try {
    const result = await startTimerService(attemptId, questionId);

    if (!result.success) {
      if (result.reason === "ATTEMPT_NOT_FOUND") {
        return res.status(404).json({ message: "Attempt not found" });
      }
      if (result.reason === "SCENARIO_NOT_FOUND") {
        return res.status(404).json({ message: "Scenario not found" });
      }
      if (result.reason === "QUESTION_NOT_FOUND") {
        return res.status(404).json({ message: "Question not found" });
      }
      if (result.reason === "QUESTION_MISMATCH") {
        return res.status(409).json({
          message: "Question does not match the current attempt question",
        });
      }
      return res.status(400).json({ message: result.reason });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Unable to start timer", error);
    return res.status(500).json({ message: "Unable to start timer" });
  }
}
