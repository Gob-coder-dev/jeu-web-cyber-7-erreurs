import type { CompanyData, ScenarioScore, User } from "../types/CompanyData";

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

// Temporary in-memory storage. Later, this object will come from demo.json.
const companyData: CompanyData = {
  companyId: "demo",
  companyName: "Entreprise Demo",
  users: [createUserObject("Alice"), createUserObject("Bob")],
};

function findUserIndex(userId: string) {
  return companyData.users.findIndex((user) => user.id === userId);
}

function findUser(userId: string) {
  return companyData.users.find((user) => user.id === userId);
}

function calculateGlobalScore(user: User) {
  return Object.values(user.scenarioScores).reduce(
    (total, scenarioScore) => total + scenarioScore.score,
    0,
  );
}

// User functions
export async function isUserInDatabase(userId: string) {
  return findUserIndex(userId) !== -1;
}

export async function getUserInDatabase(userId: string) {
  return findUser(userId);
}

export async function createUserInDatabase(userId: string) {
  const existingUser = findUser(userId);

  if (existingUser) {
    return existingUser;
  }

  const newUser = createUserObject(userId);
  companyData.users.push(newUser);

  return newUser;
}

// Score functions
export async function isScoreInDatabase(userId: string, scenarioId: string) {
  const user = findUser(userId);

  if (!user) {
    return false;
  }

  return Boolean(user.scenarioScores[scenarioId]);
}

export async function getScoreInDatabase(userId: string, scenarioId: string) {
  const user = findUser(userId);

  if (!user) {
    return undefined;
  }

  return user.scenarioScores[scenarioId];
}

export async function getTotalScoreInDatabase(userId: string) {
  const user = findUser(userId);

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
  const user = findUser(userId);

  if (!user) {
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

  return scenarioScore;
}
