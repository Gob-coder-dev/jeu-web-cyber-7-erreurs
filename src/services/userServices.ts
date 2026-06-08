import type { User } from "../types/User";
import type { Score } from "../types/Score";
import type { ScoreService } from "../services/scoreServices";

const USER_STORAGE_KEY = "cyber-game-user";

export class UserService {
    public getUsers(): User[] {
        const users = localStorage.getItem(USER_STORAGE_KEY);
        if (users) {
            return JSON.parse(users) as User[];
        }

        if (users === null){
            return [];
        }

        return JSON.parse(users) as User[];
    }

    public getUserByPseudo(pseudo: string): User | undefined {
        return this.getUsers().find((user) => user.pseudo === pseudo);
    }

    public addUser(user: User): void {
        const currentUsers = this.getUsers();
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify([...currentUsers, user]));
    }

    public updateUser(user: User): void {
        const currentUsers = this.getUsers();
        const updatedUsers = currentUsers.map((u) =>
            u.pseudo === user.pseudo ? user : u
        );
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUsers));
    }

    public clearUsers(): void {
        localStorage.removeItem(USER_STORAGE_KEY);
    }

    public getScoreByPseudo(pseudo: string): Score | undefined {
        return this.getScores().find((score) => score.pseudo === pseudo);
    }

    public getScores(): Score[] {
        const scores = localStorage.getItem(USER_STORAGE_KEY);
        if (scores?.includes("globalScore")) {
            return JSON.parse(scores) as Score[];
        }

        if (scores === null){
            return [];
        }

        return JSON.parse(scores) as Score[];
    }

    public addScore(score: Score): void {
        const currentScores = this.getScores();
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify([...currentScores, score]));
    }
}