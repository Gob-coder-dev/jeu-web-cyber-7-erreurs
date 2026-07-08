import type { Scenario } from '../../../../src/types/GameData';

const teamsChannelImage = "/images/fr/scenario7/teams.png";
const teamsMembersImage = "/images/fr/scenario7/teams_list.png";
const sharepointDocumentImage = "/images/fr/scenario7/sharepoint.png";
const phishingEmailImage = "/images/fr/scenario7/mail.png";

export const scenario7: Scenario = {
  id: "open-teams-channel",
  title: "Le canal Teams trop ouvert",
  description:
    "L'entreprise MaugaOW a reçu un email de phishing particulièrement crédible. Le message mentionnait le nom exact d'un projet interne, le nom du chef de projet, le calendrier de livraison et même certains détails techniques. Heureusement, personne n'a cliqué sur ce mail suspect, mais tout le monde se demande comment les informations du projet ont pu fuiter.\n\nLes employés sont persuadés que l'attaquant avait accès à des informations internes. Pourtant, aucune intrusion claire n'apparaît dans les serveurs. Aucun compte administrateur ne semble compromis.\n\nLe projet était extrêmement confidentiel et n'était traité que dans une discussion Teams utilisée depuis plusieurs mois pour suivre le projet.\n\nVotre mission, détective : comprendre comment un attaquant a pu construire un phishing aussi précis sans pénétrer directement dans le cœur du système.",
  globalAttackScenario:
    "Mode opératoire probable : l'attaquant n'a pas commencé par attaquer directement les serveurs de MaugaOW. Il a profité d'un canal Teams trop ouvert, dans lequel l'équipe projet partageait des informations sensibles : nom du projet, calendrier, documents, responsables et détails techniques.\n\nUn compte invité ou ancien prestataire, encore présent dans le canal, a pu consulter les échanges et télécharger un document partagé avec des droits trop larges. Ces informations ont ensuite servi à construire un phishing ciblé, beaucoup plus crédible qu'un message générique.\n\nLe mail frauduleux reprenait les vrais noms, les vraies dates et le contexte réel du projet.\n\nConclusion de l'enquête : la fuite ne venait pas d'un piratage spectaculaire, mais d'un excès de confiance dans un espace collaboratif. Le canal Teams était pratique, mais il était devenu trop bavard.\n\nBon réflexe à retenir\n\nLimiter les accès aux canaux de discussion, retirer les anciens invités, contrôler les liens de partage et éviter de publier des informations sensibles dans des espaces trop larges.\n\nUn message qui utilise des informations internes doit aussi être vérifié. Plus un phishing semble personnalisé, plus il peut être dangereux.",
  questions: [
    {
      id: "public-project-channel",
      title: "Le canal privé",
      instruction:
        "Vous commencez par observer le canal utilisé par l'équipe projet. Les messages semblent ordinaires : échanges rapides, documents partagés, décisions de dernière minute. Mais un canal interne peut parfois parler à plus de monde qu'on ne le pense.",
      attackScenario:
        "Le canal ressemble à un espace de travail normal. Justement : c'est ce qui le rend dangereux.\n\nLes équipes y parlent vite, partagent beaucoup, corrigent les problèmes en direct. Mais chaque message peut devenir une pièce de renseignement si le mauvais œil se trouve dans la conversation.",
      image: teamsChannelImage,
      imageWidth: 1672,
      imageHeight: 941,
      hotspots: [
        {
          id: "public-channel",
          x: 1255,
          y: 355,
          width: 110,
          height: 165,
          label: "Canal marqué \"Public\"",
          explanation:
            "Le canal du projet est public alors que c'est un projet privé et confidentiel.",
        },
        {
          id: "too-many-members",
          x: 1255,
          y: 530,
          width: 130,
          height: 55,
          label: "Canal accessible à trop de membres",
          explanation:
            "Un canal trop large augmente le risque qu'une information confidentielle soit lue ou réutilisée.",
        },
        {
          id: "external-guests-present",
          x: 1255,
          y: 600,
          width: 160,
          height: 55,
          label: "Présence d'invités externes",
          explanation:
            "Des invités externes peuvent voir les échanges et documents du canal. Leur présence doit être justifiée et contrôlée.",
        },
        {
          id: "confidential-project-name",
          x: 555,
          y: 70,
          width: 440,
          height: 50,
          label: "Nom du projet confidentiel dans le canal",
          explanation:
            "Le nom du projet devient sensible si le canal n'est pas strictement réservé aux personnes concernées.",
        },
        {
          id: "external-provider-message",
          x: 495,
          y: 620,
          width: 465,
          height: 85,
          label: "Message d'un prestataire externe",
          explanation:
            "La présence active d'un prestataire montre que les informations sortent potentiellement du cercle interne.",
        },
        {
          id: "sensitive-document-shared",
          x: 580,
          y: 450,
          width: 460,
          height: 70,
          label: "Document sensible partagé dans le fil",
          explanation:
            "Un fichier contenant budget, planning ou stratégie ne devrait pas être publié dans un canal trop large.",
        },
      ],
    },
    {
      id: "forgotten-guest",
      title: "L'invité oublié",
      instruction:
        "Vous ouvrez la liste des membres du canal. Les noms s'enchaînent : salariés, responsables, prestataires, invités.",
      attackScenario:
        "Le suspect n'est pas toujours caché dans un virus. Il peut être inscrit dans la liste des membres.\n\nUn invité oublié n'a pas besoin de forcer l'entrée. L'entreprise lui a déjà donné une chaise dans la salle. Et parfois, il suffit d'être présent pour écouter.",
      image: teamsMembersImage,
      imageWidth: 1672,
      imageHeight: 941,
      hotspots: [
        {
          id: "external-guest-account",
          x: 510,
          y: 495,
          width: 415,
          height: 140,
          label: "Compte invité externe",
          explanation:
            "Un compte externe dans un canal interne doit être surveillé. Il peut voir les messages et documents partagés.",
        },
        {
          id: "confidential-project-name",
          x: 555,
          y: 70,
          width: 440,
          height: 50,
          label: "Nom du projet confidentiel dans le canal",
          explanation:
            "Le nom du projet devient sensible si le canal n'est pas strictement réservé aux personnes concernées.",
        },
        {
          id: "old-provider-still-present",
          x: 1280,
          y: 655,
          width: 180,
          height: 50,
          label: "Ancien prestataire toujours présent",
          explanation:
            "Un prestataire qui n'intervient plus sur le projet ne devrait plus avoir accès aux échanges.",
        },
        {
          id: "same-member-rights",
          x: 965,
          y: 495,
          width: 110,
          height: 140,
          label: "Droit \"Membre\" identique aux internes",
          explanation:
            "Un invité externe ne devrait pas forcément avoir les mêmes droits de lecture, téléchargement ou partage qu'un interne/salarié.",
        },
        {
          id: "guest-download-allowed",
          x: 510,
          y: 811,
          width: 440,
          height: 70,
          label: "Trop d'autorisations pour les invités",
          explanation:
            "Si les invités peuvent télécharger les documents et partager des liens, les fichiers peuvent sortir facilement de l'entreprise.",
        },
        {
          id: "missing-account-owner",
          x: 1465,
          y: 500,
          width: 110,
          height: 200,
          label: "Responsable du compte absent",
          explanation:
            "Si personne n'est responsable d'un accès externe, il devient difficile de savoir pourquoi il existe encore.",
        },
      ],
    },
    {
      id: "unlocked-shared-document",
      title: "Le document partagé sans verrou",
      instruction:
        "Le canal contient plusieurs documents. L'un d'eux semble être au centre de l'affaire. Il rassemble les informations utilisées plus tard dans le mail de phishing.",
      attackScenario:
        "Le document n'a pas été arraché de force. Il a été partagé trop largement.\n\nDans une enquête, il faut parfois arrêter de chercher la porte forcée. Ici, la porte était ouverte par configuration : un lien trop permissif, un document trop riche, un canal trop fréquenté.",
      image: sharepointDocumentImage,
      imageWidth: 1672,
      imageHeight: 941,
      hotspots: [
        {
          id: "anyone-with-link-access",
          x: 1430,
          y: 235,
          width: 220,
          height: 80,
          label: "Lien accessible à toute personne qui le possède",
          explanation:
            "Un lien trop ouvert peut circuler hors du canal sans contrôle réel.",
        },
        {
          id: "confidential-project-name",
          x: 290,
          y: 60,
          width: 530,
          height: 50,
          label: "Nom du projet confidentiel dans le SharePoint",
          explanation:
            "Le nom du projet devient sensible si le SharePoint n’est pas strictement réservé aux personnes concernées.",
        },
        {
          id: "edit-allowed",
          x: 1430,
          y: 380,
          width: 220,
          height: 50,
          label: "Modification autorisée",
          explanation:
            "Si trop de personnes peuvent modifier le document, l'attaquant peut altérer son contenu ou y ajouter un lien piégé.",
        },
        
        {
          id: "share-allowed",
          x: 1430,
          y: 535,
          width: 220,
          height: 50,
          label: "Partage autorisé",
          explanation:
            "Si trop de personnes peuvent modifier le document, l'attaquant peut altérer son contenu ou y ajouter un lien piégé.",
        },
        {
          id: "no-expiration-date",
          x: 1430,
          y: 480,
          width: 220,
          height: 50,
          label: "Absence de date d'expiration",
          explanation:
            "Un lien permanent reste dangereux longtemps après la fin du besoin.",
        },
        {
          id: "sensitive-document-in-large-channel",
          x: 320,
          y: 315,
          width: 200,
          height: 45,
          label: "Document sensible partagé dans un canal large",
          explanation:
            "Un document confidentiel ne devrait pas être publié dans un espace accessible à des invités ou à trop d'employés.",
        },
        {
          id: "download-enabled",
          x: 1430,
          y: 435,
          width: 220,
          height: 50,
          label: "Téléchargement autorisé",
          explanation:
            "Si le téléchargement est possible, une personne externe peut conserver une copie du document.",
        },
        {
          id: "no-classification",
          x: 880,
          y: 315,
          width: 90,
          height: 45,
          label: "Absence de classification",
          explanation:
            "Un document sensible non marqué comme confidentiel sera traité comme un document ordinaire.",
        },
      ],
    },
    {
      id: "well-informed-phishing",
      title: "Le phishing trop bien informé",
      instruction:
        "Quelques jours avant le drame, plusieurs employés ont reçu un mail. Il semble venir de quelqu'un qui connaît le projet. Pourtant, il a été spécifiquement donné comme consigne de ne parler du projet que dans le canal Teams. Vous allez donc analyser ce fameux mail.",
      attackScenario:
        "Ce phishing n'est pas crédible par magie. Il est crédible parce qu'il parle la langue de l'entreprise.\n\nL'attaquant connaît les noms, les dates, les documents, les habitudes. Le message paraît interne car il a été nourri par des informations internes trop exposées.",
      image: phishingEmailImage,
      imageWidth: 1672,
      imageHeight: 941,
      hotspots: [
        {
          id: "exact-project-name",
          x: 720,
          y: 230,
          width: 550,
          height: 45,
          label: "Nom exact du projet",
          explanation:
            "Le mail utilise le vrai nom du projet. Cela donne une impression de légitimité et réduit la méfiance.",
        },
        {
          id: "project-manager-name",
          x: 790,
          y: 290,
          width: 350,
          height: 47,
          label: "Nom du chef de projet",
          explanation:
            "L'attaquant utilise un nom connu pour donner de l'autorité à la demande.",
        },
        {
          id: "real-calendar-reference",
          x: 720,
          y: 475,
          width: 500,
          height: 45,
          label: "Référence au calendrier réel",
          explanation:
            "Le message mentionne une date ou une réunion réelle, ce qui rend le piège crédible.",
        },
        {
          id: "login-request-and-link",
          x: 720,
          y: 585,
          width: 450,
          height: 70,
          label: "Demande de connexion et Lien externe",
          explanation:
            "Le mail demande de se connecter pour consulter un document. Cela peut être une tentative de vol d'identifiants. Le lien renvoie vers un site extérieur ou inconnu.",
        },
        {
          id: "urgent-tone",
          x: 720,
          y: 525,
          width: 500,
          height: 45,
          label: "Ton urgent",
          explanation:
            "L'urgence pousse les employés à cliquer rapidement, surtout si le message semble lié à un vrai projet.",
        },
      ],
    },
  ],
};
