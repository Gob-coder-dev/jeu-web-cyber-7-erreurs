import express from "express";
import { getScoreFromDatabase, getTotalScoreFromDatabase } from "../services/scores.service";

export async function getScore(req: express.Request, res: express.Response) {
  const { userId, scenarioId } = req.params;

  if (typeof userId !== "string" || typeof scenarioId !== "string") {
    return res.status(400).json({ message: "User ID and Scenario ID are required" });
  }

  const cleanUserId = userId.trim();
  const cleanScenarioId = scenarioId.trim();

  if (!cleanUserId || !cleanScenarioId) {
    return res.status(400).json({ message: "User ID and Scenario ID are required" });
  }

  const score = await getScoreFromDatabase(cleanUserId, cleanScenarioId);

  if (!score) {
    return res.status(404).json({ message: "Score not found" });
  }

  res.status(200).json(score);
}

export async function getTotalScore(req: express.Request, res: express.Response) {
  const { userId } = req.params;

  if (typeof userId !== "string") {
    return res.status(400).json({ message: "User ID is required" });
  }

  const cleanUserId = userId.trim();

  if (!cleanUserId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const totalScore = await getTotalScoreFromDatabase(cleanUserId);

  if (totalScore === null) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ totalScore });
}