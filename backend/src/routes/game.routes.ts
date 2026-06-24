import express from "express";
import { getScenariosCard } from "../controllers/game.controller";

const router = express.Router();


router.get("/scenarios", getScenariosCard);

export default router;