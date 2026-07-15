import express from "express";
import { getUserByPseudo, postNewUser } from "../controllers/users.controller";

const router = express.Router();

router.post("/", getUserByPseudo);
router.post("/create", postNewUser);

export default router;