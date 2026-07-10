import type { LeaderboardEntry, LeaderboardUserResult } from "../types/Leaderboard";
import type { StartScenarioResult } from "../types/GameSession";
import type { ScenarioIntro } from "../types/Scenario";
import type { User } from "../types/User";
import type { SelectionPoint, SubmitAnswersResult } from "../types/Question";

const API_URL = "http://localhost:3000/api";


export async function getOrCreateUser(pseudo: string, password: string): Promise<User> {
    const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({pseudo, password }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export async function postNewUser(username: string, password: string): Promise<User> {
    const response = await fetch(`${API_URL}/users/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password}),
    });

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
    questionId: string,
    selections: SelectionPoint[],
): Promise<SubmitAnswersResult> {
    const response = await fetch(`${API_URL}/game/attempts/${attemptId}/questions/${questionId}/answers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ selections }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export async function startTimer(
    attemptId: string,
    questionId: string,
): Promise<{ success: boolean; reason?: string }> {
    const response = await fetch(`${API_URL}/game/attempts/${attemptId}/questions/${questionId}/start`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}
