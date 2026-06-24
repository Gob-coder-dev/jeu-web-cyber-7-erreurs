import type { PublicQuestion, PublicCorrection, Scenario, Question } from '../types/GameData';
import { scenario1 } from '../../data/game/scenarios/scenario1';
import { scenario2 } from '../../data/game/scenarios/scenario2';
import { scenario3 } from '../../data/game/scenarios/scenario3';
import { scenario4 } from '../../data/game/scenarios/scenario4';

function findScenarioById(scenarioId: string): Scenario {
    switch (scenarioId) {
        case 'physical-intrusion':
            return scenario1;
        case 'commute-security':
            return scenario2;
        case 'workplace-incident':
            return scenario3;
        case 'public-network-vulnerability':
            return scenario4;
        default:
            throw new Error(`Scenario not found for ID: ${scenarioId}`);
    }
}

export function getPublicScenariosById(scenarioId: string): Scenario[] {
    const scenario : Scenario = findScenarioById(scenarioId);
    