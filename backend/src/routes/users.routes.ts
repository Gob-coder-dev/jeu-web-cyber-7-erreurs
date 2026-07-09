import express from "express";
import { getUserByPseudo, postNewUser } from "../controllers/users.controller";

const router = express.Router();

router.post("/", getUserByPseudo);
//router.get("/:username", postNewUser);

export default router;