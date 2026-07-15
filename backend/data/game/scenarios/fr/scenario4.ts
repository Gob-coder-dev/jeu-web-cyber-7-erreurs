import type { Scenario } from '../../../../src/types/GameData';

export const scenario4: Scenario = {
  "id": "commute-security",
  "title": "Le trajet qui avait des oreilles",
  "description": "L’entreprise Crédo Agriculture est en crise. Un document confidentiel présenté lors d’une réunion stratégique avec un prestataire externe nommé Cédric Tset s’est retrouvé entre les mains d’un concurrent quelques jours plus tard.\n\nCédric affirme ne rien avoir transmis volontairement.\n\nLe service informatique ne trouve pas de piratage direct sur les serveurs de Crédo Agriculture. Aucun compte interne ne semble avoir été forcé. Pourtant, le document a bien quitté le cercle de confiance.\n\nVous allez donc retracer les déplacements de Cédric pour découvrir la cause de ce problème.",
  "difficulty": 2,
  "globalAttackScenario": "Mode opératoire probable : l’attaquant a commencé par repérer le déplacement du prestataire grâce à une publication publique.\n\nPendant le trajet, Cédric a travaillé dans un espace public, avec un document confidentiel visible sur son écran. Une personne proche aurait pu lire ou photographier des informations importantes.\n\nArrivé sur place, le prestataire s’est connecté à un réseau Wi-Fi ressemblant à un réseau officiel. Le portail captif lui a ensuite demandé trop d’informations, dont potentiellement des identifiants professionnels.\n\nUne fois le compte compromis, l’attaquant a pu récupérer les documents qu’il voulait sans que les systèmes ne le repèrent.",
  "goodPractices": "En déplacement, évitez d’afficher des documents sensibles dans les lieux publics, utiliser un filtre de confidentialité, vérifier les réseaux Wi-Fi avant de s’y connecter et activer le VPN de l’entreprise.",
  "questions": [
    {
      "id": "metro-complaint-social-post",
      "title": "La plainte du métro sur les réseaux",
      "instruction": "Avant de suivre les déplacements de Cédric, vous commencez par regarder ses réseaux sociaux. Et vous découvrez une de ses publications datant d’il y a 2 semaines.",
      "attackScenario": "Le post voulait simplement se plaindre des transports. Mais pour un attaquant qui veut le traquer, c’est une mine d’or d’information. Il donne un lieu, une date et une cible pour atteindre une entreprise. L’attaquant peut juste aller à cette gare et à attendre Cédric pour le suivre et l’espionner.",
      "image": "/images/fr/scenario4/tweet.png",
      "imageWidth": 822,
      "imageHeight": 976,
      "hotspots": [
        {
          "id": "commute-place-visible",
          "x": 430,
          "y": 100,
          "width": 140,
          "height": 50,
          "label": "Lieu du déplacement visible",
          "explanation": "Cédric annonce clairement qu’il utilise le métro 6, avec l’image en plus, on peut clairement savoir dans quelle station il passe tous les matins et soirs pour le suivre."
        },
        {
          "id": "commute-daily-work-complaint",
          "x": 8,
          "y": 150,
          "width": 600,
          "height": 40,
          "label": "Plainte de ne pas aller travailler",
          "explanation": "Dans son commentaire, il se plaint de ne pas pouvoir aller travailler. On comprend donc qu’il utilise ce transport tous les jours pour aller travailler"
        },
        {
          "id": "tweet-send-time",
          "x": 4,
          "y": 780,
          "width": 230,
          "height": 45,
          "label": "Heure d’envoi",
          "explanation": "On voit clairement avec l’heure d’envoi du tweet que Cédric l’a envoyé pendant son déplacement pour aller au travail. On sait donc quand le retrouver dans les transports"
        }
      ]
    },
    {
      "id": "working-in-public-transport",
      "title": "Le travail dans le train",
      "instruction": "Pour retracer son parcours avant le vol de documents, vous prenez les transports avec Cédric. Pendant ce déplacement, Cédric vous informe qu'il doit absolument travailler parce qu'avec toute cette histoire, il a pris du retard sur ses tâches. Il se met donc à travailler à côté de vous.",
      "attackScenario": "Avec un bon angle de vue, d’un appareil photo ou d’une personne inattentive, un inconnu peut accéder à beaucoup d’informations\n\nLe travail nomade est pratique, mais il transforme parfois les transports en salle de réunion ouverte ou en vol facile. Un document confidentiel affiché dans un train n’est plus seulement entre les mains du prestataire, il est devant tout le wagon.",
      "image": "/images/fr/scenario4/metro.jpg",
      "imageWidth": 4080,
      "imageHeight": 3060,
      "hotspots": [
        {
          "id": "public-transport-visible-screen",
          "x": 1970,
          "y": 200,
          "width": 870,
          "height": 760,
          "label": "Écran visible par les passagers",
          "explanation": "Un ordinateur utilisé dans un lieu public peut exposer des informations à toutes les personnes autour. C’est le principe du shoulder surfing."
        },
        {
          "id": "public-transport-unprotected-bag",
          "x": 2320,
          "y": 1780,
          "width": 900,
          "height": 880,
          "label": "Sac posé par terre non protégé",
          "explanation": "Cédric a posé par terre son sac ouvert pouvant contenir des informations critiques sur son entreprise (des documents de l’entreprise, des disques durs, une tablette…). Une personne malveillante pourrait les voler et récupérer toutes ces informations"
        },
        {
          "id": "public-transport-visible-badge",
          "x": 1750,
          "y": 1920,
          "width": 430,
          "height": 360,
          "label": "Badge employé non rangé",
          "explanation": "Le badge employé de Cédric est complètement visible sur lui. Un inconnu pourrait lui voler son badge, le prendre en photo ou le scanner discrètement pour faire une fausse carte et s’introduire dans l’entreprise"
        }
      ]
    },
    {
      "id": "wrong-wifi-network",
      "title": "La fin du trajet",
      "instruction": "Arrivé sur place, Cédric nous informe qu’il était en retard à sa réunion à cause d’un énième problème de transport. Il dit s’être donc connecté rapidement au Wi-Fi disponible. Vous regardez donc son historique Wi-Fi.",
      "attackScenario": "Un réseau que tout le monde choisit sans réfléchir et qui paraît banal. Cédric étant pressé, il a pris un réseau sans trop prêter attention aux détails et s’est connecté sur un mauvais réseau complètement ouvert.",
      "image": "/images/fr/scenario4/wifi.png",
      "imageWidth": 1448,
      "imageHeight": 1086,
      "hotspots": [
        {
          "id": "wifi-similar-network-names",
          "x": 940,
          "y": 395,
          "width": 250,
          "height": 40,
          "label": "Réseaux Wi-Fi aux noms très proches",
          "explanation": "Plusieurs réseaux ont des noms presque identiques. Un attaquant peut créer un faux réseau ressemblant au vrai pour piéger les utilisateurs pressés."
        },
        {
          "id": "wifi-open-network",
          "x": 940,
          "y": 430,
          "width": 470,
          "height": 120,
          "label": "Réseau non sécurisé",
          "explanation": "Un réseau ouvert ou mal protégé augmente les risques d’interception ou de redirection vers de fausses pages."
        }
      ]
    },
    {
      "id": "fake-wifi-captive-portal",
      "title": "Le portail trop curieux",
      "instruction": "Après avoir choisi le réseau “Crédo Agriculture Free”, Cédric nous dit être tombé sur une page de connexion automatique. Vous regardez donc cette page de connexion.",
      "attackScenario": "Le portail ne voulait pas seulement donner Internet. Il voulait obtenir des informations.\n\nLe prestataire pensait accéder au Wi-Fi. En réalité, même s’il avait accès à internet, le hackeur pouvait manipuler ou lire tout le trafic réseau de son ordinateur et récolter des informations professionnelles et des documents.",
      "image": "/images/fr/scenario4/wifi-phishing.png",
      "imageWidth": 1448,
      "imageHeight": 1086,
      "hotspots": [
        {
          "id": "portal-suspicious-url",
          "x": 470,
          "y": 82,
          "width": 655,
          "height": 40,
          "label": "URL suspecte",
          "explanation": "L’adresse de la page ne correspond pas clairement au lieu de réunion ou à un service officiel. Le lien à rallonge est maladroit."
        },
        {
          "id": "portal-not-secure",
          "x": 300,
          "y": 82,
          "width": 160,
          "height": 40,
          "label": "Absence de HTTPS ou certificat douteux",
          "explanation": "Une page non sécurisée qui demande des informations personnelles ou professionnelles ne doit pas être utilisée."
        },
        {
          "id": "portal-intrusive-form",
          "x": 305,
          "y": 535,
          "width": 830,
          "height": 285,
          "label": "Formulaire trop intrusif",
          "explanation": "Demander une adresse email professionnelle, un téléphone, une entreprise et la fonction dépasse largement le besoin d’un accès Wi-Fi invité."
        },
        {
          "id": "portal-pressing-message",
          "x": 265,
          "y": 320,
          "width": 930,
          "height": 100,
          "label": "Message pressant",
          "explanation": "Un texte qui pousse à se connecter rapidement pour “éviter l’expiration de la session” utilise la pression pour réduire la vigilance."
        }
      ]
    }
  ]
};
