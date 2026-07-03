import type { Scenario } from '../../../../src/types/GameData';

const teamsChannelImage = "/images/fr/scénario7/teams.png";
const teamsMembersImage = "/images/fr/scénario7/teams_list.png";
const sharepointDocumentImage = "/images/fr/scénario7/sharepoint.png";
const phishingEmailImage = "/images/fr/scénario7/mail.png";

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
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Canal marqué \"Public\"",
          explanation:
            "Le canal du projet est public alors que c'est un projet privé et confidentiel.",
        },
        {
          id: "too-many-members",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Canal accessible à trop de membres",
          explanation:
            "Un canal trop large augmente le risque qu'une information confidentielle soit lue ou réutilisée.",
        },
        {
          id: "external-guests-present",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Présence d'invités externes",
          explanation:
            "Des invités externes peuvent voir les échanges et documents du canal. Leur présence doit être justifiée et contrôlée.",
        },
        {
          id: "confidential-project-name",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Nom du projet confidentiel dans le canal",
          explanation:
            "Le nom du projet devient sensible si le canal n'est pas strictement réservé aux personnes concernées.",
        },
        {
          id: "external-provider-message",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Message d'un prestataire externe",
          explanation:
            "La présence active d'un prestataire montre que les informations sortent potentiellement du cercle interne.",
        },
        {
          id: "sensitive-document-shared",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
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
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Compte invité externe",
          explanation:
            "Un compte externe dans un canal interne doit être surveillé. Il peut voir les messages et documents partagés.",
        },
        {
          id: "old-provider-still-present",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Ancien prestataire toujours présent",
          explanation:
            "Un prestataire qui n'intervient plus sur le projet ne devrait plus avoir accès aux échanges.",
        },
        {
          id: "same-member-rights",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Droit \"Membre\" identique aux internes",
          explanation:
            "Un invité externe ne devrait pas forcément avoir les mêmes droits de lecture, téléchargement ou partage qu'un salarié.",
        },
        {
          id: "guest-download-allowed",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Téléchargement autorisé pour les invités",
          explanation:
            "Si les invités peuvent télécharger les documents, les fichiers peuvent sortir facilement de l'entreprise.",
        },
        {
          id: "missing-account-owner",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
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
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Lien accessible à toute personne qui le possède",
          explanation:
            "Un lien trop ouvert peut circuler hors du canal sans contrôle réel.",
        },
        {
          id: "edit-allowed",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Modification autorisée",
          explanation:
            "Si trop de personnes peuvent modifier le document, l'attaquant peut altérer son contenu ou y ajouter un lien piégé.",
        },
        {
          id: "no-expiration-date",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Absence de date d'expiration",
          explanation:
            "Un lien permanent reste dangereux longtemps après la fin du besoin.",
        },
        {
          id: "sensitive-document-in-large-channel",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Document sensible partagé dans un canal large",
          explanation:
            "Un document confidentiel ne devrait pas être publié dans un espace accessible à des invités ou à trop d'employés.",
        },
        {
          id: "download-enabled",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Téléchargement autorisé",
          explanation:
            "Si le téléchargement est possible, une personne externe peut conserver une copie du document.",
        },
        {
          id: "no-classification",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
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
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Nom exact du projet",
          explanation:
            "Le mail utilise le vrai nom du projet. Cela donne une impression de légitimité et réduit la méfiance.",
        },
        {
          id: "project-manager-name",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Nom du chef de projet",
          explanation:
            "L'attaquant utilise un nom connu pour donner de l'autorité à la demande.",
        },
        {
          id: "real-calendar-reference",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Référence au calendrier réel",
          explanation:
            "Le message mentionne une date ou une réunion réelle, ce qui rend le piège crédible.",
        },
        {
          id: "external-link",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Lien externe",
          explanation:
            "Malgré le contexte interne, le lien renvoie vers un site extérieur ou inconnu.",
        },
        {
          id: "login-request",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Demande de connexion",
          explanation:
            "Le mail demande de se connecter pour consulter un document. Cela peut être une tentative de vol d'identifiants.",
        },
        {
          id: "urgent-tone",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Ton urgent",
          explanation:
            "L'urgence pousse les employés à cliquer rapidement, surtout si le message semble lié à un vrai projet.",
        },
      ],
    },
  ],
};
