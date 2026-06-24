# Cyber 7 erreurs

Jeu web de sensibilisation a la cybersecurite. Le joueur parcourt des scenarios professionnels, observe des images et doit retrouver les anomalies de securite visibles.

Le projet est maintenant separe en deux applications :

- `frontend/` : application React, TypeScript, Vite et Phaser.
- `backend/` : API Node.js, Express et TypeScript.

## Principe du jeu

Le joueur se connecte avec un pseudo. Pour l'instant, le frontend utilise encore la progression locale historique, mais un backend Express est en cours de mise en place pour stocker les joueurs et les scores cote serveur.

Depuis l'accueil, le joueur choisit un scenario. Chaque scenario contient plusieurs questions liees par une histoire.

Avant chaque image, le jeu affiche un court ecran de presentation avec un compte a rebours. Quand l'image est visible, le joueur place des marqueurs sur les zones suspectes puis valide sa selection.

Le score d'une question depend de trois elements :

- bonnes reponses trouvees ;
- temps mis pour repondre ;
- anomalies non trouvees.

Le score d'un scenario correspond a la somme des scores de ses questions. Le score global correspond a la somme des scenarios termines par le joueur.

Un scenario deja termine peut etre rejoue, mais son score conserve n'est pas remplace et le score global n'est pas modifie.

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
    game/
      PhaserGame.tsx
      scenes/
        CyberDifferenceScene.ts

    pages/
      App.tsx
      HomePage.tsx
      GamePage.tsx
      ResultPage.tsx
      LeaderBoardPage.tsx
      LoginPage.tsx

    services/
      scoreServices.ts
      userServices.ts

    types/
      GameSession.ts
      Question.ts
      Scenario.ts
      Score.ts
      User.ts

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
      users.controller.ts
      scores.controller.ts
      leaderboard.controller.ts
      game.controller.ts
    repositories/
      companyJson.repository.ts
      gameAttempt.repository.ts
      gameScenario.repository.ts
    routes/
      users.routes.ts
      scores.routes.ts
      leaderboard.routes.ts
      game.routes.ts
    services/
      users.service.ts
      scores.service.ts
      game.service.ts
    types/
      CompanyData.ts
      GameData.ts
```

## Frontend

React gere les pages, la navigation, le choix du scenario, la progression du joueur et le leaderboard.

`App.tsx` contient l'etat principal :

- utilisateur connecte ;
- page active ;
- scenario selectionne ;
- score du scenario en cours ;
- score global ;
- scenarios termines ;
- scores par scenario.

### Phaser

Phaser gere uniquement la zone interactive de l'image :

- affichage de l'image ;
- clics du joueur ;
- creation et suppression des marqueurs ;
- collecte des selections dans les coordonnees originales de l'image.

La scene Phaser principale est `CyberDifferenceScene`.

### Pont React / Phaser

`PhaserGame.tsx` sert de pont entre React et Phaser.

React affiche :

```tsx
<PhaserGame question={question} />
```

Le pont expose les selections placees par le joueur :

```ts
getSelections()
```

La validation et le calcul du score seront effectues par le backend.

## Backend

Le backend est une API Express en TypeScript situee dans `backend/`.

Il est en cours de construction. L'objectif est de remplacer progressivement le stockage `localStorage` du frontend par un stockage serveur base sur des fichiers JSON, avec a terme un fichier JSON par entreprise.

Pour simplifier le developpement actuel, le backend travaille sur une entreprise de demonstration stockee dans `backend/data/companies/demo.json`.

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

Routes scores :

```txt
GET   /api/scores/users/:userId/scenarios/:scenarioId
GET   /api/scores/users/:userId
PATCH /api/scores/users/:userId/scenarios/:scenarioId
```

`PATCH` sert a enregistrer le score d'un scenario pour un utilisateur.

Routes de jeu :

```txt
GET  /api/game/scenarios
POST /api/game/attempts
```

La creation d'une tentative renvoie uniquement la premiere question publique, sans hotspots ni correction.

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

`companyJson.repository.ts` lit et ecrit le fichier de l'entreprise de demonstration. Les tentatives de jeu sont provisoirement conservees en memoire.

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

## Gestion des scenarios

Un scenario frontend est defini par le type suivant :

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

La liste des scenarios prives est exportee depuis :

```txt
backend/data/game/scenarios/
```

## Progression et leaderboard

Le frontend historique utilise encore `localStorage` via `UserService`.

Le backend ajoute une nouvelle cible de stockage :

```txt
backend/data/companies/*.json
```

Le fichier `demo.json` sert d'exemple. Les vrais fichiers clients et scores ne doivent pas etre exposes publiquement ni commits s'ils contiennent des donnees reelles.

Etat actuel :

- le frontend charge les utilisateurs, le leaderboard et les cartes depuis le backend ;
- `POST /api/game/attempts` cree une tentative et renvoie la premiere question publique ;
- les hotspots restent uniquement dans le backend ;
- la validation serveur et le passage a la question suivante restent a implementer.

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

Le backend n'a pas encore de `tsconfig.json` ni de script de build dedie. Une verification TypeScript ponctuelle peut etre lancee avec :

```bash
cd backend
npx tsc src/index.ts --noEmit --module node16 --target es2023 --esModuleInterop --moduleResolution node16
```

## Notes de developpement

- Les questions ne sont plus choisies aleatoirement.
- Les questions sont jouees dans l'ordre defini par leur scenario.
- Phaser ne connait pas les scenarios : il ne recoit qu'une question a la fois.
- Le resize du canvas Phaser ne doit pas recreer toute la scene pour ne pas perdre les marqueurs ou le timer.
- Le backend doit rester separe du frontend : React appelle une API, le backend decide et stocke.
- Le repository backend doit devenir la seule couche responsable de la lecture/ecriture JSON.
- Les types TypeScript documentent la structure attendue, mais ne valident pas les JSON au runtime.
- Le README et `agent.md` doivent etre mis a jour quand le flux de jeu ou le backend change.
