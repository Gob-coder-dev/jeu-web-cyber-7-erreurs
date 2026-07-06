import express from "express";
import { getUserById, postNewUser } from "../controllers/users.controller";

const router = express.Router();

router.get("/:id", getUserById);
router.post("/", postNewUser);

export default router;