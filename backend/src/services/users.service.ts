import { getUserInDatabase, createUserInDatabase, isUserInDatabase } from "../repositories/companyJson.repository";

export async function isUserFromDatabase(userId: string) {
    return await isUserInDatabase(userId);
}

export async function getUserFromDatabase(userId: string) {

    const user = await getUserInDatabase(userId);

    if (!user) {
        return false;
    }

    return user;
};

export async function createUserFromDatabase(userId: string) {
    if (await isUserInDatabase(userId)) {
        return false;
    }
    const newUser = await createUserInDatabase(userId);
    return newUser;
};

//temp function
export async function getOrCreateUserFromDatabase(userId: string) {

    const user = await getUserInDatabase(userId);

    if (!user) {
        const newUser = await createUserInDatabase(userId);
        return newUser;
    }

    return user;
};