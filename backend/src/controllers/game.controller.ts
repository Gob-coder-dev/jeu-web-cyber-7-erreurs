import express from "express";
import {
  getScenariosCardService,
  startScenarioService,
} from "../services/game.service";


export async function getScenariosCard(req: express.Request, res: express.Response) {
  const scenariosCard = getScenariosCardService();

  if (scenariosCard.length === 0) {
    return res.status(404).json({ message: "No scenarios found" });
  }

  res.status(200).json(scenariosCard);
}

export async function startScenario(req: express.Request, res: express.Response) {
  const { userId, scenarioId } = req.body;

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
    );

    if (!result.success) {
      if (result.reason === "USER_NOT_FOUND") {
        return res.status(404).json({ message: "User not found" });
      }

      if (result.reason === "SCENARIO_NOT_FOUND") {
        return res.status(404).json({ message: "Scenario not found" });
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
