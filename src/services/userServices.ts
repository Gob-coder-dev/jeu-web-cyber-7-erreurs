import type { User } from "../types/User";

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
}