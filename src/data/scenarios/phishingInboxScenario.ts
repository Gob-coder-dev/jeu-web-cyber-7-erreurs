import type { Scenario } from "../../types/Scenario";

import emailPhishingDecathlonImage from "../../image/email_phishing/email_phishing.png";
import emailPhishingUpsImage from "../../image/email_phishing/email_phishing_2.png";
import emailPhishingAmazonImage from "../../image/email_phishing/email_phishing_3.png";
import emailPhishingSephoraImage from "../../image/email_phishing/email_phishing_4.png";

export const phishingInboxScenario: Scenario = {
  id: "phishing-inbox-sophie",
  title: "La boite mail de Sophie",
  description:
    "Sophie recoit plusieurs emails suspects dans la meme journée. Aidez-la a identifier les indices qui montrent que ces messages peuvent être des tentatives de phishing.",
  questions: [
    {
      id: "email-phishing-ups",
      title: "Email de phishing UPS",
      instruction:
        "Sophie recoit une alerte de livraison urgente. Observez cet email et selectionnez les indices qui doivent l'alerter.",
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
            "Le nom affiche imite UPS, mais l'adresse et le domaine technique ne correspondent pas a un envoi officiel fiable.",
        },
        {
          id: "ups-sujet-urgent",
          x: 65,
          y: 65,
          width: 560,
          height: 42,
          label: "Objet avec delai limite",
          explanation:
            "Le delai limite cree une pression psychologique. Les emails frauduleux utilisent souvent ce type d'urgence.",
        },
        {
          id: "ups-demande-informations",
          x: 515,
          y: 710,
          width: 520,
          height: 155,
          label: "Demande de donnees personnelles",
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
            "Le lien visible ne ressemble pas a un domaine UPS officiel. Il ne faut pas cliquer sur un lien incoherent avec la marque.",
        },
        {
          id: "ups-bouton-confirmation",
          x: 520,
          y: 1525,
          width: 520,
          height: 65,
          label: "Bouton de confirmation",
          explanation:
            "Le bouton pousse a confirmer rapidement la livraison. Il faut passer par le site officiel plutot que par le lien de l'email.",
        },
      ],
    },
    ///////////////////////////////////////////////////////////////////////
    {
      id: "email-phishing-amazon",
      title: "Email de phishing Amazon",
      instruction:
        "Un second message annonce une recompense inattendue. Reperez les signes qui montrent que cet email ne doit pas etre considere comme fiable.",
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
            "L'objet utilise des flammes, des felicitations et une date precise. C'est une mise en scene typique pour attirer le clic.",
        },
        {
          id: "amazon-expediteur-suspect",
          x: 80,
          y: 125,
          width: 700,
          height: 36,
          label: "Expediteur suspect",
          explanation:
            "Le nom imite Amazon, mais le domaine de l'adresse ne correspond pas a un domaine officiel de l'entreprise.",
        },
        {
          id: "amazon-logo-police-suspecte",
          x: 690,
          y: 260,
          width: 260,
          height: 110,
          label: "Logo Amazon avec une police suspecte",
          explanation:
            "Le logo utilise une police inhabituelle et ne ressemble pas parfaitement a l'identite visuelle officielle d'Amazon. Un logo approximatif est un indice de phishing.",
        },
        {
          id: "amazon-gain-improbable",
          x: 455,
          y: 410,
          width: 720,
          height: 135,
          label: "Gain improbable",
          explanation:
            "L'email annonce un gain important sans contexte clair. Les fausses recompenses sont un levier frequent de phishing.",
        },
        {
          id: "amazon-donnees-personnelles",
          x: 565,
          y: 580,
          width: 500,
          height: 220,
          label: "Donnees personnelles a confirmer",
          explanation:
            "Le message affiche et demande de confirmer des donnees. Cela peut servir a collecter ou valider des informations personnelles.",
        },
        {
          id: "amazon-bouton-confirmation",
          x: 570,
          y: 850,
          width: 495,
          height: 70,
          label: "Bouton de confirmation",
          explanation:
            "Le bouton invite a confirmer les donnees. Avant de cliquer, il faut verifier l'adresse et passer par le site officiel.",
        },
      ],
    },
    ///////////////////////////////////////////////////////////////////////
    {
      id: "email-phishing-decathlon",
      title: "Email de phishing Decathlon",
      instruction:
        "Sophie recoit ensuite une offre commerciale. Retrouvez les indices qui montrent qu'il peut s'agir d'une tentative de phishing.",
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
            "L'adresse de l'expediteur ne correspond pas a un domaine officiel Decathlon. C'est un signal classique de phishing.",
        },
        {
          id: "decathlon-offre-trop-belle",
          x: 520,
          y: 670,
          width: 570,
          height: 72,
          label: "Offre trop belle pour etre vraie",
          explanation:
            "Le message annonce un velo reserve sans action precedente claire. Une promesse trop avantageuse doit faire douter.",
        },
        {
          id: "decathlon-urgence",
          x: 620,
          y: 830,
          width: 430,
          height: 35,
          label: "Urgence artificielle",
          explanation:
            "Le message insiste sur une expiration aujourd'hui. L'urgence est souvent utilisee pour pousser a cliquer trop vite.",
        },
        {
          id: "decathlon-bouton-action",
          x: 580,
          y: 880,
          width: 450,
          height: 68,
          label: "Bouton d'action incitatif",
          explanation:
            "Le bouton pousse l'utilisateur a agir immediatement. Avant de cliquer, il faut verifier l'expediteur et le lien.",
        },
        {
          id: "decathlon-lien-desabonnement",
          x: 740,
          y: 1010,
          width: 135,
          height: 35,
          label: "Lien de desabonnement",
          explanation:
            "Le lien de desabonnement peut aussi servir de piege pour inciter l'utilisateur a cliquer. Sur un email suspect, il vaut mieux ne cliquer sur aucun lien.",
        },
      ],
    },
    ///////////////////////////////////////////////////////////////////////
    {
      id: "email-phishing-sephora",
      title: "Email de phishing Sephora",
      instruction:
        "En fin de journee, Sophie recoit un autre email d'offre. Selectionnez les elements qui doivent faire douter Sophie.",
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
            "L'adresse de l'expediteur ne correspond pas a un domaine officiel Sephora. Le nom affiche ne suffit pas a faire confiance.",
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
          label: "Lien de desabonnement",
          explanation:
            "Le lien de desabonnement peut etre utilise pour pousser l'utilisateur a cliquer malgre sa mefiance. Dans un email suspect, il vaut mieux eviter tous les liens.",
        },
      ],
    },
  ],
};
