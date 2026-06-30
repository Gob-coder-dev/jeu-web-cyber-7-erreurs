import type { Scenario } from "../../types/Scenario";

import postit from "../../image/tutoriel/post-it.jpg";

export const tuto: Scenario = {
    id: "ceci-est-un-tutoriel",
    title: "Bienvenue, détective",
    description: "Bonjour détective, bienvenue dans l’organisation Détective de Terrain de Cybersécurité. Notre objectif : élucider les crimes cyber dans les entreprises et découvrir comment elles ont été attaquées. Avant d’aller sur le terrain, nous vous demandons de suivre une courte formation qui vous permettra de comprendre le type de mission qui vous attend.",
    globalAttackScenario: "Attaque grâce aux informations des post-it",
    questions: [
        {
            id: "post-it-mdp",
            title: "Première affaire : les post-it bavards",
            instruction: "Voici une image supposée compromettante avec 2 post-it fictivement problématiques. Cliquez sur ces derniers pour les signaler comme dangereux.",
            attackScenario: "Faire attention aux post-it",
            image: postit,
            imageWidth: 1020,
            imageHeight: 765,
            hotspots: [
                {
                    id: "post-it-1",
                    x: 0,
                    y: 690,
                    width: 580,
                    height: 560,
                    label: "Indice validé",
                    explanation: "Ici c’était une erreur test"
                },
                {
                    id: "post-it-2",
                    x: 3300,
                    y: 1600,
                    width: 510,
                    height: 440,
                    label: "Indice validé",
                    explanation: "Ici c’était une erreur test"
                }
            ]
        }
    ]
}