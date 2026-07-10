import type { Scenario } from '../../../../src/types/GameData';

export const scenario6: Scenario = {
  "id": "fake-it-support",
  "title": "Le support informatique",
  "description": "L’entreprise Esquie a détecté plusieurs connexions inhabituelles sur des comptes internes. Le plus étrange, c’est que les comptes concernés étaient protégés par double authentification.\n\nLes victimes affirment ne jamais avoir donné leur mot de passe. Elles disent même qu’un service informatique les a aidées à mieux sécuriser leur compte pour contrer une faille de sécurité.\n\nElles disent seulement avoir reçu une alerte de sécurité, puis avoir été contactées par une personne se présentant comme le support informatique.\n\nLe service informatique officiel n’a pourtant ouvert aucun ticket ce jour-là. Aucun technicien n’était chargé d’appeler les employés. Et pourtant, quelqu’un a réussi à entrer.\n\nVous serez épaulé par une des victimes de l’attaque : Jérôme.",
  "globalAttackScenario": "L’attaquant a commencé par envoyer une fausse alerte de sécurité pour créer l’inquiétude. Ensuite, il a contacté les victimes en se faisant passer pour le support informatique, exactement au moment où elles s’attendaient à recevoir de l’aide.\n\nIl a ensuite demandé ou provoqué des validations MFA. La protection n’a pas été cassée : elle a été validée par l’utilisateur sous pression. Une fois connecté, l’attaquant a modifié les règles de messagerie pour recevoir certains emails et masquer ses traces.",
  "goodPractices": "Ne jamais communiquer un code de double authentification et ne jamais valider une demande de connexion que l’on n’a pas initiée. En cas de doute, contacter le support par un canal officiel connu, jamais depuis un lien ou un message reçu.",
  "questions": [
    {
      "id": "security-alert-setup",
      "title": "L’alerte qui préparait le terrain",
      "instruction": "Jérôme vous montre le message reçu le matin de l’incident signalant une activité inhabituelle sur son compte.",
      "attackScenario": "Le mail ne vole pas encore le compte. Il installe une inquiétude.\n\nLa victime pense qu’un problème de sécurité est déjà en cours. À partir de là, tout message venant d’un prétendu support paraît plus crédible.",
      "image": "/images/fr/scenario6/mail_connexion.png",
      "imageWidth": 1535,
      "imageHeight": 1024,
      "hotspots": [
        {
          "id": "suspicious-sender-address",
          "x": 300,
          "y": 295,
          "width": 1200,
          "height": 45,
          "label": "Adresse d’expéditeur suspecte",
          "explanation": "Le nom affiché imite le support Microsoft, mais ce n’est clairement pas l’adresse réelle."
        },
        {
          "id": "account-lock-threat",
          "x": 300,
          "y": 345,
          "width": 1000,
          "height": 40,
          "label": "Menace de blocage du compte",
          "explanation": "La peur de perdre son accès pousse l’utilisateur à agir vite. C’est une pression psychologique classique."
        },
        {
          "id": "doubtful-verification-link",
          "x": 585,
          "y": 785,
          "width": 220,
          "height": 45,
          "label": "Lien de vérification douteux",
          "explanation": "Un lien reçu par email ne doit pas être utilisé pour vérifier un compte sensible. Il faut passer par le site officiel ou le portail interne."
        },
        {
          "id": "immediate-validation-request",
          "x": 390,
          "y": 840,
          "width": 630,
          "height": 80,
          "label": "Demande de validation immédiate",
          "explanation": "L’urgence réduit le temps de réflexion et augmente le risque d’erreur."
        },
        {
          "id": "approximate-layout",
          "x": 380,
          "y": 395,
          "width": 600,
          "height": 360,
          "label": "Logo ou mise en page approximatif",
          "explanation": "Un faux message peut reprendre l’apparence d’un service officiel, mais certains détails visuels peuvent trahir la copie."
        }
      ]
    },
    {
      "id": "helpful-fake-technician",
      "title": "Le technicien trop serviable",
      "instruction": "Quelques minutes après l’alerte, les employés auraient reçu des messages privés de la part des SI. Vous regardez donc cette discussion.",
      "attackScenario": "Le faux support ne casse pas la sécurité. Il demande à la victime de l’aider à la contourner.\n\nLe costume est simple : un logo, un vocabulaire technique, un ton assuré. Avec cela, il essaye d’obtenir une validation que seul l’utilisateur peut donner.",
      "image": "/images/fr/scenario6/teams_chat.png",
      "imageWidth": 1672,
      "imageHeight": 941,
      "hotspots": [
        {
          "id": "external-or-unverified-account",
          "x": 500,
          "y": 75,
          "width": 850,
          "height": 125,
          "label": "Compte externe ou non vérifié",
          "explanation": "Un support interne doit être clairement identifiable. Un compte externe, récent ou mal nommé doit être vérifié."
        },
        {
          "id": "no-official-ticket",
          "x": 590,
          "y": 440,
          "width": 640,
          "height": 90,
          "label": "Absence de ticket officiel",
          "explanation": "Une intervention support sérieuse doit être tracée. Sans numéro de ticket, la demande doit être considérée comme suspecte."
        },
        {
          "id": "mfa-code-request",
          "x": 590,
          "y": 680,
          "width": 600,
          "height": 70,
          "label": "Demande de code MFA",
          "explanation": "Un code de double authentification est personnel. Il ne doit jamais être communiqué, même au support informatique."
        },
        {
          "id": "time-pressure",
          "x": 590,
          "y": 580,
          "width": 560,
          "height": 75,
          "label": "Pression temporelle",
          "explanation": "Le faux technicien insiste sur la rapidité pour éviter que l’utilisateur contacte le vrai support."
        },
        {
          "id": "stay-in-chat-request",
          "x": 590,
          "y": 275,
          "width": 550,
          "height": 45,
          "label": "Demande de rester dans la conversation",
          "explanation": "L’attaquant cherche à garder la victime occupée et à empêcher toute vérification externe."
        }
      ]
    },
    {
      "id": "hidden-mailbox-rules",
      "title": "Les règles cachées de la boîte mail",
      "instruction": "Jérôme aurait donné le code de connexion MFA à ce service IT fictif. Le pirate a donc eu accès à toute la boite mail de l’employé. Pourtant, à vue d’œil, vous ne remarquez rien d’anormal. Vous vous baladez sur la boite mail de Jérôme et allez dans les paramètres du compte.",
      "attackScenario": "L’accès initial n’était qu’un début. Une fois entré, l’attaquant a préparé le silence.\n\nLire, transférer, supprimer, masquer : la boîte mail devient un poste d’écoute. L’absence de bruit ne veut pas dire absence d’intrus.",
      "image": "/images/fr/scenario6/regles_mail.png",
      "imageWidth": 1448,
      "imageHeight": 1086,
      "hotspots": [
        {
          "id": "invoice-forwarding-to-external-mailbox",
          "x": 690,
          "y": 645,
          "width": 610,
          "height": 135,
          "label": "Transfert des factures vers une boite mail externe",
          "explanation": "Un transfert des mails de factures ou de paiements vers une adresse inconnue est extrêmement dangereux. Le pirate voulait avoir accès aux document interne sur le long terme discrètement."
        },
        {
          "id": "unknown-external-address",
          "x": 690,
          "y": 495,
          "width": 610,
          "height": 125,
          "label": "Transfert vers une adresse externe inconnue",
          "explanation": "Un transfert automatique des mails vers une adresse inconnue. Le pirate voulait avoir accès aux document interne sur le long terme discrètement."
        },
        {
          "id": "silent-read-and-automatic-deletion",
          "x": 690,
          "y": 350,
          "width": 610,
          "height": 125,
          "label": "Messages lus sans action visible et suppression automatique",
          "explanation": "L’attaquant peut supprimer les alertes ou notifications pour masquer ses traces. De plus, ils sont marquéss comme « lu » pour que l’utilisateur soit moins notifié de ces actions"
        }
      ]
    }
  ]
};
