# Agent Notes

Ce fichier sert de guide pour les prochaines interventions sur le projet.

## Role attendu

L'utilisateur veut apprendre. Par defaut, adopter un mode professeur assistant :

- expliquer la cause d'un probleme avant de proposer la correction ;
- proposer des corrections minimales ;
- ne pas remplacer beaucoup de code sans explication ;
- ne pas complexifier le prototype inutilement ;
- garder la separation React / Phaser / backend claire ;
- ne pas coder si l'utilisateur demande seulement un avis ou une explication.

Quand l'utilisateur demande explicitement une modification, faire la modification proprement et expliquer ensuite ce qui a ete fait.

## Contexte du projet

Le projet est un jeu web de sensibilisation a la cybersecurite base sur React, TypeScript, Vite et Phaser, avec un backend Node.js, Express et TypeScript.

Le joueur se connecte avec un pseudo, choisit un dossier, lit une mise en situation, observe une image et place des marqueurs sur les anomalies de securite.

Le frontend appelle le backend pour :

- les utilisateurs ;
- les cartes de dossiers ;
- le demarrage d'une tentative ;
- le demarrage du timer serveur ;
- la validation des reponses ;
- le score ;
- le leaderboard.

## Structure actuelle

```txt
frontend/
  package.json
  src/
    components/
      ConfirmReplayModal.tsx
      LanguageSelector.tsx
      ProgressiveText.tsx
    game/
      PhaserGame.tsx
      scenes/
        CyberDifferenceScene.ts
    i18n/
      LanguageProvider.tsx
      translations.ts
      useLanguage.ts
      useTranslation.ts
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
        fr/
        en/
  public/
    images/
      fr/
      en/
  src/
    app.ts
    index.ts
    controllers/
    repositories/
    routes/
    services/
    types/
```

La racine contient :

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

Apres une modification frontend, lancer au minimum `npm run build` et `npm run lint` quand c'est pertinent.

Apres une modification backend, lancer au minimum `npm run check`. Lancer aussi `npm run build` si la modification touche la configuration TypeScript, les imports ou le packaging.

## Architecture frontend a respecter

### React

React gere :

- les pages ;
- le login ;
- la langue ;
- le choix du dossier ;
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

### Internationalisation

La langue est geree dans `frontend/src/i18n/`.

`LanguageProvider` conserve la langue active dans le localStorage.

`useTranslation` fournit les textes d'interface.

Les scenarios viennent du backend avec le parametre `lang`. Les fichiers de scenario existent dans :

```txt
backend/data/game/scenarios/fr/
backend/data/game/scenarios/en/
```

### Texte progressif

`ProgressiveText.tsx` affiche progressivement les textes d'introduction de scenario et de piece.

Attention : `WAVE_SIZE` doit rester coherent avec des index de caracteres entiers. Une valeur trop petite, comme `0.1`, rend quasiment impossible l'etat visuel `wave`.

### Phaser

Phaser gere uniquement le gameplay dans l'image :

- affichage de l'image ;
- clics ;
- marqueurs ;
- collecte des selections en coordonnees originales ;
- loupe ;
- affichage de la correction apres validation ;
- bulles d'explication au survol des hotspots corriges.

Ne pas mettre la logique de dossier, de score ou de navigation dans `CyberDifferenceScene`.

### Pont React / Phaser

`frontend/src/game/PhaserGame.tsx` cree le jeu Phaser et expose des methodes a React avec `forwardRef` et `useImperativeHandle`.

Methodes exposees actuellement :

```ts
getSelections(): SelectionPoint[]
showCorrection(hotspots): void
toggleDebugHotspots(): void
toggleMagnifier(isActive): void
```

Ne pas recreer le jeu Phaser a chaque resize. Utiliser `phaserGameRef.current.scale.resize(...)` et `sceneRef.current?.resizeScene(...)`.

## Flux de jeu actuel

1. `HomePage` affiche les cartes recues via `GET /api/game/scenarios?lang=...`.
2. Le joueur clique sur un dossier.
3. `ScenarioIntroPage` affiche la description publique.
4. `App.tsx` appelle `POST /api/game/attempts`.
5. Le backend cree une tentative en memoire et renvoie la premiere `PublicQuestion`.
6. `GamePage` affiche le texte progressif de la piece.
7. Quand l'image s'affiche, le frontend appelle `POST /api/game/attempts/:attemptId/questions/:questionId/start`.
8. Phaser collecte les points cliques.
9. Au clic sur `Valider`, le frontend appelle `POST /api/game/attempts/:attemptId/questions/:questionId/answers`.
10. Le backend valide les selections, calcule le score, renvoie la correction et la piece suivante ou les details de fin.
11. Phaser affiche les zones corrigees et les bulles d'explication.
12. A la fin du dossier, `ResultPage` affiche le score, le detail par piece, les bonnes pratiques et le debrief `globalAttackScenario` / `attackScenario`.

## Donnees de jeu

Les scenarios prives sont dans :

```txt
backend/data/game/scenarios/
```

Les images sont dans :

```txt
backend/public/images/
```

Le frontend ne recoit que :

- les cartes publiques pour l'accueil ;
- une `PublicQuestion` pendant le jeu ;
- les hotspots seulement apres validation, dans la correction ;
- `scenarioDetails` a la fin du dossier pour afficher le debrief.

Les hotspots et les textes de correction ne doivent pas etre envoyes avant la validation.

Types frontend principaux :

```txt
frontend/src/types/Question.ts
frontend/src/types/Scenario.ts
frontend/src/types/GameSession.ts
frontend/src/types/Leaderboard.ts
frontend/src/types/User.ts
```

`Scenario` contient directement ses questions et peut contenir :

- `globalAttackScenario` ;
- `goodPractices`.

## Backend

Le backend est dans `backend/`.

Stack actuelle :

- Node.js ;
- Express ;
- TypeScript ;
- `tsx watch src/index.ts` pour le developpement ;
- `node:test` via `tsx --test` pour les tests.

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

`POST /api/game/attempts/:attemptId/questions/:questionId/answers` valide les selections, calcule le score et renvoie la correction.

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
- Le repository refuse d'ecraser un score de dossier deja existant.

Les vrais fichiers clients/scores ne doivent pas etre commits. Garder seulement des donnees d'exemple non sensibles.

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
- Pour le backend, garder les controllers minces et placer les regles dans les services.
- Pour le stockage backend, passer par le repository.
- Le frontend ne doit jamais envoyer un score final a enregistrer.
- Le backend doit calculer les scores et refuser l'ecrasement du premier score d'un dossier.
- Les hotspots ne doivent pas etre exposes avant validation.

## Raccourcis de debug

- `Shift + T` : active ou desactive le timer avant affichage de l'image.

## Points d'attention actuels

Le projet est bien branche sur le backend, mais certains points techniques peuvent encore etre ameliores :

- Les tentatives sont perdues au redemarrage du backend tant qu'elles restent en memoire.
- Le timer serveur peut encore etre contourne par un utilisateur qui appelle directement l'API.
- Le stockage JSON peut perdre une ecriture si plusieurs requetes ecrivent en meme temps.
- `apiClient.ts` affiche encore des erreurs HTTP generiques au lieu de lire le message JSON du backend.
- `apiClient.ts` doit encoder les valeurs inserees dans l'URL, notamment le pseudo.
- `API_URL` est encore code en dur dans `apiClient.ts`.
- `UserService` et `ScoreService` frontend peuvent devenir inutiles si tout le flux reste backend.
- Le bundle frontend peut etre lourd a cause de Phaser ; le build Vite peut afficher un avertissement de chunk superieur a 500 kB.

Ne pas corriger ces points sans demande explicite de l'utilisateur.
