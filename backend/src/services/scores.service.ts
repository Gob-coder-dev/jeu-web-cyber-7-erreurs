import { isScoreInDatabase, getScoreInDatabase, getTotalScoreInDatabase } from "../repositories/companyJson.repository";

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

