import type { LeaderboardEntry, LeaderboardUserResult } from "../types/Leaderboard";
import type { ScenarioIntro } from "../types/Scenario";
import type { ScenarioScore, User } from "../types/User";

const API_URL = "http://localhost:3000/api";

export async function getOrCreateUser(pseudo: string): Promise<User> {
    const response = await fetch(`${API_URL}/users/${pseudo}`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export async function saveScenarioScore(
    userId: string,
    scenarioId: string,
    score: number,
): Promise<ScenarioScore> {
    const response = await fetch(
        `${API_URL}/scores/users/${userId}/scenarios/${scenarioId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ score }),
        },
    );

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
    const response = await fetch(`${API_URL}/leaderboard`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export async function getLeaderboardUser(
    userId: string,
): Promise<LeaderboardUserResult> {
    const response = await fetch(`${API_URL}/leaderboard/users/${userId}`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}



export async function getScenariosCard(): Promise<ScenarioIntro[]> {
    const response = await fetch(`${API_URL}/game/scenarios`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}