import type { Question } from "../types/Question";

import desktopUnsafeImage from "../image/desktop/desktop.jpg";

export const questions: Question[] = [
  {
    id: "desktop-security-1",
    title: "Poste de travail non sécurisé",
    image: desktopUnsafeImage,
    hotspots: [
      {
        id: "ordinateur-allume",
        x: 1599,
        y: 1900,
        width: 750,
        height: 400,
        label: "ordinateur laissé allumé",
        explanation:
          "L'ordinateur est laissé allumé et connecté, ce qui peut permettre a un attaquant d'accéder aux informations sensibles si l'utilisateur s'eloigne de son poste de travail.",
      },
      {
        id: "mot-de-passe-poste-de-travail",
        x: 130,
        y: 1950,
        width: 300,
        height: 350,
        label: "Mot de passe visible sur un post-it",
        explanation:
          "Le mot de passe de l'utilisateur est ecrit sur un post-it collé a cote de son ordinateur, ce qui peut permettre a un attaquant de le trouver facilement et d'accéder au compte de l'utilisateur.",
      },
    ],
  },
];
