import type { Scenario } from '../../../../src/types/GameData';

export const scenario3: Scenario = {
  "id": "director-voice-fraud",
  "title": "La voix de la directrice fantôme",
  "description": "L’entreprise PepsCorp est en état d’alerte. Selon les employés présents sur site, la comptable Claire Martin aurait effectué un virement urgent vers un nouveau RIB fournisseur après avoir reçu un appel de la directrice elle-même.\n\nLe problème, c’est que la directrice affirme n’avoir jamais passé cet appel. Elle était en congé à l’étranger au moment des faits et dit ne pas avoir eu accès à son téléphone professionnel pendant plusieurs heures.\n\nClaire est persuadée d’avoir suivi une consigne officielle. Aucun logiciel malveillant n’a été détecté sur le poste de la comptable. Aucun compte administrateur ne semble avoir été compromis.",
  "difficulty": 2,
  "globalAttackScenario": "Mode opératoire probable : l’attaquant a commencé par collecter des informations publiques sur la directrice de PepsCorp. Une publication lui a appris que la dirigeante était en déplacement, à l’étranger, et donc potentiellement moins joignable.\n\nIl a ensuite appelé la comptable en se faisant passer pour elle. Le scénario était simple mais efficace : mauvaise connexion, urgence, confidentialité, virement fournisseur et contournement exceptionnel de la procédure.\n\nPendant l’appel, il a envoyé un email contenant une facture et un nouveau RIB pour donner du poids à sa demande. Une fois le virement effectué, il a envoyé un dernier message de confirmation afin de rassurer la comptable et retarder les vérifications.",
  "goodPractices": "Toute demande de virement, de changement de RIB ou de paiement urgent doit être vérifiée par un canal indépendant et officiel. Il faut refuser les contournements de procédure, même lorsqu’ils semblent venir d’un supérieur hiérarchique.\n\nEn cas de doute, il faut suspendre l’action, contacter la personne via un numéro connu, prévenir un responsable et signaler la tentative.",
  "questions": [
    {
      "id": "director-public-trip-post",
      "title": "La carte postale numérique",
      "instruction": "Avant d’interroger les systèmes, vous commencez par vérifier les informations publiques de l’entreprise. En commençant par la dernière publication de la directrice.",
      "attackScenario": "La publication de la directrice voulait simplement montrer un moment de voyage. Mais dans le carnet d’un attaquant, elle devient une fiche de renseignement énorme. Elle révèle une absence, un contexte, des responsabilités et parfois même les personnes à cibler.",
      "image": "/images/fr/scenario3/linkedin_post.png",
      "imageWidth": 708,
      "imageHeight": 780,
      "hotspots": [
        {
          "id": "director-absence-dates",
          "x": 420,
          "y": 205,
          "width": 180,
          "height": 40,
          "label": "Dates de vacances visibles",
          "explanation": "Les dates d’absence de la directrice sont publiques. Un attaquant peut s’en servir pour savoir quand il sera difficilement joignable."
        },
        {
          "id": "director-trip-location",
          "x": 15,
          "y": 245,
          "width": 110,
          "height": 40,
          "label": "Lieu de vacances visible",
          "explanation": "La localisation donne du contexte à l’attaquant. Il peut adapter son prétexte, parler de décalage horaire, de déplacement ou d’impossibilité d’appeler longtemps."
        },
        {
          "id": "director-replacement-person",
          "x": 15,
          "y": 345,
          "width": 635,
          "height": 110,
          "label": "Nom de la personne remplaçante",
          "explanation": "Le post indique qui gère certains sujets pendant l’absence de la directrice. Une piste directe vers la bonne cible."
        }
      ]
    },
    {
      "id": "fake-director-call-transcript",
      "title": "La voix qui pressait le pas",
      "instruction": "Comme la comptable dit avoir reçu un appel de la directrice, vous regardez donc son historique d’appel pour voir la retranscription texte de l’appel. Elle affirme avoir reconnu le ton de la directrice.",
      "attackScenario": "L’attaquant utilise l’absence de la directrice, l’urgence, la confidentialité et l’autorité hiérarchique. Il pousse une personne à agir contre la procédure, en lui donnant l’impression d’aider son responsable et de bien faire les choses.",
      "image": "/images/fr/scenario3/discussion.png",
      "imageWidth": 1103,
      "imageHeight": 1426,
      "hotspots": [
        {
          "id": "call-bad-connection-pretext",
          "x": 175,
          "y": 245,
          "width": 780,
          "height": 95,
          "label": "Prétexte de mauvaise connexion",
          "explanation": "La supposée directrice explique qu’il appelle depuis l’étranger avec peu de réseau. Cela justifie un appel court et limite les possibilités de vérification."
        },
        {
          "id": "call-big-gain-pressure",
          "x": 175,
          "y": 620,
          "width": 790,
          "height": 75,
          "label": "Gros gain",
          "explanation": "Pression forte sur la comptable car gros gain possible."
        },
        {
          "id": "call-urgent-request",
          "x": 175,
          "y": 705,
          "width": 500,
          "height": 50,
          "label": "Urgence forte",
          "explanation": "La demande doit être traitée rapidement. L’urgence est utilisée pour empêcher la victime de prendre le temps de vérifier."
        },
        {
          "id": "call-big-loss-pressure",
          "x": 175,
          "y": 750,
          "width": 400,
          "height": 50,
          "label": "Grosse perte",
          "explanation": "Pression supplémentaire car grosse perte si elle ne fait pas ce qu’il faut."
        },
        {
          "id": "call-sensitive-financial-request",
          "x": 175,
          "y": 995,
          "width": 800,
          "height": 115,
          "label": "Demande financière sensible",
          "explanation": "Un virement ou un changement de RIB est une action critique. Elle ne devrait jamais être validée sur un simple appel."
        },
        {
          "id": "call-confidentiality-request",
          "x": 175,
          "y": 1260,
          "width": 820,
          "height": 75,
          "label": "Demande de confidentialité",
          "explanation": "L’attaquant isole la victime en lui demandant de ne prévenir personne. Moins il y a de témoins, plus le piège a de chances de fonctionner."
        },
        {
          "id": "call-hierarchical-pressure-confirmation",
          "x": 175,
          "y": 1325,
          "width": 805,
          "height": 62,
          "label": "Ton hiérarchique et Confirmation demandée après action",
          "explanation": "L’attaquant utilise l’autorité supposée de la directrice pour réduire la capacité de la comptable à questionner la demande. / L’attaquant veut savoir quand l’opération est terminée. Cela lui permet de suivre l’avancement de la fraude."
        }
      ]
    },
    {
      "id": "urgent-invoice-with-new-rib",
      "title": "La facture tombée pendant l’appel",
      "instruction": "La comptable vous montre le mail qu’elle a reçu pendant l’appel. Le timing semble confirmer les paroles de la directrice pendant l’appel.",
      "attackScenario": "Le mail arrive comme une preuve, mais il joue surtout le rôle d’un accessoire. Il donne une forme administrative à l’ordre téléphonique.\n\nL’attaquant sait qu’une demande orale peut sembler fragile. Il ajoute donc une facture, un RIB, une pièce jointe, un ton professionnel ce qui rend l’histoire plus solide.",
      "image": "/images/fr/scenario3/email_phishing.png",
      "imageWidth": 1448,
      "imageHeight": 1086,
      "hotspots": [
        {
          "id": "invoice-suspicious-sender",
          "x": 370,
          "y": 205,
          "width": 380,
          "height": 58,
          "label": "Adresse d’expéditeur suspecte",
          "explanation": "Le nom affiché peut imiter la directrice, mais l’adresse mail ne colle pas. On y voit direct0r au lieu de director."
        },
        {
          "id": "invoice-foreign-rib",
          "x": 330,
          "y": 752,
          "width": 450,
          "height": 55,
          "label": "RIB fournisseur étranger",
          "explanation": "Le RIB du mail vient d’un pays étranger (ici Russie). Une banque, un pays ou un format inattendu doit déclencher une vérification supplémentaire."
        },
        {
          "id": "invoice-unprofessional-file-name",
          "x": 360,
          "y": 315,
          "width": 400,
          "height": 58,
          "label": "Facture avec nom non professionnel",
          "explanation": "La facture en pièce jointe dans le mail n’a pas l’air professionnelle. Le nom paraît bâclé."
        },
        {
          "id": "invoice-wrong-copyright",
          "x": 330,
          "y": 1005,
          "width": 420,
          "height": 48,
          "label": "Copyright mauvais",
          "explanation": "Le mail essaye de paraître professionnel avec un faux copyright mal daté."
        }
      ]
    },
    {
      "id": "fraud-confirmation-email",
      "title": "La confirmation qui referme le piège",
      "instruction": "Après le virement, la comptable aurait reçu un dernier message dans sa boîte mail.",
      "attackScenario": "Le dernier message sert à calmer la victime. Il donne l’impression que l’opération est terminée, validée, maîtrisée. En réalité, il permet surtout à l’attaquant de gagner du temps.",
      "image": "/images/fr/scenario3/mail_phishing_2.png",
      "imageWidth": 1448,
      "imageHeight": 1086,
      "hotspots": [
        {
          "id": "confirmation-vague-subject",
          "x": 302,
          "y": 135,
          "width": 250,
          "height": 50,
          "label": "Confirmation vague",
          "explanation": "Un message remerciement bâclé l’attaquant ayant déjà reçu les virement, il essaye de rassurer la victime mais sans mettre beaucoup d’effort car le butin est déjà dans sa poche"
        },
        {
          "id": "confirmation-suspicious-sender",
          "x": 370,
          "y": 205,
          "width": 450,
          "height": 58,
          "label": "Adresse d’expéditeur suspecte",
          "explanation": "Encore une fois, le nom affiché peut imiter la directrice, mais l’adresse mail ne colle pas. On y voit direct0r au lieu de director."
        },
        {
          "id": "confirmation-informal-text",
          "x": 300,
          "y": 330,
          "width": 550,
          "height": 300,
          "label": "Texte informel",
          "explanation": "Remerciements informels et texte peu professionnel. Cela montre que le mail a été fait rapidement et que rien n’était formel."
        },
        {
          "id": "confirmation-different-logo",
          "x": 315,
          "y": 835,
          "width": 180,
          "height": 75,
          "label": "Logo différent",
          "explanation": "Le logo du 2e mail est différent de celui du premier. Cela montre que les logos et les emails sont brouillon et fait rapidement."
        },
        {
          "id": "confirmation-copyright",
          "x": 500,
          "y": 840,
          "width": 450,
          "height": 45,
          "label": "Copyright",
          "explanation": "Encore une fois ici, l’email essaye de paraître professionnel avec un faux copyright mal daté."
        }
      ]
    }
  ]
};
