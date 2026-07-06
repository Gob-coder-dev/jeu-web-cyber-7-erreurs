# Cyber 7 erreurs

Jeu web de sensibilisation a la cybersecurite. Le joueur parcourt des scenarios professionnels, observe des images et doit retrouver les anomalies de securite visibles.

Le projet est separe en deux applications :

- `frontend/` : application React, TypeScript, Vite et Phaser.
- `backend/` : API Node.js, Express et TypeScript.

## Principe du jeu

Le joueur se connecte avec un pseudo. Le frontend appelle le backend pour recuperer ou creer cet utilisateur, charger les scenarios, demarrer une tentative de jeu, valider les selections et afficher le classement.

Depuis l'accueil, le joueur choisit un scenario. Chaque scenario contient plusieurs questions liees par une histoire.

Avant chaque image, le jeu affiche un court ecran de presentation avec un compte a rebours. Quand l'image est visible, le joueur place des marqueurs sur les zones suspectes puis valide sa selection.

Le backend calcule le score d'une question a partir de trois elements :

- anomalies trouvees ;
- temps serveur ecoule depuis l'affichage de l'image ;
- anomalies non trouvees.

Le score d'un scenario correspond a la somme des scores de ses questions. Le score global correspond a la somme des scenarios termines par le joueur.

Un scenario deja termine peut etre rejoue, mais son premier score conserve n'est pas remplace et le score global n'est pas modifie.

## Scenarios actuels

### L'intrusion dans les locaux

Orialys a subi une intrusion discrete. L'enquete remonte jusqu'a Julien, le nouveau comptable, puis a une publication LinkedIn trop bavarde et a un poste de travail laisse vulnerable.

Questions :

- La photo qui en disait trop ;
- Le poste abandonne pendant la pause.

### La boite aux leurres de Melanie

Melanie recoit plusieurs emails suspects dans la meme journee. Livraison, gain, promotion et offre personnalisee cherchent a la faire cliquer trop vite.

Questions :

- Le colis trop presse ;
- Le cadeau tombe du ciel ;
- La promotion qui force la main ;
- La personnalisation maladroite.

### La voix du directeur fantome

Une comptable effectue un virement urgent apres un appel suppose du directeur. L'enquete montre une fraude preparee avec des informations publiques, un appel sous pression et des emails d'apparence professionnelle.

Questions :

- La carte postale numerique ;
- La voix qui pressait le pas ;
- La facture tombee pendant l'appel ;
- La confirmation qui referme le piege.

### Le trajet qui avait des oreilles

Un document confidentiel de Credo Agriculture se retrouve chez un concurrent. L'enquete suit les deplacements du prestataire Cedric : reseaux sociaux, travail en transport, Wi-Fi douteux et faux portail captif.

Questions :

- La plainte du metro sur les reseaux ;
- Le travail dans le train ;
- La fin du trajet ;
- Le portail trop curieux.

## Architecture

```txt
frontend/
  src/
    components/
      ConfirmReplayModal.tsx

    game/
      PhaserGame.tsx
      scenes/
        CyberDifferenceScene.ts

    pages/
      App.tsx
      LoginPage.tsx
      HomePage.tsx
      ScenarioIntroPage.tsx
      GamePage.tsx
      ResultPage.tsx
      LeaderBoardPage.tsx

    services/
      apiClient.ts
      scoreServices.ts
      userServices.ts

    types/
      GameSession.ts
      Leaderboard.ts
      Question.ts
      Scenario.ts
      Score.ts
      User.ts

    utils/
      formatGameLabels.ts

backend/
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
      game.controller.ts
      leaderboard.controller.ts
      scores.controller.ts
      users.controller.ts
    repositories/
      companyJson.repository.ts
      gameAttempt.repository.ts
      gameScenario.repository.ts
    routes/
      game.routes.ts
      leaderboard.routes.ts
      scores.routes.ts
      users.routes.ts
    services/
      game.service.ts
      gameScoring.service.ts
      leaderboard.service.ts
      scores.service.ts
      users.service.ts
    types/
      CompanyData.ts
      GameData.ts
      HomePageCard.ts
      Leaderboard.ts
```

## Frontend

React gere les pages, la navigation, le choix du scenario, l'affichage des scores, le replay et le classement.

`frontend/src/pages/App.tsx` contient l'etat principal :

- utilisateur connecte ;
- page active ;
- scenario selectionne ;
- tentative de jeu en cours ;
- score du scenario termine ;
- scores par question ;
- details du scenario termine pour la page de resultat ;
- donnees du leaderboard.

`frontend/src/services/apiClient.ts` est le point d'entree des appels HTTP vers le backend.

### Pages principales

- `LoginPage` : saisie du pseudo.
- `HomePage` : cartes de scenarios, score global, replay et classement.
- `ScenarioIntroPage` : description du scenario avant lancement.
- `GamePage` : boucle de question, affichage Phaser et validation.
- `ResultPage` : score final, detail par piece, debrief `globalAttackScenario` et `attackScenario`.
- `LeaderBoardPage` : top 12 et position du joueur connecte si necessaire.

### Phaser

Phaser gere uniquement la zone interactive de l'image :

- affichage de l'image ;
- clics du joueur ;
- creation et suppression des marqueurs ;
- collecte des selections dans les coordonnees originales de l'image ;
- affichage de la correction apres validation serveur.

La scene Phaser principale est `CyberDifferenceScene`.

### Pont React / Phaser

`PhaserGame.tsx` sert de pont entre React et Phaser.

React affiche :

```tsx
<PhaserGame ref={phaserRef} question={question} />
```

Le pont expose a React :

```ts
getSelections()
showCorrection(hotspots)
```

React decide quand valider. Phaser ne calcule pas le score et ne connait pas les scenarios complets.

## Backend

Le backend est une API Express en TypeScript situee dans `backend/`.

Pour simplifier le developpement actuel, le backend travaille sur une entreprise de demonstration stockee dans :

```txt
backend/data/companies/demo.json
```

Les scenarios prives et leurs hotspots sont dans :

```txt
backend/data/game/scenarios/
```

Les images sont servies statiquement depuis :

```txt
backend/public/images/
```

via l'URL publique :

```txt
/images/...
```

### Routes actuelles

Les routes sont branchees dans `backend/src/app.ts`.

```txt
/api/users
/api/scores
/api/leaderboard
/api/game
```

Routes utilisateurs :

```txt
GET  /api/users/:id
POST /api/users
```

`GET /api/users/:id` recupere ou cree l'utilisateur temporairement, pour simplifier le prototype avec pseudo.

Routes scores :

```txt
GET /api/scores/users/:userId/scenarios/:scenarioId
GET /api/scores/users/:userId
```

Les scores ne sont plus enregistres par une route frontend directe. Le score de scenario est enregistre par le backend quand une tentative non replay est terminee.

Routes leaderboard :

```txt
GET /api/leaderboard
GET /api/leaderboard/users/:userId
```

`GET /api/leaderboard` renvoie le top 12. `GET /api/leaderboard/users/:userId` renvoie le rang du joueur connecte, meme s'il n'est pas dans le top 12.

Routes de jeu :

```txt
GET  /api/game/scenarios
POST /api/game/attempts
POST /api/game/attempts/:attemptId/questions/:questionId/start
POST /api/game/attempts/:attemptId/questions/:questionId/answers
```

`GET /api/game/scenarios` renvoie les cartes publiques de l'accueil.

`POST /api/game/attempts` cree une tentative en memoire et renvoie la premiere question publique, sans hotspots ni correction.

`POST /api/game/attempts/:attemptId/questions/:questionId/start` demarre le timer serveur de la question. Si le timer a deja demarre, l'appel reussit mais ne le remet pas a zero.

`POST /api/game/attempts/:attemptId/questions/:questionId/answers` recoit les selections du joueur, valide les hotspots cote serveur, calcule le score de la question, renvoie la correction, puis renvoie la question suivante ou les details de fin de scenario.

### Couches backend

Le backend suit cette separation :

```txt
routes
  -> definissent les URL

controllers
  -> lisent req/res, valident les entrees HTTP et renvoient les reponses

services
  -> portent les regles metier

repositories
  -> lisent/ecrivent le stockage
```

`companyJson.repository.ts` lit et ecrit le fichier de l'entreprise de demonstration.

`gameScenario.repository.ts` expose les scenarios.

`gameAttempt.repository.ts` conserve provisoirement les tentatives en memoire.

`gameScoring.service.ts` contient les fonctions pures de scoring et de verification des hotspots.

### Structure de donnees backend

Le type principal est defini dans :

```txt
backend/src/types/CompanyData.ts
```

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

`scenarioScores` est un objet indexe par `scenarioId`, ce qui permet de retrouver rapidement le score d'un scenario :

```ts
user.scenarioScores[scenarioId]
```

Le repository refuse d'ecraser un score de scenario deja existant. C'est la protection finale contre le replay qui modifierait le premier score.

## Gestion des scenarios

Un scenario backend est defini par le type suivant :

```ts
export type Scenario = {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  globalAttackScenario?: string;
};
```

Chaque fichier de scenario contient directement ses questions. Cela permet de garder ensemble :

- l'histoire ;
- les images ;
- les instructions ;
- les hotspots ;
- les explications ;
- le scenario d'attaque complet affiche en fin de scenario.

Le frontend ne recoit pas les hotspots avant validation. Les hotspots sont renvoyes seulement avec la correction.

## Progression et leaderboard

Le stockage serveur actuel repose sur :

```txt
backend/data/companies/*.json
```

Le fichier `demo.json` sert d'exemple. Les vrais fichiers clients et scores ne doivent pas etre exposes publiquement ni commits s'ils contiennent des donnees reelles.

Etat actuel :

- le frontend charge l'utilisateur depuis le backend ;
- le frontend charge les cartes de scenarios depuis le backend ;
- le frontend demarre les tentatives via le backend ;
- le backend garde les hotspots prives jusqu'a la validation ;
- le backend calcule le score de chaque question ;
- le backend sauvegarde le score du scenario seulement lors de la premiere tentative terminee ;
- le frontend affiche le debrief de fin a partir des details renvoyes par le backend ;
- le leaderboard vient du backend.

## Limites connues

- Les tentatives de jeu sont stockees en memoire dans `gameAttempt.repository.ts`. Elles sont perdues au redemarrage du backend.
- Le stockage JSON peut avoir des problemes de concurrence si plusieurs ecritures arrivent exactement en meme temps.
- Les types TypeScript documentent la structure attendue, mais ne valident pas les JSON au runtime.
- La connexion par pseudo reste volontairement simple pour le prototype.
- `scoreServices.ts` et `userServices.ts` existent encore comme services historiques frontend et pourront etre retires plus tard si tout passe definitivement par le backend.

## Raccourcis de debug

- `Shift + T` : active ou desactive le timer avant affichage de l'image.

## Installation

Installer les dependances frontend :

```bash
cd frontend
npm install
```

Installer les dependances backend :

```bash
cd backend
npm install
```

## Commandes

Lancer le frontend :

```bash
cd frontend
npm run dev
```

Lancer le backend :

```bash
cd backend
npm run dev
```

Construire le frontend :

```bash
cd frontend
npm run build
```

Verifier le lint frontend :

```bash
cd frontend
npm run lint
```

Verifier le backend :

```bash
cd backend
npm run check
```

Construire le backend :

```bash
cd backend
npm run build
```

Lancer les tests backend :

```bash
cd backend
npm test
```

## Notes de developpement

- Les questions ne sont plus choisies aleatoirement.
- Les questions sont jouees dans l'ordre defini par leur scenario.
- Phaser ne connait pas les scenarios : il ne recoit qu'une question publique a la fois.
- Le resize du canvas Phaser ne doit pas recreer toute la scene pour ne pas perdre les marqueurs.
- Le backend doit rester separe du frontend : React appelle une API, le backend decide et stocke.
- Le repository backend doit rester la seule couche responsable de la lecture/ecriture JSON.
- Les calculs de score doivent rester cote backend.
- Les hotspots ne doivent pas etre envoyes avant validation.
- Le README et `agent.md` doivent etre mis a jour quand le flux de jeu ou le backend change.
