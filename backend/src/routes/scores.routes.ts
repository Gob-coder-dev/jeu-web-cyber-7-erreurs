import express from "express";
import { getScore, getTotalScore, saveScenarioScore } from "../controllers/scores.controller";

const router = express.Router();

router.get("/users/:userId/scenarios/:scenarioId", getScore);
router.get("/users/:userId", getTotalScore);
router.patch("/users/:userId/scenarios/:scenarioId", saveScenarioScore);

export default router;