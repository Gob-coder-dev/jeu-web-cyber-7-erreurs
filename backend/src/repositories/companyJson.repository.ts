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

const normalizePseudo = (pseudo: string) => pseudo.trim().toLowerCase();

const createUserObject = (userId: string): User => {
  const now = getCurrentDate();

  return {
    id: userId,
    pseudo: userId,
    pseudoKey: normalizePseudo(userId),
    hashedPassword: null,
    emailAddress: null,
    globalScore: 0,
    completedScenarioIds: [],
    scenarioScores: {},
    createdAt: now,
    updatedAt: now,
  };
};

function findUserIndex(companyData: CompanyData, userId: string) {
  return companyData.users.findIndex((user) => user.id === userId);
}

function findUser(companyData: CompanyData, userId: string) {
  return companyData.users.find((user) => user.id === userId);
}

function calculateGlobalScore(user: User) {
  return Object.entries(user.scenarioScores)
    .filter(([scenarioId]) => scenarioId !== 'ceci-est-un-tutoriel')
    .reduce(
      (total, [, scenarioScore]) => total + scenarioScore.score,
      0,
    );
}

// User functions
export async function isUserInDatabase(userId: string) {
  const companyData = await readCompanyData();

  return findUserIndex(companyData, userId) !== -1;
}

export async function getUserInDatabase(userId: string) {
  const companyData = await readCompanyData();

  return findUser(companyData, userId);
}

export async function getAllUsersInDatabase() {
  const companyData = await readCompanyData();

  return [...companyData.users];
}

export async function createUserInDatabase(userId: string) {
  const companyData = await readCompanyData();
  const existingUser = findUser(companyData, userId);

  if (existingUser) {
    return existingUser;
  }

  const newUser = createUserObject(userId);
  companyData.users.push(newUser);

  await writeCompanyData(companyData);

  return newUser;
}

// Score functions
export async function isScoreInDatabase(userId: string, scenarioId: string) {
  const companyData = await readCompanyData();
  const user = findUser(companyData, userId);

  if (!user) {
    return false;
  }

  return Boolean(user.scenarioScores[scenarioId]);
}

export async function getScoreInDatabase(userId: string, scenarioId: string) {
  const companyData = await readCompanyData();
  const user = findUser(companyData, userId);

  if (!user) {
    return undefined;
  }

  return user.scenarioScores[scenarioId];
}

export async function getTotalScoreInDatabase(userId: string) {
  const companyData = await readCompanyData();
  const user = findUser(companyData, userId);

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
  const user = findUser(companyData, userId);

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
