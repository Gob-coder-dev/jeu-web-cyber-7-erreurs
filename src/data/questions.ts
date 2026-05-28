import type { Question } from "../types/Question";

import desktopUnsafeImage from "../image/desktop/desktop.jpg";
import desktopPauseImage from "../image/desktop/desktop_2.jpg";
import emailPhishingDecathlonImage from "../image/email_phishing/email_phishing.png";
import emailPhishingUpsImage from "../image/email_phishing/email_phishing_2.png";
import emailPhishingAmazonImage from "../image/email_phishing/email_phishing_3.png";
import emailPhishingSephoraImage from "../image/email_phishing/email_phishing_4.png";
import linkedinPostImage from "../image/social_media_post/linkedin_post.png";

export const questions: Question[] = [
  {
    id: "desktop-security-1",
    title: "Poste de travail non sécurisé",
    instruction: "Voici une photo d'un poste de travail d'une personne en pause café.",
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
  //////////////////////////////////////////////////////////////
  {
    id: "desktop-security-2",
    title: "Bureau laisse sans surveillance",
    instruction:
      "Voici une photo d'un poste de travail d'un employé en pause café.",
    image: desktopPauseImage,
    imageWidth: 2400,
    imageHeight: 3000,
    hotspots: [
      {
        id: "ordinateur-deverrouilé",
        x: 1360,
        y: 1350,
        width: 850,
        height: 700,
        label: "Ordinateur laissé deverrouillé",
        explanation:
          "L'ordinateur semble accessible pendant l'absence de l'utilisateur. Un poste non verrouillé peut permettre a une personne non autorisée d'utiliser l'ordinateur.",
      },
      {
        id: "telephone-visible",
        x: 450,
        y: 1770,
        width: 500,
        height: 200,
        label: "Telephone visible et accessible",
        explanation:
          "Un telephone laissé sur le bureau peut exposer des notifications, des messages ou des applications professionnelles.",
      },
      {
        id: "assistant-vocal-bureau",
        x: 980,
        y: 1600,
        width: 300,
        height: 260,
        label: "Assistant vocal sur le bureau",
        explanation:
          "Un assistant vocal placé dans un espace de travail peut capter des conversations professionnelles sensibles.",
      },
    ],
  },
  //////////////////////////////////////////////////////////////
  {
    id: "linkedin-post-sensitive-data",
    title: "Publication LinkedIn avec informations sensibles",
    instruction: "Voici un post LinkedIn d'une entreprise accueillant son nouveau comptable. Identifiez les quatre erreurs de cybersécurité illustrées dans l'image.",
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
  //////////////////////////////////////////////////////////////
  {
    id: "email-phishing-decathlon",
    title: "Email de phishing Decathlon",
    instruction:
      "Analysez cet email et retrouvez les indices qui montrent qu'il peut s'agir d'une tentative de phishing.",
    image: emailPhishingDecathlonImage,
    imageWidth: 1589,
    imageHeight: 1195,
    hotspots: [
      {
        id: "decathlon-expediteur-suspect",
        x: 70,
        y: 118,
        width: 620,
        height: 38,
        label: "Adresse d'expediteur suspecte",
        explanation:
          "L'adresse de l'expediteur ne correspond pas à un domaine officiel Decathlon. C'est un signal classique de phishing.",
      },
      {
        id: "decathlon-offre-trop-belle",
        x: 520,
        y: 670,
        width: 570,
        height: 72,
        label: "Offre trop belle pour être vraie",
        explanation:
          "Le message annonce un vélo reservé sans action precedente claire. Une promesse trop avantageuse doit faire douter.",
      },
      {
        id: "decathlon-urgence",
        x: 620,
        y: 830,
        width: 430,
        height: 35,
        label: "Urgence artificielle",
        explanation:
          "Le message insiste sur une expiration aujourd'hui. L'urgence est souvent utilisee pour pousser à cliquer trop vite.",
      },
      {
        id: "decathlon-bouton-action",
        x: 580,
        y: 880,
        width: 450,
        height: 68,
        label: "Bouton d'action incitatif",
        explanation:
          "Le bouton pousse l'utilisateur à agir immediatement. Avant de cliquer, il faut verifier l'expediteur et le lien.",
      },
      {
        id: "decathlon-lien-desabonnement",
        x: 740,
        y: 1010,
        width: 135,
        height: 35,
        label: "Lien de désabonnement",
        explanation:
          "Le lien de désabonnement peut aussi servir de piège pour inciter l'utilisateur à cliquer. Sur un email suspect, il vaut mieux ne cliquer sur aucun lien.",
      },
    ],
  },
  //////////////////////////////////////////////////////////////
  {
    id: "email-phishing-ups",
    title: "Email de phishing UPS",
    instruction:
      "Observez cet email de livraison et selectionnez les indices qui doivent alerter l'utilisateur.",
    image: emailPhishingUpsImage,
    imageWidth: 1618,
    imageHeight: 2198,
    hotspots: [
      {
        id: "ups-expediteur-suspect",
        x: 70,
        y: 120,
        width: 900,
        height: 40,
        label: "Expediteur et domaine suspects",
        explanation:
          "Le nom affiche imite UPS, mais l'adresse et le domaine technique ne correspondent pas à un envoi officiel fiable.",
      },
      {
        id: "ups-sujet-urgent",
        x: 65,
        y: 65,
        width: 560,
        height: 42,
        label: "Objet avec delai limite",
        explanation:
          "Le delai limite crée une pression psychologique. Les emails frauduleux utilisent souvent ce type d'urgence.",
      },
      {
        id: "ups-demande-informations",
        x: 515,
        y: 710,
        width: 520,
        height: 155,
        label: "Demande de données personnelles",
        explanation:
          "Le message demande adresse, telephone et date de livraison. Il faut verifier la legitimite avant de fournir ces informations.",
      },
      {
        id: "ups-lien-suspect",
        x: 520,
        y: 990,
        width: 310,
        height: 105,
        label: "Lien suspect",
        explanation:
          "Le lien visible ne ressemble pas à un domaine UPS officiel. Il ne faut pas cliquer sur un lien incoherent avec la marque.",
      },
      {
        id: "ups-bouton-confirmation",
        x: 520,
        y: 1525,
        width: 520,
        height: 65,
        label: "Bouton de confirmation",
        explanation:
          "Le bouton pousse à confirmer rapidement la livraison. Il faut passer par le site officiel plutot que par le lien de l'email.",
      },
    ],
  },
  //////////////////////////////////////////////////////////////
  {
    id: "email-phishing-amazon",
    title: "Email de phishing Amazon",
    instruction:
      "Repérez les signes qui montrent que cet email ne doit pas être considéré comme fiable.",
    image: emailPhishingAmazonImage,
    imageWidth: 1592,
    imageHeight: 1188,
    hotspots: [
      {
        id: "amazon-sujet-suspect",
        x: 75,
        y: 72,
        width: 1010,
        height: 42,
        label: "Objet trop sensationnel",
        explanation:
          "L'objet utilise des flammes, des félicitations et une date précise. C'est une mise en scène typique pour attirer le clic.",
      },
      {
        id: "amazon-expediteur-suspect",
        x: 80,
        y: 125,
        width: 700,
        height: 36,
        label: "Expéditeur suspect",
        explanation:
          "Le nom imite Amazon, mais le domaine de l'adresse ne correspond pas à un domaine officiel de l'entreprise.",
      },
      {
        id: "amazon-logo-police-suspecte",
        x: 690,
        y: 260,
        width: 260,
        height: 110,
        label: "Logo Amazon avec une police suspecte",
        explanation:
          "Le logo utilise une police inhabituelle et ne ressemble pas parfaitement à l'identité visuelle officielle d'Amazon. Un logo approximatif est un indice de phishing.",
      },
      {
        id: "amazon-gain-improbable",
        x: 455,
        y: 410,
        width: 720,
        height: 135,
        label: "Gain improbable",
        explanation:
          "L'email annonce un gain important sans contexte clair. Les fausses récompenses sont un levier fréquent de phishing.",
      },
      {
        id: "amazon-donnees-personnelles",
        x: 565,
        y: 580,
        width: 500,
        height: 220,
        label: "Données personnelles à confirmer",
        explanation:
          "Le message affiche et demande de confirmer des données. Cela peut servir à collecter ou valider des informations personnelles.",
      },
      {
        id: "amazon-bouton-confirmation",
        x: 570,
        y: 850,
        width: 495,
        height: 70,
        label: "Bouton de confirmation",
        explanation:
          "Le bouton invite à confirmer les données. Avant de cliquer, il faut vérifier l'adresse et passer par le site officiel.",
      },
    ],
  },
  //////////////////////////////////////////////////////////////
  {
    id: "email-phishing-sephora",
    title: "Email de phishing Sephora",
    instruction:
      "Analysez cet email promotionnel et selectionnez les elements qui doivent vous faire douter.",
    image: emailPhishingSephoraImage,
    imageWidth: 1585,
    imageHeight: 1138,
    hotspots: [
      {
        id: "sephora-expediteur-suspect",
        x: 75,
        y: 125,
        width: 610,
        height: 38,
        label: "Expediteur suspect",
        explanation:
          "L'adresse de l'expediteur ne correspond pas à un domaine officiel Sephora. Le nom affiche ne suffit pas a faire confiance.",
      },
      {
        id: "sephora-offre-exclusive",
        x: 75,
        y: 75,
        width: 680,
        height: 38,
        label: "Offre exclusive inattendue",
        explanation:
          "Une offre cadeau inattendue peut etre utilisee pour pousser l'utilisateur a cliquer sans verifier.",
      },
      {
        id: "sephora-donnees-personnelles",
        x: 550,
        y: 610,
        width: 530,
        height: 205,
        label: "Donnees personnelles affichees",
        explanation:
          "Le message affiche un identifiant et une adresse email. Un attaquant peut utiliser ces elements pour rendre son message credible.",
      },
      {
        id: "sephora-bouton-reclamation",
        x: 625,
        y: 842,
        width: 380,
        height: 70,
        label: "Bouton de reclamation",
        explanation:
          "Le bouton incite a reclamer le cadeau. Il faut verifier l'expediteur et passer par le site officiel avant toute action.",
      },
      {
        id: "sephora-lien-desabonnement",
        x: 735,
        y: 988,
        width: 170,
        height: 35,
        label: "Lien de désabonnement",
        explanation:
          "Le lien de désabonnement peut être utilisé pour pousser l'utilisateur à cliquer malgré sa méfiance. Dans un email suspect, il vaut mieux éviter tous les liens.",
      },
    ],
  },
];
