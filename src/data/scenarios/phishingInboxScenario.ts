import type { Scenario } from "../../types/Scenario";

import emailPhishingDecathlonImage from "../../image/email_phishing/email_phishing.png";
import emailPhishingUpsImage from "../../image/email_phishing/email_phishing_2.png";
import emailPhishingAmazonImage from "../../image/email_phishing/email_phishing_3.png";
import emailPhishingSephoraImage from "../../image/email_phishing/email_phishing_4.png";

export const phishingInboxScenario: Scenario = {
  id: "phishing-inbox-sophie",
  title: "La boîte mail de Sophie",
  description:
    "Sophie reçoit plusieurs emails suspects dans la même journée. Aidez-la à identifier les indices qui montrent que ces messages peuvent être des tentatives de phishing.",
  questions: [
    {
      id: "email-phishing-ups",
      title: "Email de phishing UPS",
      instruction:
        "Sophie reçoit un mail de livraison urgente. Observez cet email et sélectionnez les indices qui doivent l'alerter.",
      image: emailPhishingUpsImage,
      imageWidth: 1618,
      imageHeight: 2198,
      hotspots: [
        {
          id: "ups-expediteur-suspect",
          x: 70,
          y: 110,
          width: 900,
          height: 40,
          label: "Expéditeur et domaine suspects",
          explanation:
            "Le nom affiché imite UPS, mais l'adresse et le domaine technique ne correspondent pas à un envoi officiel fiable.",
        },
        {
          id: "ups-sujet-urgent",
          x: 65,
          y: 60,
          width: 560,
          height: 42,
          label: "Objet avec délai limité",
          explanation:
            "Le délai limité crée une pression psychologique. Les emails frauduleux utilisent souvent ce type d'urgence.",
        },
        {
          id: "ups-demande-informations",
          x: 535,
          y: 730,
          width: 520,
          height: 165,
          label: "Demande de données personnelles",
          explanation:
            "Le message demande adresse, téléphone et date de livraison. Il faut vérifier la légitimité avant de fournir ces informations.",
        },
        {
          id: "ups-lien-suspect",
          x: 530,
          y: 1030,
          width: 310,
          height: 105,
          label: "Lien suspect",
          explanation:
            "Le lien visible ne ressemble pas à un domaine UPS officiel. Il ne faut pas cliquer sur un lien incohérent avec la marque.",
        },
        {
          id: "ups-pression-gain-temps",
          x: 530,
          y: 1425,
          width: 570,
          height: 115,
          label: "Bouton de confirmation",
          explanation:
            "Le bouton pousse à confirmer rapidement la livraison. Il faut passer par le site officiel plutôt que par le lien de l'email.",
        },
      ],
    },
    ///////////////////////////////////////////////////////////////////////
    {
      id: "email-phishing-amazon",
      title: "Email de phishing Amazon",
      instruction:
        "Un second message annonce une récompense inattendue. Repérez les signes qui montrent que cet email ne doit pas être considéré comme fiable.",
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
      ],
    },
    ///////////////////////////////////////////////////////////////////////
    {
      id: "email-phishing-decathlon",
      title: "Email de phishing Decathlon",
      instruction:
        "Sophie reçoit ensuite une offre commerciale. Retrouvez les indices qui montrent qu'il peut s'agir d'une tentative de phishing.",
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
          label: "Adresse d'expéditeur suspecte",
          explanation:
            "L'adresse de l'expéditeur ne correspond pas à un domaine officiel Decathlon. C'est un signal classique de phishing.",
        },
        {
          id: "decathlon-offre-trop-belle",
          x: 520,
          y: 670,
          width: 570,
          height: 72,
          label: "Offre trop belle pour être vraie",
          explanation:
            "Le message annonce un vélo réservé sans action précédente claire. Une promesse trop avantageuse doit faire douter.",
        },
        {
          id: "decathlon-urgence",
          x: 620,
          y: 830,
          width: 430,
          height: 35,
          label: "Urgence artificielle",
          explanation:
            "Le message insiste sur une expiration aujourd'hui. L'urgence est souvent utilisée pour pousser à cliquer trop vite.",
        },
        {
          id: "decathlon-bouton-incohérent",
          x: 580,
          y: 880,
          width: 450,
          height: 68,
          label: "Bouton incohérent avec l'offre",
          explanation:
            "Le bouton propose de 'réserver' un vélo, alors que le mail dit plus haut que le vélo est déjà réservé. Cette incohérence est un indice de mail brouillon fait rapidement pour une arnaque.",
        },
      ],
    },
    ///////////////////////////////////////////////////////////////////////
    {
      id: "email-phishing-sephora",
      title: "Email de phishing Sephora",
      instruction:
        "En fin de journée, Sophie reçoit un autre email d'offre. Sélectionnez les éléments qui doivent faire douter Sophie.",
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
          label: "Expéditeur suspect",
          explanation:
            "L'adresse de l'expéditeur ne correspond pas à un domaine officiel Sephora. Le nom affiché ne suffit pas à faire confiance.",
        },
        {
          id: "sephora-offre-exclusive",
          x: 75,
          y: 75,
          width: 680,
          height: 38,
          label: "Offre exclusive inattendue",
          explanation:
            "Une offre cadeau inattendue peut être utilisée pour pousser l'utilisateur à cliquer sans vérifier.",
        },
        {
          id: "sephora-prenom-identique-mail",
          x: 610,
          y: 470,
          width: 200,
          height: 50,
          label: "Nom client identique au mail",
          explanation:
            "Le mail montre un texte de salutation suivit du mail mais sans @gmail.com. Ce type de personnalisation maladroite est un indice de mail frauduleux très automatisé qui tente de paraître personnalisé sans réussir à le faire de manière crédible.",
        },
        {
          id: "sephora-donnees-personnelles",
          x: 550,
          y: 610,
          width: 530,
          height: 205,
          label: "Données personnelles affichées",
          explanation:
            "Le message affiche un identifiant et une adresse email. Un attaquant peut utiliser ces éléments pour rendre son message crédible.",
        },
      ],
    },
  ],
};
