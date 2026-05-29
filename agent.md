# Agent Notes

Ce fichier sert de guide pour les prochaines interventions sur le projet.

## Contexte du projet

Le projet est un jeu web de sensibilisation a la cybersecurite base sur React, TypeScript, Vite et Phaser.

Le joueur choisit un scenario, observe des images et place des marqueurs sur les anomalies de securite. Chaque scenario contient plusieurs questions liees par une histoire.

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
- la progression ;
- les scores globaux ;
- le leaderboard.

`App.tsx` est le centre de la navigation et de l'etat applicatif.

### Phaser

Phaser gere uniquement le gameplay dans l'image :

- affichage de l'image ;
- clics ;
- marqueurs ;
- validation ;
- score d'une question.

Ne pas mettre la logique de scenario dans `CyberDifferenceScene`. La scene doit rester centree sur une seule `Question`.

### Pont React / Phaser

`PhaserGame.tsx` cree le jeu Phaser et expose `validateSelections()` a React avec `forwardRef` et `useImperativeHandle`.

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

Ne pas recréer un gros fichier `questions.ts` global.

## Types principaux

```txt
src/types/Question.ts
src/types/Scenario.ts
src/types/Score.ts
src/types/User.ts
```

Le type `Scenario` contient directement ses questions.

## Regles importantes

- Ne pas coder tant que l'utilisateur demande seulement une explication ou un avis.
- Quand l'utilisateur demande une modification, garder les changements limites au besoin exprime.
- Conserver la separation React / Phaser.
- Eviter les refactorings non demandes.
- Ne pas supprimer les changements existants de l'utilisateur.
- Garder les fichiers de scenario lisibles, meme si cela duplique certaines structures.

## Points d'attention actuels

La prochaine evolution discutee concerne la progression par pseudo :

- pseudo unique ;
- reprise de progression avec le meme pseudo ;
- sauvegarde du score par scenario ;
- leaderboard affichant tous les pseudos, meme les joueurs qui n'ont pas termine tous les scenarios.

Cette evolution devrait probablement remplacer `ScoreService` par un service de progression joueur, par exemple `PlayerProgressService`.

Modele possible :

```ts
type PlayerProgress = {
  pseudo: string;
  globalScore: number;
  completedScenarioIds: string[];
  scenarioScores: Record<string, number>;
  updatedAt: string;
};
```

Ne pas implementer cette evolution sans validation explicite de l'utilisateur.
