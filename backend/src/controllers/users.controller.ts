import express from "express";
import { getUserFromDatabase, createUserFromDatabase, getOrCreateUserFromDatabase } from "../services/users.service";

export async function getUserById(req: express.Request, res: express.Response) {
  
  if (!req.params.id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  if (typeof req.params.id !== "string") {
    return res.status(400).json({ message: "Error with User ID" });
  }

  req.params.id = req.params.id.trim();

  if (req.params.id.length > 15) {
    return res.status(400).json({ message: "User ID must be at most 15 characters long" });
  }

  const result = await getOrCreateUserFromDatabase(req.params.id);

  if (!result) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(result);
}

export async function postNewUser(req: express.Request, res: express.Response) {

  if (!req.body.id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  if (typeof req.body.id !== "string") {
    return res.status(400).json({ message: "Error with User ID" });
  }

  req.body.id = req.body.id.trim();

  if (req.body.id.length > 15) {
    return res.status(400).json({ message: "User ID must be at most 15 characters long" });
  }

  const result = await createUserFromDatabase(req.body.id);

  if (!result) {
    return res.status(409).json({ message: "User could not be created" });
  }

  res.status(201).json(result);
}