import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { CompanyData, ScenarioScore, User } from "../types/CompanyData";

const companyFilePath = path.join(
  process.cwd(),
  "data",
  "companies",
  "demo.json",
);

async function readCompanyData(): Promise<CompanyData> {
  const fileContent = await readFile(companyFilePath, "utf-8");
  return JSON.parse(fileContent) as CompanyData;
}

async function writeCompanyData(companyData: CompanyData): Promise<void> {
  await writeFile(
    companyFilePath,
    JSON.stringify(companyData, null, 2),
    "utf-8",
  );
}

const getCurrentDate = () => new Date().toISOString();

const normalizeUsername = (username: string) => username.trim().toLowerCase();

const createUserObject = (username: string, password: string): User => {
  const now = getCurrentDate();

  return {
    id: crypto.randomUUID(),
    pseudo: username,
    pseudoKey: normalizeUsername(username),
    hashedPassword: password,
    emailAddress: null,
    globalScore: 0,
    completedScenarioIds: [],
    scenarioScores: {},
    createdAt: now,
    updatedAt: now,
  };
};

function findUserIndex(companyData: CompanyData, username: string) {
  return companyData.users.findIndex((user) => user.id === username);
}

function findUserById(companyData: CompanyData, userId: string) {
  return companyData.users.find((user) => user.id === userId);
}

function findUser(companyData: CompanyData, username: string, password: string) {
  const normalizedUsername = normalizeUsername(username);
  return companyData.users.find((user) =>
    user.pseudoKey === normalizedUsername && user.hashedPassword === password,
  );
}

function findUsername(companyData: CompanyData, username: string) {
  const normalizedUsername = normalizeUsername(username);
  return companyData.users.find((user) => user.pseudoKey === normalizedUsername);
}

function calculateGlobalScore(user: User) {
  return Object.values(user.scenarioScores).reduce(
    (total, scenarioScore) => total + scenarioScore.score,
    0,
  );
}

// User functions
export async function isUserInDatabase(userId: string, password: string) {
  const companyData = await readCompanyData();

  return findUser(companyData, userId, password) !== undefined;
}

export async function isUsernameInDatabase(username: string) {
  const companyData = await readCompanyData();

  return findUsername(companyData, username) !== undefined;
}

export async function getUserInDatabase(userId: string, password: string) {
  const companyData = await readCompanyData();

  return findUser(companyData, userId, password);
}

export async function getUserInDatabaseById(userId: string) {
  const companyData = await readCompanyData();

  return findUserById(companyData, userId);
}

export async function getAllUsersInDatabase() {
  const companyData = await readCompanyData();

  return [...companyData.users];
}

export async function createUserInDatabase(username: string, password: string) {
  const companyData = await readCompanyData();
  const existingUser = findUsername(companyData, username);

  if (existingUser) {
    return null;
  }

  const newUser = createUserObject(username, password);
  companyData.users.push(newUser);

  await writeCompanyData(companyData);

  return newUser;
}

// Score functions
export async function isScoreInDatabase(userId: string, scenarioId: string) {
  const companyData = await readCompanyData();
  const user = findUserById(companyData, userId);

  if (!user) {
    return false;
  }

  return Boolean(user.scenarioScores[scenarioId]);
}

export async function getScoreInDatabase(userId: string, scenarioId: string) {
  const companyData = await readCompanyData();
  const user = findUserById(companyData, userId);

  if (!user) {
    return undefined;
  }

  return user.scenarioScores[scenarioId];
}

export async function getTotalScoreInDatabase(userId: string) {
  const companyData = await readCompanyData();
  const user = findUserById(companyData, userId);

  if (!user) {
    return null;
  }

  return user.globalScore;
}

export async function createScoreInDatabase(
  userId: string,
  scenarioId: string,
  score: number,
) {
  const companyData = await readCompanyData();
  const user = findUserById(companyData, userId);

  if (!user) {
    return null;
  }

  if (user.scenarioScores[scenarioId]) {
    return null;
  }

  const scenarioScore: ScenarioScore = {
    score,
    completedAt: getCurrentDate(),
  };

  user.scenarioScores[scenarioId] = scenarioScore;

  if (!user.completedScenarioIds.includes(scenarioId)) {
    user.completedScenarioIds.push(scenarioId);
  }

  user.globalScore = calculateGlobalScore(user);
  user.updatedAt = getCurrentDate();

  await writeCompanyData(companyData);

  return scenarioScore;
}
