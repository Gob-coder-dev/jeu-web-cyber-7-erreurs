import type { Question } from "../types/Question";

import desktopUnsafeImage from "../image/desktop/desktop.jpg";
import linkedinPostImage from "../image/social_media_post/linkedin_post.png";

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
  {
    id: "linkedin-post-sensitive-data",
    title: "Publication LinkedIn avec informations sensibles",
    image: linkedinPostImage,
    hotspots: [
      {
        id: "mot-de-passe-post-it",
        x: 168,
        y: 176,
        width: 104,
        height: 110,
        label: "Mot de passe visible",
        explanation:
          "Un mot de passe est visible sur un post-it. Une photo publiee en ligne peut donc exposer un acces interne.",
      },
      {
        id: "rendez-vous-medical-visible",
        x: 178,
        y: 292,
        width: 102,
        height: 100,
        label: "Information personnelle visible",
        explanation:
          "Le post-it contient un rendez-vous medical. C'est une donnee personnelle qui ne devrait pas apparaitre sur une publication.",
      },
      {
        id: "ecran-os-visible",
        x: 0,
        y: 306,
        width: 165,
        height: 265,
        label: "Systeme d'exploitation visible",
        explanation:
          "L'ecran de l'ordinateur affiche le systeme d'exploitation utilise par l'entreprise. Cela peut aider un attaquant a cibler ses attaques en fonction des vulnerabilites de ce systeme.",
      },
      {
        id: "carte-jeu-football-visible",
        x: 88,
        y: 575,
        width: 135,
        height: 92,
        label: "Carte de jeu de foot visible",
        explanation:
          "Une carte de jeu de football est visible sur le bureau. L'attaquant connais donc des informations personnelles sur l'employé, ce qui peut l'aider a creer une attaque de phishing ciblée.",
      },
      {
        id: "t-shirt-manga-visible",
        x: 990,
        y: 550,
        width: 400,
        height: 520,
        label: "T-shirt de manga visible",
        explanation:
          "Un t-shirt de manga est visible sur la photo. L'attaquant connais donc des informations personnelles sur l'employé, ce qui peut l'aider a creer une attaque de phishing ciblée.",
      }
    ],
  },
];
