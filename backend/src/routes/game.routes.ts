import express from "express";
import {
  getScenariosCard,
  startScenario,
} from "../controllers/game.controller";

const router = express.Router();


router.get("/scenarios", getScenariosCard);
router.post("/attempts", startScenario);

export default router;
