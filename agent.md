# Agent Notes

Ce fichier sert de guide pour les prochaines interventions sur le projet.

## Contexte du projet

Le projet est un jeu web de sensibilisation a la cybersecurite base sur React, TypeScript, Vite et Phaser, avec un backend Node.js, Express et TypeScript en cours de construction.

Le joueur se connecte avec un pseudo, choisit un scenario, observe des images et place des marqueurs sur les anomalies de securite. Chaque scenario contient plusieurs questions liees par une histoire.

Le frontend historique sauvegarde encore la progression dans `localStorage`. Le backend doit progressivement remplacer ce stockage par une API Express et des fichiers JSON cote serveur.

## Structure actuelle

```txt
frontend/
  package.json
  src/

backend/
  package.json
  data/
    companies/
      demo.json
  src/
    app.ts
    index.ts
    controllers/
    repositories/
    routes/
    services/
    types/
```

La racine contient la documentation et les fichiers de coordination :

```txt
README.md
agent.md
.gitignore
```

## Commandes utiles

Frontend :

```bash
cd frontend
npm run dev
npm run build
npm run lint
```

Backend :

```bash
cd backend
npm run dev
```

Le backend n'a pas encore de `tsconfig.json` ni de script `build`. Pour une verification TypeScript ponctuelle :

```bash
cd backend
npx tsc src/index.ts --noEmit --module node16 --target es2023 --esModuleInterop --moduleResolution node16
```

Apres une modification frontend, lancer au minimum `npm run build` et `npm run lint` dans `frontend/` quand c'est pertinent.

Apres une modification backend, lancer au minimum la verification TypeScript ponctuelle tant que le backend n'a pas de `tsconfig.json`.

## Architecture frontend a respecter

### React

React gere :

- les pages ;
- le login ;
- le choix du scenario ;
- la progression par pseudo ;
- les scores par scenario ;
- le score global ;
- le leaderboard.

`frontend/src/pages/App.tsx` est le centre de la navigation et de l'etat applicatif.

### Phaser

Phaser gere uniquement le gameplay dans l'image :

- affichage de l'image ;
- clics ;
- marqueurs ;
- collecte des selections en coordonnees originales.

La validation, le chronometre de score et le calcul des points doivent progressivement passer dans le backend. Ne pas mettre la logique de scenario dans `CyberDifferenceScene`.

### Pont React / Phaser

`frontend/src/game/PhaserGame.tsx` cree le jeu Phaser et expose des methodes a React avec `forwardRef` et `useImperativeHandle`.

Methodes exposees actuellement :

```ts
getSelections(): SelectionPoint[]
```

Ne pas recreer le jeu Phaser a chaque resize. Utiliser `phaserGameRef.current.scale.resize(...)` et `sceneRef.current?.resizeScene(...)`.

## Donnees de jeu

Les scenarios prives sont dans `backend/data/game/scenarios/`. Le frontend ne recoit que les cartes publiques, puis une question publique lors de la creation d'une tentative.

Les hotspots et les textes de correction ne doivent pas etre envoyes avant la validation.

Types frontend principaux :

```txt
frontend/src/types/Question.ts
frontend/src/types/Scenario.ts
frontend/src/types/Score.ts
frontend/src/types/User.ts
```

`Scenario` contient directement ses questions et peut contenir un `globalAttackScenario` affiche en fin de scenario.

## Backend

Le backend est dans `backend/`.

Stack actuelle :

- Node.js ;
- Express ;
- TypeScript ;
- `tsx watch src/index.ts` pour le developpement.

Fichiers principaux :

```txt
backend/src/app.ts
backend/src/index.ts
backend/src/routes/
backend/src/controllers/
backend/src/services/
backend/src/repositories/
backend/src/types/
```

Separation attendue :

```txt
routes
  -> definissent les URLs

controllers
  -> lisent req/res, valident les entrees HTTP et renvoient les reponses

services
  -> portent les regles metier

repositories
  -> lisent/ecrivent le stockage
```

Ne pas mettre de logique metier lourde dans les routes.

Ne pas appeler directement le repository depuis les controllers si un service existe deja pour ce domaine.

Ne pas faire appeler un controller par un autre controller.

## Routes backend actuelles

Les routers sont branches dans `backend/src/app.ts`.

```txt
app.use('/api/users', usersRoutes)
app.use('/api/scores', scoresRoutes)
app.use('/api/game', gameRoutes)
```

Routes utilisateurs :

```txt
GET  /api/users/:id
POST /api/users
```

Routes scores :

```txt
GET   /api/scores/users/:userId/scenarios/:scenarioId
GET   /api/scores/users/:userId
PATCH /api/scores/users/:userId/scenarios/:scenarioId
```

Routes de jeu :

```txt
GET  /api/game/scenarios
POST /api/game/attempts
```

`POST /api/game/attempts` cree une tentative en memoire et renvoie la premiere `PublicQuestion`.

`PATCH` est utilise pour enregistrer le score d'un scenario car on modifie une partie d'un utilisateur existant.

Le CORS dans `app.ts` doit autoriser `PATCH`.

## Stockage backend

Objectif final :

```txt
backend/data/companies/*.json
```

Un fichier JSON par entreprise.

Etat actuel :

- `backend/data/companies/demo.json` existe comme fichier d'exemple.
- `backend/src/repositories/companyJson.repository.ts` lit et ecrit ce fichier JSON.
- Les tentatives de jeu sont provisoirement conservees en memoire dans `gameAttempt.repository.ts`.

Les vrais fichiers clients/scores ne doivent pas etre commits. Garder seulement des donnees d'exemple non sensibles.

## Types backend

Type principal :

```txt
backend/src/types/CompanyData.ts
```

Structure actuelle :

```ts
export type CompanyData = {
  companyId: string;
  companyName: string;
  users: User[];
};

export type User = {
  id: string;
  pseudo: string;
  pseudoKey: string;
  hashedPassword: string | null;
  emailAddress: string | null;
  globalScore: number;
  completedScenarioIds: string[];
  scenarioScores: Record<string, ScenarioScore>;
  createdAt: string;
  updatedAt: string;
};

export type ScenarioScore = {
  score: number;
  completedAt: string;
};
```

`scenarioScores` est volontairement un objet indexe par `scenarioId` pour faciliter :

```ts
user.scenarioScores[scenarioId]
```

Les types TypeScript ne valident pas les JSON au runtime. Une validation runtime pourra etre ajoutee plus tard.

## Services frontend historiques

`frontend/src/services/userServices.ts` est encore le service principal pour la progression et le leaderboard actuels.

Il sauvegarde les utilisateurs dans `localStorage` avec la cle :

```txt
cyber-game-user
```

`ScoreService` existe encore, mais le flux actuel du leaderboard frontend passe historiquement par `UserService`.

Le branchement complet du frontend sur le backend n'est pas encore termine.

## Regles importantes

- Ne pas coder tant que l'utilisateur demande seulement une explication ou un avis.
- Quand l'utilisateur demande une modification, garder les changements limites au besoin exprime.
- Conserver la separation React / Phaser.
- Conserver la separation frontend / backend.
- Eviter les refactorings non demandes.
- Ne pas supprimer les changements existants de l'utilisateur.
- Garder les fichiers de scenario lisibles, meme si cela duplique certaines structures.
- Garder les `id` techniques sans accents.
- Les textes affiches peuvent utiliser des accents si l'encodage du fichier est sain.
- Pour le backend, garder les controllers minces et placer les regles dans les services.
- Pour le stockage backend, passer par le repository.

## Raccourcis de debug

- `Shift + T` : active ou desactive le timer avant affichage de l'image.

## Points d'attention actuels

Le projet a evolue vers une structure frontend/backend, mais certains points techniques peuvent encore etre ameliores :

- Le frontend charge les utilisateurs, le leaderboard, les cartes de scenario et le debut des tentatives depuis le backend.
- La validation des selections et la sauvegarde serveur du score calcule restent a implementer.
- Les tentatives sont perdues au redemarrage du backend tant qu'elles restent en memoire.
- `UserService.getScores()` peut encore retourner des donnees issues des utilisateurs et les caster en `Score[]`.
- Au login d'un utilisateur existant, verifier que tous les etats React necessaires sont bien recharges depuis `User`, notamment les scores par scenario.
- `ScoreService` frontend peut devenir inutile si tout le leaderboard passe par le backend.
- Le backend n'a pas encore de `tsconfig.json` dedie.
- Les fichiers de texte peuvent contenir des caracteres accentues mal encodes si l'editeur n'est pas en UTF-8.

Ne pas corriger ces points sans demande explicite de l'utilisateur.
