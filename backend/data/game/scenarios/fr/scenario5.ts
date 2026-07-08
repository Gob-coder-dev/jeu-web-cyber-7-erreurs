import type { Scenario } from '../../../../src/types/GameData';

const jobOfferImage = "/images/fr/scenario5/annonce.png";
const candidateEmailImage = "/images/fr/scenario5/mail.png";
const wordDocumentImage = "/images/fr/scenario5/word.png";
const hrSharepointImage = "/images/fr/scenario5/sharepoint.png";

export const scenario5: Scenario = {
  id: "ransomware-cv-attachment",
  title: "Le CV qui cachait autre chose",
  description:
    "L'entreprise Peashooter&Co est en crise. Depuis ce matin, plusieurs dossiers du service RH sont devenus illisibles. Les fichiers ont changé de nom, certains documents ne s'ouvrent plus, et un message de rançon est apparu sur plusieurs postes.\n\nLe service informatique pense à une attaque par ransomware. Le service RH, lui, ne comprend pas. D'après Léa, chargée de recrutement, elle n'a rien installé de particulier. Elle affirme que la dernière chose qu'elle ait faite avant l'attaque est d'avoir seulement ouvert une candidature reçue par mail pour une offre urgente publiée quelques jours plus tôt.\n\nAucun compte administrateur ne semble avoir été forcé. Aucune intrusion directe sur les serveurs n'est détectée. Pourtant, l'attaque a bien commencé quelque part.",
  globalAttackScenario:
    "Mode opératoire probable : l'attaquant a commencé par étudier l'offre d'emploi publiée par Peashooter&Co. Il y a trouvé le nom du recruteur, son adresse, le contexte du recrutement et l'urgence du besoin.\n\nIl a ensuite envoyé une fausse candidature très crédible, construite pour correspondre exactement au poste. Le fichier joint ne contenait pas seulement un CV : il demandait d'activer du contenu dangereux. Une fois cette action réalisée, le poste de Léa a probablement été compromis.\n\nL'attaque s'est ensuite propagée aux dossiers RH auxquels le compte avait accès. Les droits trop larges, les partages mal organisés et la synchronisation des fichiers ont augmenté l'impact jusqu'au chiffrement de nombreux documents.\n\nConclusion de l'enquête : l'attaque ne s'est pas présentée comme une menace. Elle s'est présentée comme une opportunité de recrutement. C'est précisément ce qui la rendait dangereuse.\n\nBon réflexe à retenir\n\nNe jamais activer les macros ou le contenu actif d'un document reçu par email sans vérification. Se méfier des pièces jointes inhabituelles, utiliser des plateformes de recrutement sécurisées, vérifier les candidats et limiter les droits d'accès aux dossiers sensibles.",
  questions: [
    {
      id: "overly-detailed-job-ad",
      title: "L'annonce qui parlait trop",
      instruction:
        "Avant de regarder le CV, vous retournez à la source. L'offre d'emploi publiée par Peashooter&Co semble classique. Mais parfois, une annonce ne parle pas seulement aux candidats.",
      attackScenario:
        "Une offre d'emploi doit attirer des candidats. Mais ici, elle attire aussi des regards indésirables.\n\nL'annonce donne un nom, une adresse, un contexte, une urgence et du vocabulaire métier. Pour un attaquant, c'est presque une fiche de préparation. Il ne sait pas encore comment entrer, mais il sait déjà à qui écrire, quand le faire et quel ton utiliser.",
      image: jobOfferImage,
      imageWidth: 1448,
      imageHeight: 1086,
      hotspots: [
        {
          id: "recruiter-name-visible",
          x: 1060,
          y: 685,
          width: 230,
          height: 35,
          label: "Nom du recruteur visible",
          explanation:
            "Le nom de la personne chargée du recrutement est affiché publiquement. Un attaquant peut donc cibler directement la bonne personne au lieu d'envoyer une attaque générale.",
        },
        {
          id: "direct-email-address",
          x: 1080,
          y: 740,
          width: 270,
          height: 35,
          label: "Adresse email directe",
          explanation:
            "L'adresse professionnelle du recruteur est visible. Cela facilite l'envoi d'un phishing ciblé directement dans sa boîte mail.",
        },
        {
          id: "urgent-hiring-pressure",
          x: 965,
          y: 145,
          width: 400,
          height: 150,
          label: "Urgence du recrutement",
          explanation:
            "L'annonce insiste sur le caractère urgent du recrutement. Un attaquant peut exploiter cette pression pour envoyer une candidature qui sera ouverte rapidement.",
        },
        
        {
          id: "urgent-hiring-pressure-2",
          x: 60,
          y: 155,
          width: 280,
          height: 50,
          label: "Urgence du recrutement (2)",
          explanation:
            "L'annonce insiste sur le caractère urgent du recrutement. Un attaquant peut exploiter cette pression pour envoyer une candidature qui sera ouverte rapidement.",
        },
        
        {
          id: "urgent-hiring-pressure-3",
          x: 60,
          y: 880,
          width: 720,
          height: 120,
          label: "Urgence du recrutement (3)",
          explanation:
            "L'annonce insiste sur le caractère urgent du recrutement. Un attaquant peut exploiter cette pression pour envoyer une candidature qui sera ouverte rapidement.",
        },
        {
          id: "team-details-visible",
          x: 970,
          y: 345,
          width: 380,
          height: 90,
          label: "Détails précis sur l'équipe",
          explanation:
            "Plus l'annonce donne de détails sur l'équipe, le projet ou l'organisation interne, plus l'attaquant peut adapter son discours.",
        },
      ],
    },
    {
      id: "perfect-candidate-email",
      title: "Le candidat trop parfait",
      instruction:
        "Léa vous montre le mail reçu la veille de l'incident. Le profil semble correspondre exactement au poste. Un peu trop exactement, peut-être.",
      attackScenario:
        "Le mail ressemble à une candidature idéale. Et c'est justement le problème.\n\nL'attaquant ne cherche pas à envoyer un message grossier. Il cherche à produire un document que le service RH aura envie d'ouvrir. Dans le recrutement, recevoir des fichiers est normal. Le piège se cache donc dans une action quotidienne.",
      image: candidateEmailImage,
      imageWidth: 1448,
      imageHeight: 1086,
      hotspots: [
        {
          id: "suspicious-attachment",
          x: 38,
          y: 288,
          width: 468,
          height: 72,
          label: "Pièce jointe suspecte",
          explanation:
            "Le CV est envoyé dans un format inhabituel ou risqué, comme un fichier compressé, un document avec macros ou un nom de fichier étrange.",
        },
        {
          id: "shortened-portfolio-link",
          x: 30,
          y: 727,
          width: 250,
          height: 35,
          label: "Lien de portfolio raccourci",
          explanation:
            "Un lien raccourci masque la destination réelle. Il peut rediriger vers un faux site, une page de téléchargement ou une page de vol d'identifiants.",
        },
        {
          id: "quick-opening-request",
          x: 35,
          y: 870,
          width: 820,
          height: 40,
          label: "Demande d'ouverture rapide",
          explanation:
            "Le candidat rappelle l'urgence du poste pour l'entreprise et son urgence à lui avec de nombreuses candidatures dans d'autres entreprises. Il insiste donc pour que le dossier soit consulté rapidement. Cette pression peut pousser le recruteur à ouvrir le fichier sans vérification.",
        },
        {
          id: "too-perfect-profile",
          x: 30,
          y: 470,
          width: 890,
          height: 160,
          label: "Profil parfait",
          explanation:
            "Le message reprend exactement les besoins de l'entreprise, ce qui, en si peu de temps de recherche, est suspect. C'est un profil parfait qui est disponible dès maintenant. Cela donne donc une pression supplémentaire au RH, qui voit un gros gain potentiel.",
        },
      ],
    },
    {
      id: "trusted-document-request",
      title: "Le document qui demandait la confiance",
      instruction:
        "Le fichier joint n'affichait pas immédiatement le CV. Léa se souvient d'un message technique à l'ouverture du document. Vous examinez cette pièce comme on examine une serrure forcée.",
      attackScenario:
        "Le document ne demandait pas seulement à être lu. Il demandait une permission.\n\nEt cette permission a probablement transformé un simple fichier RH en point d'entrée. L'attaque ne commence pas toujours avec un mot de passe volé. Parfois, elle commence avec un bouton cliqué trop vite.",
      image: wordDocumentImage,
      imageWidth: 1536,
      imageHeight: 1024,
      hotspots: [
        {
          id: "enable-content-request",
          x: 0,
          y: 212,
          width: 1536,
          height: 45,
          label: "Demande d'activation du contenu",
          explanation:
            "Un document qui demande d'activer les macros ou le contenu actif peut exécuter des actions dangereuses sur le poste.",
        },
        {
          id: "display-issue-pretext",
          x: 405,
          y: 385,
          width: 735,
          height: 420,
          label: "Message prétexte sur l'affichage",
          explanation:
            "Le fichier prétend que le document est mal affiché ou protégé. Ce prétexte sert à pousser l'utilisateur à cliquer.",
        },
      ],
    },
    {
      id: "overly-permissive-hr-folder",
      title: "Le dossier RH trop généreux",
      instruction:
        "Les employés de Peashooter&Co vous montrent leur cloud corrompu afin que vous puissiez voir l'ampleur des dégâts de l'attaque. Vous inspectez maintenant les espaces auxquels le compte de Léa avait accès.",
      attackScenario:
        "Le fichier piégé a peut-être ouvert la première porte. Mais les droits trop larges ont ouvert tout le couloir.\n\nUn ransomware devient plus dangereux lorsqu'un compte utilisateur peut atteindre beaucoup de documents. Le problème n'est donc pas seulement le CV. Le problème, c'est aussi ce que le poste RH pouvait toucher une fois infecté.",
      image: hrSharepointImage,
      imageWidth: 1448,
      imageHeight: 1086,
      hotspots: [
        {
          id: "identity-documents-folder",
          x: 245,
          y: 635,
          width: 245,
          height: 50,
          label: "Dossier \"Pièces d'identité\" visible",
          explanation:
            "Des documents très sensibles sont accessibles depuis cet espace sans verrouillage par un mot de passe. Si le compte est compromis, ces données peuvent être volées ou chiffrées.",
        },
        {
          id: "employee-contracts-folder",
          x: 245,
          y: 575,
          width: 250,
          height: 50,
          label: "Dossier \"Contrats salariés\" visible",
          explanation:
            "Les contrats contiennent des informations personnelles et professionnelles. Ils ne devraient pas être accessibles trop largement et sans mot de passe.",
        },
        {
          id: "whole-company-access",
          x: 1055,
          y: 260,
          width: 300,
          height: 50,
          label: "Accès \"Toute l'entreprise\"",
          explanation:
            "Le dossier est partagé avec trop de personnes. Plus il y a d'accès, plus l'impact d'un compte compromis est important.",
        },
        {
          id: "external-edit-access",
          x: 1055,
          y: 355,
          width: 360,
          height: 70,
          label: "Compte externe avec droit de modification",
          explanation:
            "Un prestataire ou compte externe peut modifier les fichiers. Ce droit doit être limité et contrôlé.",
        },
        {
          id: "anyone-link-can-edit",
          x: 1055,
          y: 485,
          width: 350,
          height: 60,
          label: "Lien \"Toute personne avec le lien peut modifier\"",
          explanation:
            "Ce type de lien est dangereux. Si le lien circule, n'importe qui peut accéder ou modifier le dossier.",
        },
        {
          id: "no-expiration-link",
          x: 1055,
          y: 605,
          width: 250,
          height: 50,
          label: "Lien sans date d'expiration",
          explanation:
            "Un partage sans expiration reste actif longtemps, même lorsque le besoin initial a disparu.",
        },
        {
          id: "download-allowed",
          x: 1055,
          y: 690,
          width: 255,
          height: 50,
          label: "Téléchargement autorisé",
          explanation:
            "Si le téléchargement est autorisé, un attaquant peut facilement copier les documents hors de l'entreprise.",
        },
      ],
    },
  ],
};
