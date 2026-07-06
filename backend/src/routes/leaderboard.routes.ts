import express from "express";
import { getLeaderboard, getLeaderboardUser } from "../controllers/leaderboard.controller";

const router = express.Router();


router.get("/", getLeaderboard);
router.get("/users/:userId", getLeaderboardUser);

export default router;