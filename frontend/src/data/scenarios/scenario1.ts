import type { Scenario } from "../../types/Scenario";

import linkedinPostImage from "../../image/scenario1/linkedin_post.png";
import desktopImage from "../../image/scenario1/desktop.jpg";

export const scenario1: Scenario = {
  id: "physical-intrusion",
  title: "Intrusion dans les locaux",
  description:
    "L'entreprise Orialys a subi une intrusion discrète. Des données comptables ont été volés et des virements suspects sur le compte de l'entreprise en direction de pays étrangers ont été détectés. Le service informatique ne comprend pas car aucun système de surveillance des comptes n'a identifié d'intrusion ou de virus.\n\nLa seule piste trouvée est que la dernière personne à avoir consulté les dossiers volés est Julien, le nouveau comptable de l'entreprise. Il nie pourtant toutes les accusations. L'entreprise pense donc que son compte a été piraté.",
  globalAttackScenario:
    "Mode opératoire probable : l'attaquant découvre la publication LinkedIn présentant Julien. La photo contient des informations sensibles : un mot de passe visible, le système d'exploitation et même des détails personnels (manga, football, rendez-vous médical). L'attaquant utilise ces informations pour préparer une intrusion physique et quelques jours plus tard pendant le rendez-vous médical de Julien, l'attaquant se présente à la porte de l'entreprise en prétendant être un fournisseur. Il repère le bureau de Julien grâce à la photo LinkedIn et déverouille l'ordinateur avec le mot de passe écrit sur le post-it près du clavier. L'attaquant insère une clé USB malveillante et un malware s'installe sur l'ordinateur Windows de Julien permettant de récupérer toutes les informations confidentielles concernant l'entreprise. L'une des plus grandes failles : la négligence humaine combinée à la surexposition d'informations en ligne.\n\nIl a aussi pu récupérer d'autres données plus facilement juste en récupérant la clé USB sur le bureau.\n\nConclusion de l'enquête : l'intrusion n'a pas reposé sur une seule erreur, mais sur une chaîne de petits détails négligés. Une photo trop bavarde, un poste non verrouillé, un mot de passe visible et du matériel accessible peuvent suffire à transformer une simple visite en incident de sécurité.\n\nBon réflexe à retenir\n\nAvant de publier une photo professionnelle, vérifier si aucune information compromettante y est envoyé : mot de passe, habitude d'employés, dates, outils informatiques de l'entreprise...\n\nAvant de quitter son poste, verrouiller sa session. Ne jamais afficher un mot de passe. Garder les documents, téléphones et équipements sensibles hors de portée.",
  questions: [
    {
      id: "linkedin-post-sensitive-data",
      title: "La photo qui en disait trop",
      instruction:
        "Comme vous essayez de comprendre ce qu'aurait pu faire l'hackeur pour attaquer Orialys, vous allez chercher toutes les informations de l'entreprise trouvable facilement sur internet, à commencer par les réseaux sociaux.\n\nSur LinkedIn, vous regardez le dernier post fait par Orialys qui vous parait suspect : “Nous souhaitons la bienvenue à notre nouveau comptable Julien Duckey !”",
      attackScenario:
        "La publication avait l'air positive : accueillir un nouveau collègue, montrer la vie de l'entreprise, créer de la proximité. Mais pour un observateur malveillant, elle devient une fiche de renseignement. Nom, rôle, environnement technique, habitudes et centres d'intérêt : chaque détail alimente le dossier de l'attaquant.",
      image: linkedinPostImage,
      imageWidth: 1448,
      imageHeight: 1086,
      hotspots: [
        {
          id: "password-visible-post-it",
          x: 168,
          y: 176,
          width: 104,
          height: 110,
          label: "Mot de passe visible",
          explanation:
            "Le post-it révèle un mot de passe en clair. Publié en ligne, tout le monde connait le mot de passe de l'employé",
        },
        {
          id: "medical-appointment-visible",
          x: 178,
          y: 292,
          width: 102,
          height: 100,
          label: "Information personnelle visible",
          explanation:
            "Le post-it contient un rendez-vous médical. C'est une donnée personnelle qui ne devrait pas apparaître sur une publication.",
        },
        {
          id: "operating-system-visible",
          x: 0,
          y: 306,
          width: 165,
          height: 265,
          label: "Système d'exploitation visible",
          explanation:
            "L'écran de l'ordinateur affiche le système d'exploitation utilisé par l'entreprise. Cela peut aider un attaquant à cibler ses attaques en fonction des vulnérabilités de ce système.",
        },
        {
          id: "personal-interest-football-card",
          x: 88,
          y: 575,
          width: 135,
          height: 92,
          label: "Centres d'intérêt visibles sur le bureau",
          explanation:
            "Une carte de jeu de football est visible sur le bureau. L'attaquant connaît donc des informations personnelles sur l'employé, ce qui peut l'aider à créer une attaque de phishing ciblée.",
        },
        {
          id: "personal-interest-manga-shirt",
          x: 990,
          y: 550,
          width: 400,
          height: 520,
          label: "Indice personnel lié aux vêtements",
          explanation:
            "Un t-shirt de manga est visible sur la photo. L'attaquant connaît donc des informations personnelles sur l'employé, ce qui peut l'aider à créer une attaque de phishing ciblée.",
        },
      ],
    },
    {
      id: "abandoned-workstation",
      title: "Le poste abandonné pendant la pause",
      instruction:
        "Après avoir trouvé ce post problématique, vous retournez dans les locaux d'Orialys pour les informer de la situation. À l'entrée du bâtiment, vous croisez Julien en pause-café, et sur le chemin, vous passez devant son bureau. Vous jetez donc un œil sur son organisation de travail.",
      attackScenario:
        "Cette scène montre une faille très simple : l'absence de verrouillage, une clé USB en libre accès. L'attaque ne nécessite pas toujours une technique avancée. Dans certains cas, l'accès commence par un bureau laissé ouvert et un mot de passe affiché à la vue de tous.",
      image: desktopImage,
      imageWidth: 4080,
      imageHeight: 3060,
      hotspots: [
        {
          id: "unlocked-computer",
          x: 2750,
          y: 1000,
          width: 900,
          height: 700,
          label: "Ordinateur laissé allumé",
          explanation:
            "L'ordinateur est laissé allumé et connecté, ce qui peut permettre à un attaquant d'accéder aux informations sensibles si l'utilisateur s'éloigne de son poste de travail.",
        },
        {
          id: "password-post-it-workstation",
          x: 1860,
          y: 460,
          width: 170,
          height: 260,
          label: "Mot de passe visible sur un post-it",
          explanation:
            "Le mot de passe de l'utilisateur est écrit sur un post-it collé à côté de son ordinateur, ce qui peut permettre à un attaquant de le trouver facilement et d'accéder au compte de l'utilisateur.",
        },
        {
          id: "usb-drive-unattended",
          x: 1960,
          y: 1420,
          width: 260,
          height: 160,
          label: "Clé USB en libre accès",
          explanation:
            "Une clé USB est posée sur le bureau sans surveillance ni sécurité. Elle peut se faire voler et des potentielles données sensibles sont donc en libres accès.",
        },
      ],
    },
  ],
};
