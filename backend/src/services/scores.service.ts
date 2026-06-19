import { isScoreInDatabase, getScoreInDatabase, getTotalScoreInDatabase, createScoreInDatabase } from "../repositories/companyJson.repository";

export async function isScoreFromDatabase(userId: string, scenarioId: string) {
    return await isScoreInDatabase(userId, scenarioId);
}

export async function getScoreFromDatabase(userId: string, scenarioId: string) {

    const user = await getScoreInDatabase(userId, scenarioId);

    if (!user) {
        return false;
    }

    return user;
};

export async function getTotalScoreFromDatabase(userId: string) {

    const totalScore = await getTotalScoreInDatabase(userId);
    return totalScore;
}

export async function createScoreFromDatabase(userId: string, scenarioId: string, score: number) {
    if (await isScoreInDatabase(userId, scenarioId)) {
        return false;
    }
    const newScore = await createScoreInDatabase(userId, scenarioId, score);
    return newScore;
};