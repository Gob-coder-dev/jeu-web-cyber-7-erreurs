import express from "express";
import { getUserFromDatabase, createUserFromDatabase, getOrCreateUserFromDatabase } from "../services/users.service";

export async function getUserByPseudo(req: express.Request, res: express.Response) {

  const username = req.body.pseudo;
  const password = req.body.password;
  if (!username) {
    return res.status(400).json({ message: "User ID is required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  if (typeof username !== "string") {
    return res.status(400).json({ message: "Error with User ID" });
  }

  if (typeof password !== "string") {
    return res.status(400).json({ message: "Error with Password" });
  }


  const cleanUsername = username.trim();
  const cleanPassword = password.trim();

  if (cleanUsername.length > 15) {
    return res.status(400).json({ message: "User ID must be at most 15 characters long" });
  }

   if (cleanPassword.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }

  const result = await getOrCreateUserFromDatabase(cleanUsername, cleanPassword);

  if (!result) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(result);
}

export async function postNewUser(req: express.Request, res: express.Response) {

  if (!req.body.pseudo) {
    return res.status(400).json({ message: "User ID is required" });
  }

  if (!req.body.password) {
    return res.status(400).json({ message: "Password is required" });
  }

  if (typeof req.body.pseudo !== "string") {
    return res.status(400).json({ message: "Error with User ID" });
  }

  if (typeof req.body.password !== "string") {
    return res.status(400).json({ message: "Error with Password" });
  }

  req.body.pseudo = req.body.pseudo.trim();
  req.body.password = req.body.password.trim();

  if (req.body.pseudo.length > 15) {
    return res.status(400).json({ message: "User ID must be at most 15 characters long" });
  }

  if (req.body.password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }

  const result = await createUserFromDatabase(req.body.pseudo, req.body.password);

  if (!result) {
    return res.status(409).json({ message: "User could not be created" });
  }

  res.status(201).json(result);
}