import type { LeaderboardEntry, LeaderboardUserResult } from "../types/Leaderboard";
import type { StartScenarioResult } from "../types/GameSession";
import type { ScenarioIntro } from "../types/Scenario";
import type { ScenarioScore, User } from "../types/User";
import type { SelectionPoint, SubmitAnswersResult } from "../types/Question";

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

export async function startScenario(
    userId: string,
    scenarioId: string,
): Promise<StartScenarioResult> {
    const response = await fetch(`${API_URL}/game/attempts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, scenarioId }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export async function submitAnswers(
    attemptId: string,
    selections: SelectionPoint[],
    timeTaken: number,
): Promise<SubmitAnswersResult> {
    const response = await fetch(`${API_URL}/game/attempts/${attemptId}/answers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ selections, timeTaken }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

