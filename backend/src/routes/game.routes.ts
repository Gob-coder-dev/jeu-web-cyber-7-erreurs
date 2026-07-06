import express from "express";
import {
  getScenariosCard,
  startScenario,
  submitAnswers,
  startTimer,
} from "../controllers/game.controller";

const router = express.Router();


router.get("/scenarios", getScenariosCard);
router.post("/attempts", startScenario);
router.post("/attempts/:attemptId/questions/:questionId/answers", submitAnswers);
router.post("/attempts/:attemptId/questions/:questionId/start", startTimer);

export default router;

