import type { Scenario } from '../../../../src/types/GameData';

export const scenario5: Scenario = {
  "id": "ransomware-cv-attachment",
  "title": "Le recrutement en urgence",
  "description": "L’entreprise Peashooter&Co est en crise. Depuis ce matin, plusieurs dossiers du service RH sont devenus illisibles. Les fichiers ont changé de nom, certains documents ne s’ouvrent plus, et un message de rançon est apparu sur plusieurs postes.\n\nLe service informatique pense à une attaque par ransomware. Le service RH, lui, ne comprend pas. D’après Léa, chargée de recrutement, elle n’a rien installé de particulier. Elle affirme que la dernière chose qu’elle ait faite avant l’attaque est d’avoir travaillé sur le recrutement pour une offre urgente publiée quelques jours plus tôt.\n\nAucun compte administrateur ne semble avoir été forcé. Aucune intrusion directe sur les serveurs n’est détectée.",
  "globalAttackScenario": "Mode opératoire probable : l’attaquant a commencé par étudier l’offre d’emploi publiée par Peashooter&Co. Il y a trouvé le nom du recruteur, son adresse, le contexte du recrutement et l’urgence du besoin.\n\nIl a ensuite envoyé une fausse candidature très crédible, construite pour correspondre exactement au poste. Le fichier joint ne contenait pas seulement un CV : il demandait d’activer du contenu dangereux. Une fois cette action réalisée, le poste de Léa a probablement été compromis.\n\nL’attaque s’est ensuite propagée aux dossiers RH auxquels le compte avait accès. Les droits trop larges, les partages mal organisés et la synchronisation des fichiers ont augmenté l’impact jusqu’au chiffrement de nombreux documents.",
  "goodPractices": "Ne jamais activer les macros ou le contenu actif d’un document reçu par email sans vérification. Se méfier des pièces jointes inhabituelles, utiliser des plateformes de recrutement sécurisées, vérifier les candidats et limiter les droits d’accès aux dossiers sensibles.",
  "questions": [
    {
      "id": "overly-detailed-job-ad",
      "title": "L’annonce qui parlait trop",
      "instruction": "Avant de regarder le CV, vous retournez à la source. L’offre d’emploi publiée par Peashooter&Co semble classique. Mais parfois, une annonce ne parle pas seulement aux candidats.",
      "attackScenario": "Une offre d’emploi doit attirer des candidats. Mais ici, elle attire aussi des regards indésirables.\n\nL’annonce donne un nom, une adresse, un contexte, une urgence et du vocabulaire métier. Pour un attaquant, c’est presque une fiche de préparation. Il ne sait pas encore comment entrer, mais il sait déjà à qui écrire, quand le faire et quel ton utiliser.",
      "image": "/images/fr/scenario5/annonce.png",
      "imageWidth": 1448,
      "imageHeight": 1086,
      "hotspots": [
        {
          "id": "recruiter-name-and-contact-info-visible",
          "x": 1070,
          "y": 685,
          "width": 280,
          "height": 100,
          "label": "Nom et coordonnées du recruteur visibles",
          "explanation": "Le nom et les coordonnées de la personne chargée du recrutement sont affichés publiquement. Une cible directement présentée."
        },
        {
          "id": "urgent-hiring-pressure",
          "x": 965,
          "y": 145,
          "width": 400,
          "height": 150,
          "label": "Urgence du recrutement",
          "explanation": "L’annonce insiste sur le caractère urgent du recrutement. Un attaquant peut exploiter cette pression pour envoyer une candidature qui sera ouverte rapidement."
        },
        {
          "id": "urgent-hiring-pressure-2",
          "x": 60,
          "y": 155,
          "width": 280,
          "height": 50,
          "label": "Urgence du recrutement",
          "explanation": "L’annonce insiste sur le caractère urgent du recrutement. Un attaquant peut exploiter cette pression pour envoyer une candidature qui sera ouverte rapidement."
        },
        {
          "id": "urgent-hiring-pressure-3",
          "x": 60,
          "y": 880,
          "width": 720,
          "height": 120,
          "label": "Urgence du recrutement",
          "explanation": "L’annonce insiste sur le caractère urgent du recrutement. Un attaquant peut exploiter cette pression pour envoyer une candidature qui sera ouverte rapidement."
        },
        {
          "id": "team-details-visible",
          "x": 970,
          "y": 345,
          "width": 380,
          "height": 90,
          "label": "Détails précis sur l’équipe",
          "explanation": "Plus l’annonce donne de détails sur l’équipe, le projet ou l’organisation interne, plus l’attaquant peut adapter son discours."
        }
      ]
    },
    {
      "id": "perfect-candidate-email",
      "title": "Le candidat parfait",
      "instruction": "Léa vous montre le mail reçu la veille de l’incident. Le profil semble correspondre exactement au poste. Un peu trop exactement, peut-être.",
      "attackScenario": "Le mail ressemble à une candidature idéale. Et c’est justement le problème.\n\nL’attaquant cherche à produire un document que le service RH aura envie d’ouvrir. Dans le recrutement, recevoir des fichiers est normal. Le piège se cache donc dans une action quotidienne.",
      "image": "/images/fr/scenario5/mail.png",
      "imageWidth": 1448,
      "imageHeight": 1086,
      "hotspots": [
        {
          "id": "suspicious-attachment",
          "x": 38,
          "y": 288,
          "width": 468,
          "height": 72,
          "label": "Pièce jointe suspecte",
          "explanation": "Le CV est envoyé dans un format inhabituel ou risqué, comme un fichier compressé, un document avec un nom de fichier anormal."
        },
        {
          "id": "shortened-portfolio-link",
          "x": 30,
          "y": 727,
          "width": 250,
          "height": 35,
          "label": "Lien de portfolio raccourci",
          "explanation": "Un lien raccourci masque la destination réelle. Il peut rediriger vers un faux site, une page de téléchargement ou une page de vol d’identifiants."
        },
        {
          "id": "quick-opening-request",
          "x": 35,
          "y": 870,
          "width": 820,
          "height": 40,
          "label": "Demande d’ouverture rapide",
          "explanation": "Le candidat rappelle l’urgence du poste pour l’entreprise et son urgence à lui avec d’autres nombreuses candidatures dans d’autres entreprises. Il insiste donc pour que le dossier soit consulté rapidement."
        }
      ]
    },
    {
      "id": "trusted-document-request",
      "title": "Le document qui demandait la confiance",
      "instruction": "En vous montrant le CV reçu, Léa vous dit que le fichier joint n’affichait pas immédiatement le CV. Elle vous montre un message technique à l’ouverture du document.",
      "attackScenario": "Le document ne demandait pas seulement à être lu. Il demandait une permission.\n\nEt cette permission a probablement transformé un simple fichier RH en point d’entrée sur l’ordinateur de la victime.",
      "image": "/images/fr/scenario5/word.png",
      "imageWidth": 1536,
      "imageHeight": 1024,
      "hotspots": [
        {
          "id": "enable-content-request",
          "x": 0,
          "y": 212,
          "width": 1536,
          "height": 45,
          "label": "Demande d’activation du contenu",
          "explanation": "Un document qui demande d’activer les macros ou le contenu actif peut exécuter des actions dangereuses sur le poste."
        },
        {
          "id": "display-issue-pretext",
          "x": 405,
          "y": 385,
          "width": 735,
          "height": 420,
          "label": "Message prétexte sur l’affichage",
          "explanation": "Le fichier prétend que le document est mal affiché ou protégé. Ce prétexte sert à pousser l’utilisateur à cliquer."
        }
      ]
    },
    {
      "id": "overly-permissive-hr-folder",
      "title": "Le dossier RH trop généreux",
      "instruction": "Les employés de Peashooter&Co vous montrent leur cloud corrompu afin que vous puissiez voir l’ampleur des dégâts de l’attaque. Vous inspectez maintenant les espaces auxquels le compte de Léa avait accès.",
      "attackScenario": "Le fichier piégé a peut-être ouvert la première porte. Mais les droits trop larges ont ouvert tout le couloir.\n\nUn ransomware devient plus dangereux lorsqu’un compte utilisateur peut atteindre beaucoup de documents. Le problème n’est donc pas seulement le CV. Le problème, c’est aussi ce que le poste RH pouvait toucher une fois infecté.",
      "image": "/images/fr/scenario5/sharepoint.png",
      "imageWidth": 1448,
      "imageHeight": 1086,
      "hotspots": [
        {
          "id": "whole-company-access-all-folders",
          "x": 550,
          "y": 455,
          "width": 140,
          "height": 390,
          "label": "Toute l’entreprise à accès à tout",
          "explanation": "Tous les dossiers sont en accès libre par l’entreprise. Ces derniers devraient être limités à certaines personnes"
        },
        {
          "id": "subfolders-inherit-permissions",
          "x": 190,
          "y": 870,
          "width": 745,
          "height": 110,
          "label": "Les sous dossiers héritent des autorisations",
          "explanation": "Tous les dossiers sont accessibles mais en plus, les sous dossiers le sont automatiquement aussi. Le parcours de documents sensibles est extrêmement simple pour n’importe qui"
        },
        {
          "id": "subfolders-inherit-permissions-2",
          "x": 970,
          "y": 770,
          "width": 450,
          "height": 120,
          "label": "Les sous dossiers héritent des autorisations",
          "explanation": "Tous les dossiers sont accessibles mais en plus, les sous dossiers le sont automatiquement aussi. Le parcours de documents sensibles est extrêmement simple pour n’importe qui"
        },
        {
          "id": "whole-company-access",
          "x": 980,
          "y": 255,
          "width": 300,
          "height": 50,
          "label": "“Toute l’entreprise” lecture",
          "explanation": "Le dossier peut être lu par trop de personnes. Plus il y a d’accès, plus l’impact d’un compte compromis est important."
        },
        {
          "id": "external-edit-access",
          "x": 980,
          "y": 355,
          "width": 370,
          "height": 70,
          "label": "Compte externe avec droit de modification",
          "explanation": "Un prestataire ou compte externe peut modifier les fichiers. Ce droit doit être limité et contrôlé."
        },
        {
          "id": "anyone-link-can-edit",
          "x": 980,
          "y": 475,
          "width": 360,
          "height": 60,
          "label": "Lien “Toute personne avec le lien peut modifier”",
          "explanation": "Ce type de lien est dangereux. Si le lien circule, n’importe qui peut accéder ou modifier le dossier."
        },
        {
          "id": "no-expiration-link",
          "x": 980,
          "y": 595,
          "width": 250,
          "height": 50,
          "label": "Lien sans date d’expiration",
          "explanation": "Un partage sans expiration reste actif longtemps, même lorsque le besoin initial a disparu."
        },
        {
          "id": "download-allowed",
          "x": 980,
          "y": 675,
          "width": 255,
          "height": 50,
          "label": "Téléchargement autorisé",
          "explanation": "Si le téléchargement est autorisé, un attaquant peut facilement copier les documents hors de l’entreprise."
        }
      ]
    }
  ]
};
