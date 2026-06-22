const API_URL = "http://localhost:3000/api"; //à changer plus tard (mettre dans un .env)
// plus tard changer variable reponse en typage unique

export async function getOrCreateUser(pseudo: string) {
    const reponse = await fetch(`${API_URL}/users/${pseudo}`, {
        method: "GET",
    });
    if (!reponse.ok) {
        throw new Error(`HTTP error! status: ${reponse.status}`);
    }
    return reponse.json();
}

export async function saveScenarioScore(userId: string, scenarioId: string, score: number) {
    const response = await fetch(`${API_URL}/scores/users/${userId}/scenarios/${scenarioId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ score })
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export async function getLeaderboard() {
    const response = await fetch(`${API_URL}/leaderboard`, {
        method: "GET",
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export async function getLeaderboardUser(userId: string) {
    const response = await fetch(`${API_URL}/leaderboard/users/${userId}`, {
        method: "GET",
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}