import { getUserInDatabase, createUserInDatabase, isUsernameInDatabase, isUserInDatabase } from "../repositories/companyJson.repository";

export async function isUserFromDatabase(userId: string, password: string) {
    return await isUserInDatabase(userId, password);
}

export async function getUserFromDatabase(userId: string, password: string) {

    const user = await getUserInDatabase(userId, password);

    if (!user) {
        return false;
    }

    return user;
};

export async function createUserFromDatabase(username: string, password: string) {
    if (await isUsernameInDatabase(username)) {
        return null;
    }
    const newUser = await createUserInDatabase(username, password);
    return newUser;
};

//temp function
export async function getOrCreateUserFromDatabase(username: string, password: string) {

    const user = await getUserInDatabase(username, password);

    if (!user) {
        const newUser = await createUserInDatabase(username, password);
        return newUser;
    }

    return user;
};