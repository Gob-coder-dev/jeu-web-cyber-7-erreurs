import type { Score } from "../types/Score";

const SCORES_STORAGE_KEY = "cyber-game-scores";

export class ScoreService {
    public getScores(): Score[] {
        const scores = localStorage.getItem(SCORES_STORAGE_KEY);
        if (scores) {
            return JSON.parse(scores) as Score[];
        }

        if (scores === null){
            return [];
        }

        return JSON.parse(scores) as Score[];
    }

    public addScore(score: Score): void {
        const currentScores = this.getScores();
        localStorage.setItem(SCORES_STORAGE_KEY, JSON.stringify([...currentScores, score]));
    }

    public clearScores(): void {
        localStorage.removeItem(SCORES_STORAGE_KEY);
    }
}