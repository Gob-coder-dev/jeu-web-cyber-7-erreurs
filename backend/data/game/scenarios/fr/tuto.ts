import type { Scenario } from '../../../../src/types/GameData';

const postit = "images/fr/tutoriel/post-it.jpg";

export const tuto: Scenario = {
    id: "ceci-est-un-tutoriel",
    title: "Bienvenue, détective",
    description: "Bonjour détective, bienvenue dans l’organisation Détective de Terrain de Cybersécurité. Notre objectif : élucider les crimes cyber dans les entreprises et découvrir comment elles ont été attaquées. Avant d’aller sur le terrain, nous vous demandons de suivre une courte formation qui vous permettra de comprendre le type de mission qui vous attend.",
    globalAttackScenario: "Attaque grâce aux informations des post-it",
    questions: [
        {
            id: "règles-du-jeu",
            title: "Comment enquêter ?",
            instruction: "1. Observez attentivement l’image. \n2. Cliquez sur les éléments qui vous semblent dangereux ou anormaux. \n3. Chaque bonne réponse devient un indice validé. \n4. Les mauvaises réponses peuvent réduire votre score. \n5. Plus vous trouvez les indices rapidement, plus votre score augmente. \nÀ la fin de l’enquête, un rapport vous expliquera comment les erreurs trouvées auraient pu être exploitées dans une attaque réelle. \n\nPremière affaire : les post-it bavards \n\nVoici une image supposée compromettante avec 2 post-it fictivement problématiques. Cliquez sur ces derniers pour les signaler comme dangereux.",
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