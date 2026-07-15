import express from "express";
import { getLeaderboardFromDatabase, getLeaderboardUserFromDatabase } from "../services/leaderboard.service";
import { translations } from "../i18n/translations";

const t = translations.fr;

export async function getLeaderboard(req: express.Request, res: express.Response) {

  const result = await getLeaderboardFromDatabase();

  res.status(200).json(result);
}

export async function getLeaderboardUser(req: express.Request, res: express.Response) {
  const userId = req.params.userId as string;

  const result = await getLeaderboardUserFromDatabase(userId);

  if (!result.exists) {
    return res.status(404).json({ message: t.errorMessageLeaderboard.userNotFound });
  }

  res.status(200).json(result);
}
