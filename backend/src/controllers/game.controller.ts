import express from 'express';
import { getScenariosCardService } from '../services/game.service';


export async function getScenariosCard(req: express.Request, res: express.Response) {
    const scenariosCard = getScenariosCardService();
    if (!scenariosCard || scenariosCard.length === 0) {
        return res.status(404).json({ message: 'No scenarios found' });
    }
    res.status(200).json(scenariosCard);
}