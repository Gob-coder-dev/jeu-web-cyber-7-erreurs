import type { Scenario } from "../../../../src/types/GameData";

const postit = "/images/fr/tutoriel/post-it.jpg";

export const tuto: Scenario = {
  id: "ceci-est-un-tutoriel",
  title: "Bienvenue, détective",
  description:
    "Bonjour détective, bienvenue dans l'organisation Détective de Terrain de Cybersécurité. Notre objectif : élucider les crimes cyber dans les entreprises et découvrir comment elles ont été attaquées. Avant d'aller sur le terrain, nous vous demandons de suivre une courte formation qui vous permettra de comprendre le type de mission qui vous attend.",
  difficulty: 1,
  globalAttackScenario:
    "Bravo détective ! En situation réelle, un attaquant peut profiter d'informations vulnérables visibles sur des documents ou des post-it pour compromettre les systèmes d'information d'une entreprise.",
  goodPractices:
    "Ne jamais laisser d'information sensible visible sur son poste de travail : mot de passe, code, identifiant, document confidentiel ou note interne. Avant de quitter un bureau, il faut ranger les documents sensibles et verrouiller sa session.",
  questions: [
    {
      id: "regles-du-jeu",
      title: "Comment enquêter ?",
      instruction:
        "1. Observez attentivement l'image.\n2. Cliquez sur les éléments qui vous semblent dangereux ou anormaux.\n3. Chaque bonne réponse devient un indice validé.\n4. Les mauvaises réponses peuvent réduire votre score.\n5. Si plusieurs anomalies identiques sont présentes, cliquez sur chacune d'entre elles.\n6. Plus vous trouvez les indices rapidement, plus votre score augmente.\n7. Après validation, passez la souris sur les zones de réponses correctes pour voir l'explication de chaque anomalie.\n\nÀ la fin de l'enquête, un rapport vous expliquera comment les erreurs trouvées auraient pu être exploitées dans une attaque réelle.\n\nPremière affaire : les post-it bavards.\n\nVoici une image supposée compromettante avec 2 post-it fictivement problématiques. Cliquez sur ces derniers pour les signaler comme dangereux.",
      attackScenario:
        "Les post-it visibles exposent des informations sensibles. Dans une situation réelle, un attaquant pourrait les photographier ou les utiliser directement pour accéder à un compte, un poste de travail ou un document protégé.",
      image: postit,
      imageWidth: 4080,
      imageHeight: 3060,
      hotspots: [
        {
          id: "post-it-1",
          x: 0,
          y: 690,
          width: 580,
          height: 560,
          label: "Post-it visible",
          explanation:
            "Ce post-it est visible dans l'environnement de travail. Une information sensible laissée ainsi peut être récupérée très facilement.",
        },
        {
          id: "post-it-2",
          x: 3300,
          y: 1600,
          width: 510,
          height: 440,
          label: "Post-it visible",
          explanation:
            "Ce second post-it montre qu'il faut vérifier toute l'image. Plusieurs indices du même type peuvent être présents.",
        },
      ],
    },
  ],
};
