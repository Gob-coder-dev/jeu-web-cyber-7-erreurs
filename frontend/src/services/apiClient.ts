import type { LeaderboardEntry, LeaderboardUserResult } from "../types/Leaderboard";
import type { StartScenarioResult } from "../types/GameSession";
import type { ScenarioIntro } from "../types/Scenario";
import type { User } from "../types/User";
import type { SelectionPoint, SubmitAnswersResult } from "../types/Question";
import type { Language } from "../i18n/language";

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



export async function getScenariosCard(language: Language): Promise<ScenarioIntro[]> {
    const response = await fetch(`${API_URL}/game/scenarios?lang=${language}`, {
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
    language: Language,
): Promise<StartScenarioResult> {
    const response = await fetch(`${API_URL}/game/attempts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, scenarioId, language }),
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
