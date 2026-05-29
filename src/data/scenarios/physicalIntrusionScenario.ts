import type { Scenario } from "../../types/Scenario";

import desktopUnsafeImage from "../../image/desktop/desktop.jpg";
import desktopPauseImage from "../../image/desktop/desktop_2.jpg";
import linkedinPostImage from "../../image/social_media_post/linkedin_post.png";

export const physicalIntrusionScenario: Scenario = {
  id: "physical-intrusion",
  title: "L'intrusion dans les locaux",
  description:
    "Clara, community manager de l'entreprise, fait un mauvais usage de LinkedIn. Julien, quant à lui, est un nouveau comptable dans l'entreprise et est négligent au niveau de la sécurité de son poste de travail.",
  questions: [
    {
      id: "linkedin-post-sensitive-data",
      title: "Publication LinkedIn avec informations sensibles",
      instruction:
        "Clara publie une photo pour présenter le nouveau comptable Julien dans l'entreprise. Repérez les informations qui pourraient aider un attaquant à préparer une intrusion.",
      image: linkedinPostImage,
      imageWidth: 1448,
      imageHeight: 1086,
      hotspots: [
        {
          id: "mot-de-passe-post-it",
          x: 168,
          y: 176,
          width: 104,
          height: 110,
          label: "Mot de passe visible",
          explanation:
            "Un mot de passe est visible sur un post-it. Une photo publiée en ligne peut donc exposer un accès interne.",
        },
        {
          id: "rendez-vous-medical-visible",
          x: 178,
          y: 292,
          width: 102,
          height: 100,
          label: "Information personnelle visible",
          explanation:
            "Le post-it contient un rendez-vous médical. C'est une donnée personnelle qui ne devrait pas apparaître sur une publication.",
        },
        {
          id: "ecran-os-visible",
          x: 0,
          y: 306,
          width: 165,
          height: 265,
          label: "Système d'exploitation visible",
          explanation:
            "L'écran de l'ordinateur affiche le système d'exploitation utilisé par l'entreprise. Cela peut aider un attaquant à cibler ses attaques en fonction des vulnérabilités de ce système.",
        },
        {
          id: "carte-jeu-football-visible",
          x: 88,
          y: 575,
          width: 135,
          height: 92,
          label: "Carte de jeu de foot visible",
          explanation:
            "Une carte de jeu de football est visible sur le bureau. L'attaquant connaît donc des informations personnelles sur l'employé, ce qui peut l'aider à créer une attaque de phishing ciblée.",
        },
        {
          id: "t-shirt-manga-visible",
          x: 990,
          y: 550,
          width: 400,
          height: 520,
          label: "T-shirt de manga visible",
          explanation:
            "Un t-shirt de manga est visible sur la photo. L'attaquant connaît donc des informations personnelles sur l'employé, ce qui peut l'aider à créer une attaque de phishing ciblée.",
        },
      ],
    },
    ///////////////////////////////////////////////////////////////////////
    {
      id: "desktop-security-1",
      title: "Poste de travail non sécurisé",
      instruction:
        "Julien part en pause quelques minutes. Comme souvent, il quitte son poste trop vite. Identifiez les erreurs visibles sur son bureau.",
      image: desktopUnsafeImage,
      imageWidth: 3060,
      imageHeight: 4080,
      hotspots: [
        {
          id: "ordinateur-allume",
          x: 1599,
          y: 1900,
          width: 750,
          height: 400,
          label: "Ordinateur laissé allumé",
          explanation:
            "L'ordinateur est laissé allumé et connecté, ce qui peut permettre à un attaquant d'accéder aux informations sensibles si l'utilisateur s'éloigne de son poste de travail.",
        },
        {
          id: "mot-de-passe-poste-de-travail",
          x: 130,
          y: 1950,
          width: 300,
          height: 350,
          label: "Mot de passe visible sur un post-it",
          explanation:
            "Le mot de passe de l'utilisateur est écrit sur un post-it collé à côté de son ordinateur, ce qui peut permettre à un attaquant de le trouver facilement et d'accéder au compte de l'utilisateur.",
        },
      ],
    },
    ///////////////////////////////////////////////////////////////////////
    {
      id: "desktop-security-2",
      title: "Bureau laissé sans surveillance",
      instruction:
        "Un attaquant s'introduit dans les locaux et cherche un poste exploitable. Le bureau de Julien est accessible pendant son absence. Que peut exploiter l'attaquant sur ce bureau ?",
      image: desktopPauseImage,
      imageWidth: 2400,
      imageHeight: 3000,
      hotspots: [
        {
          id: "ordinateur-deverrouille",
          x: 1360,
          y: 1350,
          width: 850,
          height: 700,
          label: "Ordinateur laissé déverrouillé",
          explanation:
            "L'ordinateur semble accessible pendant l'absence de Julien. Un poste non verrouillé peut permettre à une personne non autorisée d'utiliser l'ordinateur.",
        },
        {
          id: "telephone-visible",
          x: 450,
          y: 1770,
          width: 500,
          height: 200,
          label: "Téléphone visible et accessible",
          explanation:
            "Un téléphone laissé sur le bureau peut exposer des notifications, des messages ou des applications professionnelles.",
        },
        {
          id: "assistant-vocal-bureau",
          x: 980,
          y: 1600,
          width: 300,
          height: 260,
          label: "Assistant vocal sur le bureau",
          explanation:
            "Un assistant vocal placé dans un espace de travail peut capter des conversations professionnelles sensibles et l'attaquant peut donc le voler.",
        },
      ],
    },
  ],
};
