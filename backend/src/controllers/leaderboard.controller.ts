import express from "express";
import { getLeaderboardFromDatabase, getLeaderboardUserFromDatabase } from "../services/leaderboard.service";

export async function getLeaderboard(req: express.Request, res: express.Response) {

  const result = await getLeaderboardFromDatabase();

  res.status(200).json(result);
}

export async function getLeaderboardUser(req: express.Request, res: express.Response) {
  const userId = req.params.userId as string;

  const result = await getLeaderboardUserFromDatabase(userId);

  if (!result.exists) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(result);
}
