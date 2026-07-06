# Agent Notes

Ce fichier sert de guide pour les prochaines interventions sur le projet.

## Contexte du projet

Le projet est un jeu web de sensibilisation a la cybersecurite base sur React, TypeScript, Vite et Phaser, avec un backend Node.js, Express et TypeScript.

Le joueur se connecte avec un pseudo, choisit un scenario, observe des images et place des marqueurs sur les anomalies de securite. Chaque scenario contient plusieurs questions liees par une histoire.

Le frontend appelle maintenant le backend pour les utilisateurs, les cartes de scenarios, le demarrage d'une tentative, la validation des reponses, le score et le leaderboard.

## Structure actuelle

```txt
frontend/
  package.json
  src/
    components/
    game/
    pages/
    services/
    types/
    utils/

backend/
  package.json
  tsconfig.json
  tsconfig.build.json
  data/
    companies/
      demo.json
    game/
      scenarios/
  public/
    images/
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
npm run typecheck
npm test
npm run check
npm run build
```

Apres une modification frontend, lancer au minimum `npm run build` et `npm run lint` dans `frontend/` quand c'est pertinent.

Apres une modification backend, lancer au minimum `npm run check` dans `backend/`. Lancer aussi `npm run build` si la modification touche la configuration TypeScript, les imports ou le packaging.

## Architecture frontend a respecter

### React

React gere :

- les pages ;
- le login ;
- le choix du scenario ;
- le replay ;
- les appels API ;
- l'affichage des scores ;
- le leaderboard ;
- la page de resultat et le debrief.

`frontend/src/pages/App.tsx` est le centre de la navigation et de l'etat applicatif.

Etats importants dans `App.tsx` :

- `user` ;
- `page` ;
- `selectedScenarioId` ;
- `scenarioIntros` ;
- `gameSession` ;
- `scenarioScore` ;
- `scenarioRoundScores` ;
- `completedScenarioDetails` ;
- `leaderboardScores` ;
- `currentLeaderboardUser`.

`frontend/src/services/apiClient.ts` est le point central des appels HTTP.

### Phaser

Phaser gere uniquement le gameplay dans l'image :

- affichage de l'image ;
- clics ;
- marqueurs ;
- collecte des selections en coordonnees originales ;
- affichage de la correction apres validation.

Ne pas mettre la logique de scenario, de score ou de navigation dans `CyberDifferenceScene`.

### Pont React / Phaser

`frontend/src/game/PhaserGame.tsx` cree le jeu Phaser et expose des methodes a React avec `forwardRef` et `useImperativeHandle`.

Methodes exposees actuellement :

```ts
getSelections(): SelectionPoint[]
showCorrection(hotspots): void
```

Ne pas recreer le jeu Phaser a chaque resize. Utiliser `phaserGameRef.current.scale.resize(...)` et `sceneRef.current?.resizeScene(...)`.

## Flux de jeu actuel

1. `HomePage` affiche les cartes recues via `GET /api/game/scenarios`.
2. Le joueur clique sur un scenario.
3. `ScenarioIntroPage` affiche la description publique.
4. `App.tsx` appelle `POST /api/game/attempts`.
5. Le backend cree une tentative en memoire et renvoie la premiere `PublicQuestion`.
6. `GamePage` affiche le texte de la question.
7. Quand l'image s'affiche, le frontend appelle `POST /api/game/attempts/:attemptId/questions/:questionId/start`.
8. Phaser collecte les points cliques.
9. Au clic sur `Valider`, le frontend appelle `POST /api/game/attempts/:attemptId/questions/:questionId/answers`.
10. Le backend valide les selections, calcule le score, renvoie la correction et la question suivante ou les details de fin.
11. A la fin du scenario, `ResultPage` affiche le score, le detail par piece et le debrief `globalAttackScenario` / `attackScenario`.

## Donnees de jeu

Les scenarios prives sont dans :

```txt
backend/data/game/scenarios/
```

Le frontend ne recoit que :

- les cartes publiques pour l'accueil ;
- une `PublicQuestion` pendant le jeu ;
- les hotspots seulement apres validation, dans la correction ;
- `scenarioDetails` a la fin du scenario pour afficher le debrief.

Les hotspots et les textes de correction ne doivent pas etre envoyes avant la validation.

Types frontend principaux :

```txt
frontend/src/types/Question.ts
frontend/src/types/Scenario.ts
frontend/src/types/GameSession.ts
frontend/src/types/Leaderboard.ts
frontend/src/types/User.ts
```

`Scenario` contient directement ses questions et peut contenir un `globalAttackScenario` affiche en fin de scenario.

## Backend

Le backend est dans `backend/`.

Stack actuelle :

- Node.js ;
- Express ;
- TypeScript ;
- `tsx watch src/index.ts` pour le developpement ;
- `node:test` via `tsx --test` pour les tests.

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
app.use('/api/leaderboard', leaderboardRoutes)
app.use('/api/game', gameRoutes)
app.use('/images', express.static(...))
```

Routes utilisateurs :

```txt
GET  /api/users/:id
POST /api/users
```

Routes scores :

```txt
GET /api/scores/users/:userId/scenarios/:scenarioId
GET /api/scores/users/:userId
```

Il n'y a plus de route frontend directe pour ecrire un score. Le score est sauvegarde par `game.service.ts` quand une tentative non replay se termine.

Routes leaderboard :

```txt
GET /api/leaderboard
GET /api/leaderboard/users/:userId
```

Routes de jeu :

```txt
GET  /api/game/scenarios
POST /api/game/attempts
POST /api/game/attempts/:attemptId/questions/:questionId/start
POST /api/game/attempts/:attemptId/questions/:questionId/answers
```

`POST /api/game/attempts` cree une tentative en memoire et renvoie la premiere `PublicQuestion`.

`POST /api/game/attempts/:attemptId/questions/:questionId/start` demarre le timer serveur sans pouvoir le remettre a zero.

`POST /api/game/attempts/:attemptId/questions/:questionId/answers` valide les selections et renvoie la correction.

Le CORS dans `app.ts` autorise actuellement `GET, POST, PUT, DELETE, OPTIONS`.

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
- Le repository refuse d'ecraser un score de scenario deja existant.

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

`frontend/src/services/userServices.ts` et `frontend/src/services/scoreServices.ts` existent encore comme services historiques.

Le flux principal actuel utilise `frontend/src/services/apiClient.ts`.

Ne pas supprimer les anciens services sans verifier qu'aucune page ne les importe encore.

## Tests backend

Tests actuels :

```txt
backend/src/services/gameScoring.service.test.ts
backend/src/services/game.service.test.ts
```

Ils couvrent :

- detection d'un point dans une hotspot ;
- evaluation des hotspots trouvees ;
- formule de score ;
- demarrage du timer ;
- impossibilite de reset le timer ;
- refus d'une mauvaise `questionId`.

Ajouter de preference les nouveaux tests pres du service concerne.

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
- Le frontend ne doit jamais envoyer un score final a enregistrer.
- Le backend doit calculer les scores et refuser l'ecrasement du premier score d'un scenario.
- Les hotspots ne doivent pas etre exposes avant validation.

## Raccourcis de debug

- `Shift + T` : active ou desactive le timer avant affichage de l'image.

## Points d'attention actuels

Le projet est maintenant bien branche sur le backend, mais certains points techniques peuvent encore etre ameliores :

- Les tentatives sont perdues au redemarrage du backend tant qu'elles restent en memoire.
- Le stockage JSON peut perdre une ecriture si plusieurs requetes ecrivent en meme temps.
- `apiClient.ts` affiche encore des erreurs HTTP generiques au lieu de lire le message JSON du backend.
- `API_URL` est encore code en dur dans `apiClient.ts`.
- `UserService` et `ScoreService` frontend peuvent devenir inutiles si tout le flux reste backend.
- Les fichiers de texte peuvent contenir des caracteres accentues mal encodes si l'editeur n'est pas en UTF-8.
- Le bundle frontend peut etre lourd a cause de Phaser ; le build Vite peut afficher un avertissement de chunk superieur a 500 kB.

Ne pas corriger ces points sans demande explicite de l'utilisateur.
