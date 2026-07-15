import { getAllUsersInDatabase, getUserInDatabase } from '../repositories/companyJson.repository';
import { TUTORIAL_SCENARIO_ID } from '../repositories/gameScenario.repository';
import type { User } from '../types/CompanyData';
import type { LeaderboardEntry, LeaderboardUserResult } from '../types/Leaderboard';

function hasCompletedPlayableScenario(user: User) {
    return user.completedScenarioIds.some(
        (scenarioId) => scenarioId !== TUTORIAL_SCENARIO_ID,
    );
}

function getPlayedUsersSortedByScore(users: User[]) {
    return users
        .filter(hasCompletedPlayableScenario)
        .sort((a, b) => b.globalScore - a.globalScore);
}

export async function getLeaderboardFromDatabase(): Promise<LeaderboardEntry[]> {
    const users = await getAllUsersInDatabase();

    return getPlayedUsersSortedByScore(users)
        .slice(0, 12)
        .map((user, index) => ({
            id: user.id,
            pseudo: user.pseudo,
            globalScore: user.globalScore,
            rank: index + 1,
        }));
}

export async function getLeaderboardUserFromDatabase(
    userId: string,
): Promise<LeaderboardUserResult> {
    const user = await getUserInDatabase(userId);

    if (!user) {
        return {
            exists: false,
            hasPlayed: false,
            rank: null,
            user: null,
        };
    }

    const users = await getAllUsersInDatabase();
    const playedUsers = getPlayedUsersSortedByScore(users);
    const rankIndex = playedUsers.findIndex((playedUser) => playedUser.id === user.id);
    const hasPlayed = rankIndex !== -1;

    return {
        exists: true,
        hasPlayed,
        rank: hasPlayed ? rankIndex + 1 : null,
        user: {
            id: user.id,
            pseudo: user.pseudo,
            globalScore: user.globalScore,
        },
    };
};
