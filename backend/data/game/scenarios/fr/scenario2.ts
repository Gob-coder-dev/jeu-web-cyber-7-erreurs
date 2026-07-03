import type { Scenario } from '../../../../src/types/GameData';

const emailPhishingDecathlonImage = "/images/scenario2/email_phishing.png";
const emailPhishingUpsImage = "/images/scenario2/email_phishing_2.png";
const emailPhishingAmazonImage = "/images/scenario2/email_phishing_3.png";
const emailPhishingSephoraImage = "/images/scenario2/email_phishing_4.png";

export const scenario2: Scenario = {
  id: "phishing-inbox-melanie",
  title: "La boite mail de Mélanie",
  description:
    "Mélanie, assistante administrative, a reçu plusieurs emails de tentatives de connexion non identifiées dans la même journée sur plusieurs de ses comptes client de service en ligne : UPS, Amazon, Sephora et Decathlon. Le lendemain, une tentative de connexion inhabituelle est détectée sur le compte de Mélanie dans le service interne.\n\nDétective, vous examinez la boîte mail de Mélanie. Vous y découvrez des messages suspects.",
  globalAttackScenario:
    "Mode opératoire probable : l'attaquant a bombardé Mélanie avec plusieurs appâts différents dans la même journée. Livraison urgente, cadeau, offre limitée, marque connue. Ce qui a dû la pousser, avec l'appât du gain,à cliquer sur ces faux liens et à remplir des informations personnelles.L'hacker a donc pu récolter ses informations et les a utilisées pour se connecter sur les sites de base. Chaque message teste une émotion différente.\n\nConclusion de l'enquête : le phishing ne repose pas seulement sur des fautes ou des emails grossiers. Il repose surtout sur la pression, la curiosité, la récompense et l'habitude. Le bon réflexe consiste à vérifier l'expéditeur, éviter les liens directs, passer par les sites officiels et signaler les messages douteux.\n\nBon réflexe à retenir\n\nAvant de cliquer, vérifier l'adresse réelle de l'expéditeur, l'URL, le contexte de la demande et le niveau d'urgence. En cas de doute, ne pas cliquer : signaler ou passer par un canal officiel.",
  questions: [
    {
      id: "ups-urgent-delivery",
      title: "Le colis trop pressé",
      instruction:
        "Mélanie a reçu cet email de livraison urgente UPS. Le message semble professionnel, mais plusieurs détails ne collent pas.",
      attackScenario:
        "Ce message cherche à créer un sentiment d'urgence autour d'un sujet banal : la livraison d'un colis. C'est précisément ce qui le rend efficace. L'attaquant n'a pas besoin d'être original, il doit seulement tomber au bon moment, avec le bon prétexte.",
      image: emailPhishingUpsImage,
      imageWidth: 1618,
      imageHeight: 2198,
      hotspots: [
        {
          id: "ups-suspicious-sender-domain",
          x: 70,
          y: 110,
          width: 900,
          height: 40,
          label: "Expéditeur et domaine suspects",
          explanation:
            "Le nom affiché imite UPS, mais l'adresse réelle ne correspond pas à un domaine officiel fiable. En phishing, le nom visible peut mentir : il faut regarder l'adresse complète.",
        },
        {
          id: "ups-limited-time-subject",
          x: 65,
          y: 60,
          width: 560,
          height: 42,
          label: "Objet avec délai limité",
          explanation:
            "Le délai limité met la victime sous pression. L'urgence est une technique classique pour réduire le temps de réflexion.",
        },
        {
          id: "ups-personal-data-request",
          x: 535,
          y: 730,
          width: 520,
          height: 165,
          label: "Demande de données personnelles",
          explanation:
            "Le message demande adresse, téléphone et date de livraison. Ces informations peuvent servir à enrichir un profil ou préparer une attaque plus ciblée. De plus, les entreprises de livraison ne peuvent pas initier de livraison s'ils n'ont pas votre adresse ou vos informations personnelles.",
        },
        {
          id: "ups-suspicious-link",
          x: 530,
          y: 1030,
          width: 310,
          height: 105,
          label: "Lien suspect",
          explanation:
            "Le lien visible ne ressemble pas à un domaine officiel UPS. Le bon réflexe est de passer par le site officiel ou l'application, jamais par un lien reçu dans un message douteux.",
        },
        {
          id: "ups-pressure-section",
          x: 530,
          y: 1425,
          width: 570,
          height: 115,
          label: "Section à retenir",
          explanation:
            "Cette section de texte utilise l'aspect psychologique de gain possible par l'utilisateur et a donner une pression mentale supplémentaire.",
        },
      ],
    },
    {
      id: "amazon-unexpected-gift",
      title: "Le cadeau tombé du ciel",
      instruction:
        "Un second message annonce une récompense inattendue d'Amazon.",
      attackScenario:
        "Ici, l'appât n'est plus l'urgence, mais la récompense. Le message tente de faire baisser la vigilance en donnant l'impression que la victime a quelque chose à gagner.",
      image: emailPhishingAmazonImage,
      imageWidth: 1592,
      imageHeight: 1188,
      hotspots: [
        {
          id: "amazon-sensational-subject",
          x: 75,
          y: 72,
          width: 1010,
          height: 42,
          label: "Objet trop sensationnel",
          explanation:
            "Les flammes, les félicitations et la date précise créent un effet d'annonce. Le but est d'attirer l'œil et de provoquer un clic rapide.",
        },
        {
          id: "amazon-random-sender",
          x: 80,
          y: 125,
          width: 700,
          height: 36,
          label: "Expéditeur suspect",
          explanation:
            "L'expéditeur du mail est complètement aléatoire. Il ne ressemble pas du tout à un vrai expéditeur.",
        },
        {
          id: "amazon-approximate-logo",
          x: 690,
          y: 260,
          width: 260,
          height: 110,
          label: "Logo approximatif",
          explanation:
            "Une identité visuelle légèrement différente peut révéler un message frauduleux. Les attaquants copient souvent les marques, mais les détails trahissent parfois la copie.",
        },
        {
          id: "amazon-improbable-prize",
          x: 455,
          y: 410,
          width: 720,
          height: 135,
          label: "Gain improbable",
          explanation:
            "Une récompense importante annoncée sans contexte clair doit alerter. Les fausses récompenses exploitent la curiosité et l'envie de profiter d'une opportunité.",
        },
        {
          id: "amazon-personal-data-confirmation",
          x: 565,
          y: 580,
          width: 500,
          height: 220,
          label: "Données personnelles à confirmer",
          explanation:
            "Le message demande ou affiche des informations personnelles. L'objectif peut être de valider une identité, compléter un profil ou préparer une autre attaque.",
        },
      ],
    },
    {
      id: "decathlon-forced-promotion",
      title: "La promotion de réservation",
      instruction:
        "Mélanie a reçu un troisième email concernant une réservation de vélo qu'elle n'aurait selon elle pas faite.",
      attackScenario:
        "Ce message mélange récompense et urgence. Il promet un avantage, puis menace de le faire disparaître. Cette combinaison est fréquente : l'attaquant crée d'abord l'envie, puis impose une décision rapide.",
      image: emailPhishingDecathlonImage,
      imageWidth: 1589,
      imageHeight: 1195,
      hotspots: [
        {
          id: "decathlon-suspicious-sender",
          x: 70,
          y: 118,
          width: 620,
          height: 38,
          label: "Adresse d'expéditeur suspecte",
          explanation:
            "L'adresse ne correspond pas à un domaine officiel Decathlon.",
        },
        {
          id: "decathlon-too-good-offer",
          x: 520,
          y: 670,
          width: 570,
          height: 72,
          label: "Offre trop belle pour être vraie",
          explanation:
            "Indice confirmé. Le message annonce un vélo réservé sans action précédente claire. Une promesse avantageuse, inattendue et non sollicitée doit faire douter.",
        },
        {
          id: "decathlon-artificial-urgency",
          x: 620,
          y: 830,
          width: 430,
          height: 35,
          label: "Urgence artificielle",
          explanation:
            "L'expiration annoncée aujourd'hui pousse à agir vite. Le temps limité est une pression psychologique utilisée pour éviter la vérification.",
        },
        {
          id: "decathlon-inconsistent-button",
          x: 580,
          y: 880,
          width: 450,
          height: 68,
          label: "Bouton incohérent avec l'offre",
          explanation:
            "Le bouton propose de réserver un vélo alors que le message affirme qu'il est déjà réservé. Cette incohérence montre que le scénario du mail n'est pas solide.",
        },
      ],
    },
    {
      id: "sephora-clumsy-personalization",
      title: "Le Coffret",
      instruction: "Un dernier mail concerne une offre Sephora suspecte.",
      attackScenario:
        "Le message tente de paraître personnel, mais il sonne faux. Dans une attaque réelle, même une personnalisation approximative peut suffire si la victime est fatiguée, pressée ou habituée à recevoir beaucoup d'emails commerciaux.",
      image: emailPhishingSephoraImage,
      imageWidth: 1585,
      imageHeight: 1138,
      hotspots: [
        {
          id: "sephora-suspicious-sender",
          x: 75,
          y: 125,
          width: 610,
          height: 38,
          label: "Expéditeur suspect",
          explanation:
            "L'adresse de l'expéditeur ne correspond pas à un domaine officiel Sephora. Le nom affiché est une façade : l'adresse complète reste la preuve à examiner.",
        },
        {
          id: "sephora-unexpected-exclusive-offer",
          x: 75,
          y: 75,
          width: 680,
          height: 38,
          label: "Offre exclusive inattendue",
          explanation:
            "Une offre cadeau inattendue peut pousser l'utilisateur à cliquer avant de réfléchir. L'effet de surprise est un outil de manipulation.",
        },
        {
          id: "sephora-clumsy-greeting",
          x: 610,
          y: 470,
          width: 200,
          height: 50,
          label: "Personnalisation maladroite",
          explanation:
            "Le message tente d'utiliser une salutation personnalisée, mais le résultat paraît automatisé et peu crédible (votre mail sans le @). Une personnalisation ratée est un indice fréquent de campagne frauduleuse.",
        },
        {
          id: "sephora-personal-data-visible",
          x: 550,
          y: 610,
          width: 530,
          height: 205,
          label: "Données personnelles affichées",
          explanation:
            "Le message affiche un identifiant et une adresse email. Ces éléments peuvent servir à rendre l'attaque plus crédible ou à confirmer que l'adresse est active.\n\nOr, les informations affichées sont des plus basique, un faux nom et un email",
        },
        {
          id: "sephora-fake-copyright-date",
          x: 520,
          y: 940,
          width: 575,
          height: 82,
          label: "Fauxcopyright et une mauvaise date",
          explanation:
            "Le mail essaye de paraître professionnel avec un faux copyright mais la date n'est pas bonne. Le mail a été envoyé en 2026 et le faux copyright date de 2025.",
        },
      ],
    },
  ],
};
