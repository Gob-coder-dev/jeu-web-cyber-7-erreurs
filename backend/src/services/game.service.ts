import { getScenariosCard } from '../repositories/gameScenario.repository';

export function getScenariosCardService(): ReturnType<typeof getScenariosCard> {
    return getScenariosCard();
}