import { getUserInDatabase, createUserInDatabase, isUserInDatabase } from "../repositories/companyJson.repository";

export async function isUserFromDatabase(userId: string) {
    return await isUserInDatabase(userId);
}

export async function getUserFromDatabase(userId: string, password: string) {

    const user = await getUserInDatabase(userId, password);

    if (!user) {
        return false;
    }

    return user;
};

export async function createUserFromDatabase(userId: string, password: string) {
    if (await isUserInDatabase(userId)) {
        return false;
    }
    const newUser = await createUserInDatabase(userId, password);
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