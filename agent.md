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
- validation ;
- score d'une question ;
- tooltips d'explication apres validation ;
- hotspots de debug.

Ne pas mettre la logique de scenario dans `CyberDifferenceScene`. La scene doit rester centree sur une seule `Question`.

### Pont React / Phaser

`frontend/src/game/PhaserGame.tsx` cree le jeu Phaser et expose des methodes a React avec `forwardRef` et `useImperativeHandle`.

Methodes exposees actuellement :

```ts
validateSelections(): number
toggleDebugHotspots(): void
```

Ne pas recreer le jeu Phaser a chaque resize. Utiliser `phaserGameRef.current.scale.resize(...)` et `sceneRef.current?.resizeScene(...)`.

## Donnees frontend

Les scenarios sont dans :

```txt
frontend/src/data/scenarios/
```

Chaque scenario doit etre dans son propre fichier.

Ajouter un nouveau scenario implique :

1. creer un fichier dans `frontend/src/data/scenarios/` ;
2. exporter un objet `Scenario` ;
3. l'ajouter dans `frontend/src/data/scenarios/index.ts`.

Ne pas recreer un gros fichier `questions.ts` global.

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
- `backend/src/repositories/companyJson.repository.ts` utilise encore un stockage temporaire en memoire.
- Le repository est deja aligne sur le type `CompanyData`.
- La lecture/ecriture reelle du fichier JSON reste a implementer.

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

- `Shift + D` : affiche ou cache les zones de bonnes reponses.
- `Shift + T` : active ou desactive le timer avant affichage de l'image.

## Points d'attention actuels

Le projet a evolue vers une structure frontend/backend, mais certains points techniques peuvent encore etre ameliores :

- Le frontend utilise encore principalement `localStorage`.
- Le backend n'est pas encore branche au frontend.
- Le repository backend est encore en memoire et n'ecrit pas encore dans `backend/data/companies/demo.json`.
- `UserService.getScores()` peut encore retourner des donnees issues des utilisateurs et les caster en `Score[]`.
- Au login d'un utilisateur existant, verifier que tous les etats React necessaires sont bien recharges depuis `User`, notamment les scores par scenario.
- `ScoreService` frontend peut devenir inutile si tout le leaderboard passe par le backend.
- Le backend n'a pas encore de `tsconfig.json` dedie.
- Les fichiers de texte peuvent contenir des caracteres accentues mal encodes si l'editeur n'est pas en UTF-8.

Ne pas corriger ces points sans demande explicite de l'utilisateur.
