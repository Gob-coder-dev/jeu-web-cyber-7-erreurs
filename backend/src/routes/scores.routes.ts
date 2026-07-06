import express from "express";
import { getScore, getTotalScore } from "../controllers/scores.controller";

const router = express.Router();

router.get("/users/:userId/scenarios/:scenarioId", getScore);
router.get("/users/:userId", getTotalScore);

export default router;