# Cyber 7 erreurs

Jeu web de sensibilisation a la cybersecurite. Le joueur parcourt des scenarios professionnels, observe des images et doit retrouver les anomalies de securite visibles.

Le projet est construit avec React, TypeScript, Vite et Phaser.

## Principe du jeu

Le joueur se connecte avec un pseudo. Si ce pseudo existe deja dans le stockage local, sa progression est rechargee. Sinon, un nouveau profil est cree.

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

Clara publie trop d'informations sur LinkedIn. Julien, nouveau comptable, est negligent avec son poste de travail. Un attaquant utilise ces erreurs pour preparer une intrusion physique.

Questions :

- Publication LinkedIn avec informations sensibles ;
- Poste de travail non securise ;
- Bureau laisse sans surveillance.

### La boite mail de Sophie

Sophie recoit plusieurs emails suspects dans la meme journee. Livraison, gain, promotion et offre personnalisee cherchent a la faire cliquer trop vite.

Questions :

- Email de phishing UPS ;
- Email de phishing Amazon ;
- Email de phishing Decathlon ;
- Email de phishing Sephora.

## Architecture

```txt
src/
  data/
    scenarios/
      index.ts
      physicalIntrusionScenario.ts
      phishingInboxScenario.ts

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
    Question.ts
    Scenario.ts
    Score.ts
    User.ts
```

## Role des principales parties

### React

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
- validation des hotspots ;
- calcul du score de la question ;
- affichage des explications apres validation ;
- affichage optionnel des zones de debug.

La scene Phaser principale est `CyberDifferenceScene`.

### Pont React / Phaser

`PhaserGame.tsx` sert de pont entre React et Phaser.

React affiche :

```tsx
<PhaserGame question={question} />
```

Puis appelle la methode exposee par `ref` quand le joueur clique sur Valider :

```ts
validateSelections()
```

Cette methode appelle ensuite la scene Phaser pour calculer le score de la question.

Le pont expose aussi :

```ts
toggleDebugHotspots()
```

pour afficher ou cacher les zones de bonnes reponses pendant le debug.

## Gestion des scenarios

Un scenario est defini par le type suivant :

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

La liste des scenarios disponibles est exportee depuis :

```txt
src/data/scenarios/index.ts
```

## Progression et leaderboard

La progression utilise `localStorage` via `UserService`.

Le type utilisateur courant est :

```ts
export type User = {
  id: string;
  pseudo: string;
  completedScenarioIds: string[];
  score: number;
  scenarioScores: { [scenarioId: string]: number };
  date: string;
};
```

Le pseudo sert de cle de reprise : si un joueur se reconnecte avec le meme pseudo sur le meme navigateur, sa progression est rechargee.

Le leaderboard affiche les utilisateurs sauvegardes, tries par score. Il met aussi en avant la position du joueur courant si elle n'est pas dans le top affiche.

Les donnees sont locales au navigateur. Il n'y a pas encore de backend.

## Raccourcis de debug

- `Shift + D` : affiche ou cache les zones de bonnes reponses.
- `Shift + T` : active ou desactive le timer avant affichage de l'image.

## Installation

Installer les dependances :

```bash
npm install
```

Lancer le serveur de developpement :

```bash
npm run dev
```

Construire le projet :

```bash
npm run build
```

Verifier le lint :

```bash
npm run lint
```

## Notes de developpement

- Les questions ne sont plus choisies aleatoirement.
- Les questions sont jouees dans l'ordre defini par leur scenario.
- Phaser ne connait pas les scenarios : il ne recoit qu'une question a la fois.
- Le resize du canvas Phaser ne doit pas recreer toute la scene pour ne pas perdre les marqueurs ou le timer.
- Les scores sont actuellement geres cote client avec `localStorage`.
- Le README et `agent.md` doivent etre mis a jour quand le flux de jeu change.
