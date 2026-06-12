# Agent Notes

Ce fichier sert de guide pour les prochaines interventions sur le projet.

## Contexte du projet

Le projet est un jeu web de sensibilisation a la cybersecurite base sur React, TypeScript, Vite et Phaser.

Le joueur se connecte avec un pseudo, choisit un scenario, observe des images et place des marqueurs sur les anomalies de securite. Chaque scenario contient plusieurs questions liees par une histoire.

La progression est sauvegardee par pseudo dans `localStorage`.

## Commandes utiles

```bash
npm run dev
npm run build
npm run lint
```

Toujours lancer au minimum `npm run build` et `npm run lint` apres une modification de code.

## Architecture a respecter

### React

React gere :

- les pages ;
- le login ;
- le choix du scenario ;
- la progression par pseudo ;
- les scores par scenario ;
- le score global ;
- le leaderboard.

`App.tsx` est le centre de la navigation et de l'etat applicatif.

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

`PhaserGame.tsx` cree le jeu Phaser et expose des methodes a React avec `forwardRef` et `useImperativeHandle`.

Methodes exposees actuellement :

```ts
validateSelections(): number
toggleDebugHotspots(): void
```

Ne pas recreer le jeu Phaser a chaque resize. Utiliser `phaserGameRef.current.scale.resize(...)` et `sceneRef.current?.resizeScene(...)`.

## Donnees

Les scenarios sont dans :

```txt
src/data/scenarios/
```

Chaque scenario doit etre dans son propre fichier.

Ajouter un nouveau scenario implique :

1. creer un fichier dans `src/data/scenarios/` ;
2. exporter un objet `Scenario` ;
3. l'ajouter dans `src/data/scenarios/index.ts`.

Ne pas recreer un gros fichier `questions.ts` global.

## Types principaux

```txt
src/types/Question.ts
src/types/Scenario.ts
src/types/Score.ts
src/types/User.ts
```

`Scenario` contient directement ses questions et peut contenir un `globalAttackScenario` affiche en fin de scenario.

`User` contient la progression sauvegardee :

```ts
type User = {
  id: string;
  pseudo: string;
  completedScenarioIds: string[];
  score: number;
  scenarioScores: { [scenarioId: string]: number };
  date: string;
};
```

## Services

`UserService` est le service principal pour la progression et le leaderboard actuels.

Il sauvegarde les utilisateurs dans `localStorage` avec la cle :

```txt
cyber-game-user
```

`ScoreService` existe encore, mais le flux actuel du leaderboard passe par `UserService`.

## Regles importantes

- Ne pas coder tant que l'utilisateur demande seulement une explication ou un avis.
- Quand l'utilisateur demande une modification, garder les changements limites au besoin exprime.
- Conserver la separation React / Phaser.
- Eviter les refactorings non demandes.
- Ne pas supprimer les changements existants de l'utilisateur.
- Garder les fichiers de scenario lisibles, meme si cela duplique certaines structures.
- Garder les `id` techniques sans accents.
- Les textes affiches peuvent utiliser des accents si l'encodage du fichier est sain.

## Raccourcis de debug

- `Shift + D` : affiche ou cache les zones de bonnes reponses.
- `Shift + T` : active ou desactive le timer avant affichage de l'image.

## Points d'attention actuels

Le projet a evolue vers une progression par pseudo, mais certains points techniques peuvent encore etre ameliores :

- `UserService.getScores()` retourne des donnees issues des utilisateurs et les caste en `Score[]`.
- Au login d'un utilisateur existant, verifier que tous les etats React necessaires sont bien recharges depuis `User`, notamment les scores par scenario.
- `ScoreService` peut devenir inutile si tout le leaderboard reste base sur `UserService`.
- Les fichiers de texte peuvent contenir des caracteres accentues mal encodes si l'editeur n'est pas en UTF-8.

Ne pas corriger ces points sans demande explicite de l'utilisateur.
