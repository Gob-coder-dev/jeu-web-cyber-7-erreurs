# Cyber 7 erreurs

Jeu web de sensibilisation a la cybersecurite. Le joueur parcourt des scenarios professionnels, observe des images et doit retrouver les anomalies de securite visibles.

Le projet est construit avec React, TypeScript, Vite et Phaser.

## Principe du jeu

Le joueur se connecte avec un pseudo, choisit un scenario, puis repond a plusieurs questions liees par une courte histoire.

Chaque question affiche une image dans un canvas Phaser. Le joueur place des marqueurs sur les zones suspectes, puis valide sa selection.

Le score d'une question depend de trois elements :

- bonnes reponses trouvees ;
- temps mis pour repondre ;
- anomalies non trouvees.

Le score d'un scenario correspond a la somme des scores de ses questions. Le score global correspond a la somme des scenarios termines.

## Scenarios actuels

### L'intrusion chez Novatek

Clara publie trop d'informations sur LinkedIn. Un attaquant les utilise pour entrer dans les locaux et chercher le poste laisse ouvert par Julien.

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

  types/
    Question.ts
    Scenario.ts
    Score.ts
    User.ts
```

## Role des principales parties

### React

React gere les pages, la navigation, le choix du scenario, la progression du joueur et le score global.

`App.tsx` contient l'etat principal :

- utilisateur connecte ;
- page active ;
- scenario selectionne ;
- score du scenario ;
- score global ;
- scenarios termines.

### Phaser

Phaser gere uniquement la zone interactive de l'image :

- affichage de l'image ;
- clics du joueur ;
- creation et suppression des marqueurs ;
- validation des hotspots ;
- calcul du score de la question.

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

## Gestion des scenarios

Un scenario est defini par le type suivant :

```ts
export type Scenario = {
  id: string;
  title: string;
  description: string;
  questions: Question[];
};
```

Chaque fichier de scenario contient directement ses questions. Cela evite un gros fichier central et permet de garder ensemble :

- l'histoire ;
- les images ;
- les instructions ;
- les hotspots ;
- les explications.

La liste des scenarios disponibles est exportee depuis :

```txt
src/data/scenarios/index.ts
```

## Score et leaderboard

Le leaderboard utilise actuellement `localStorage` via `ScoreService`.

Etat actuel :

- le score global est sauvegarde quand tous les scenarios sont termines ;
- le classement affiche les scores sauvegardes ;
- les donnees restent locales au navigateur.

Evolution prevue :

- rendre les pseudos uniques ;
- sauvegarder la progression par pseudo ;
- afficher dans le leaderboard les joueurs meme s'ils n'ont pas termine tous les scenarios ;
- afficher sur chaque carte de scenario le score obtenu par le joueur.

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
- Les zones de bonnes réponses peuvent être affiché avec le raccourci Shift + D.
- Le timer pour afficher les images dans les scénarios peut être mis à 0 avec le raccourci Shift + T.