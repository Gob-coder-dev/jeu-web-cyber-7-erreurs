import express from "express";
import { getUserFromDatabase, createUserFromDatabase } from "../services/users.service";
import { translations } from "../i18n/translations";

const t = translations.fr;

export async function getUserByPseudo(req: express.Request, res: express.Response) {

  const username = req.body.pseudo;
  const password = req.body.password;
  if (!username) {
    return res.status(400).json({ message: t.errorMessageUser.userId });
  }

  if (!password) {
    return res.status(400).json({ message: t.errorMessageUser.password });
  }

  if (typeof username !== "string") {
    return res.status(400).json({ message: t.errorMessageUser.userIdError });
  }

  if (typeof password !== "string") {
    return res.status(400).json({ message: t.errorMessageUser.passwordError });
  }


  const cleanUsername = username.trim();
  const cleanPassword = password.trim();

  if (cleanUsername.length > 15) {
    return res.status(400).json({ message: t.errorMessageUser.userIdTooLong });
  }

  if (cleanPassword.length > 15) {
    return res.status(400).json({ message: t.errorMessageUser.passwordTooLong });
  }

  if (cleanPassword.length < 6) {
    return res.status(400).json({ message: t.errorMessageUser.passwordTooShort });
  }

  const result = await getUserFromDatabase(cleanUsername, cleanPassword);

  if (!result) {
    return res.status(404).json({ message: t.errorMessageUser.userNotFound });
  }

  res.status(200).json(result);
}

export async function postNewUser(req: express.Request, res: express.Response) {
  
  const username = req.body.username;
  const password = req.body.password;
  if (!username) {
    return res.status(400).json({ message: t.errorMessageUser.userId });
  }

  if (!password) {
    return res.status(400).json({ message: t.errorMessageUser.password });
  }

  if (typeof username !== "string") {
    return res.status(400).json({ message: t.errorMessageUser.userIdError });
  }

  if (typeof password !== "string") {
    return res.status(400).json({ message: t.errorMessageUser.passwordError });
  }

  const cleanUsername = username.trim();
  const cleanPassword = password.trim();

  if (cleanUsername.length > 15) {
    return res.status(400).json({ message: t.errorMessageUser.userIdTooLong });
  }

  if (cleanPassword.length > 15) {
    return res.status(400).json({ message: t.errorMessageUser.passwordTooLong });
  }

  if (cleanPassword.length < 6) {
    return res.status(400).json({ message: t.errorMessageUser.passwordTooShort });
  }

  const result = await createUserFromDatabase(cleanUsername, cleanPassword  );

  if (!result) {
    return res.status(409).json({ message: t.errorMessageUser.userCreationFailed });
  }

  res.status(201).json(result);
}