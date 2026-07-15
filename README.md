# Cyber 7 erreurs

Jeu web de sensibilisation a la cybersecurite. Le joueur parcourt des dossiers professionnels, observe des pieces visuelles et doit retrouver les anomalies de securite visibles.

Le projet est separe en deux applications :

- `frontend/` : application React, TypeScript, Vite et Phaser.
- `backend/` : API Node.js, Express et TypeScript.

## Principe du jeu

Le joueur se connecte avec un pseudo. Le frontend appelle le backend pour recuperer ou creer cet utilisateur, charger les dossiers, demarrer une tentative de jeu, valider les selections et afficher le classement.

Depuis l'accueil, le joueur choisit un dossier. Chaque dossier contient plusieurs pieces liees par une histoire.

Avant chaque image, le jeu affiche un texte progressif de mise en situation. Quand l'image est visible, le joueur place des marqueurs sur les zones suspectes puis valide sa selection. Apres validation, Phaser affiche les bonnes zones et les bulles d'explication au survol.

Le backend calcule le score d'une piece a partir de trois elements :

- anomalies trouvees ;
- temps serveur ecoule depuis l'affichage de l'image ;
- anomalies non trouvees.

Le score d'un dossier correspond a la somme des scores de ses pieces. Le score global correspond a la somme des dossiers termines par le joueur.

Un dossier deja termine peut etre rejoue, mais son premier score conserve n'est pas remplace et le score global n'est pas modifie.

## Scenarios actuels

Les scenarios existent en francais et en anglais :

```txt
backend/data/game/scenarios/fr/
backend/data/game/scenarios/en/
```

Les images correspondantes sont servies depuis :

```txt
backend/public/images/fr/
backend/public/images/en/
```

Dossiers actuellement exportes :

1. `scenario1` - Intrusion dans les locaux
2. `scenario2` - La boite mail de Melanie
3. `scenario3` - La voix de la directrice fantome
4. `scenario4` - Le trajet qui avait des oreilles
5. `scenario5` - Le recrutement en urgence
6. `scenario6` - Le support informatique
7. `scenario7` - Le projet qui a fuite

Un fichier `tuto.ts` existe cote francais, mais il n'est pas exporte dans `fr/index.ts` actuellement.

## Architecture

```txt
frontend/
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

## Frontend

React gere les pages, la navigation, la langue, le choix du dossier, le replay, l'affichage des scores, le leaderboard et la page de resultat.

`frontend/src/pages/App.tsx` contient l'etat principal :

- utilisateur connecte ;
- page active ;
- dossier selectionne ;
- tentative de jeu en cours ;
- score du dossier termine ;
- scores par piece ;
- details du dossier termine pour la page de resultat ;
- donnees du leaderboard.

`frontend/src/services/apiClient.ts` est le point d'entree des appels HTTP vers le backend.

### Pages principales

- `LoginPage` : saisie du pseudo.
- `HomePage` : cartes de dossiers, score global, replay, langue et classement.
- `ScenarioIntroPage` : description du dossier avant lancement.
- `GamePage` : boucle de piece, texte progressif, affichage Phaser, loupe et validation.
- `ResultPage` : score final, detail par piece, bonnes pratiques et debrief `globalAttackScenario` / `attackScenario`.
- `LeaderBoardPage` : top 12 et position du joueur connecte si necessaire.

### Internationalisation

La langue est geree par :

```txt
frontend/src/i18n/
```

`LanguageProvider` stocke la langue active dans le localStorage. `useTranslation` donne les textes d'interface. Les donnees de jeu viennent du backend avec le parametre `lang`.

### Phaser

Phaser gere uniquement la zone interactive de l'image :

- affichage de l'image ;
- clics du joueur ;
- creation et suppression des marqueurs ;
- collecte des selections dans les coordonnees originales de l'image ;
- loupe optionnelle ;
- affichage de la correction apres validation serveur ;
- bulles d'explication au survol des hotspots corriges.

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
toggleDebugHotspots()
toggleMagnifier(isActive)
```

React decide quand valider. Phaser ne calcule pas le score et ne connait pas les dossiers complets.

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
/images
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

Les scores ne sont plus enregistres par une route frontend directe. Le score de dossier est enregistre par le backend quand une tentative non replay est terminee.

Routes leaderboard :

```txt
GET /api/leaderboard
GET /api/leaderboard/users/:userId
```

`GET /api/leaderboard` renvoie le top 12. `GET /api/leaderboard/users/:userId` renvoie le rang du joueur connecte, meme s'il n'est pas dans le top 12.

Routes de jeu :

```txt
GET  /api/game/scenarios?lang=fr
POST /api/game/attempts
POST /api/game/attempts/:attemptId/questions/:questionId/start
POST /api/game/attempts/:attemptId/questions/:questionId/answers
```

`GET /api/game/scenarios` renvoie les cartes publiques de l'accueil.

`POST /api/game/attempts` cree une tentative en memoire et renvoie la premiere question publique, sans hotspots ni correction.

`POST /api/game/attempts/:attemptId/questions/:questionId/start` demarre le timer serveur de la question. Si le timer a deja demarre, l'appel reussit mais ne le remet pas a zero.

`POST /api/game/attempts/:attemptId/questions/:questionId/answers` recoit les selections du joueur, valide les hotspots cote serveur, calcule le score de la piece, renvoie la correction, puis renvoie la piece suivante ou les details de fin de dossier.

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

`gameScenario.repository.ts` expose les scenarios selon la langue.

`gameAttempt.repository.ts` conserve provisoirement les tentatives en memoire.

`gameScoring.service.ts` contient les fonctions pures de scoring et de verification des hotspots.

## Donnees et securite du gameplay

Le frontend ne recoit pas les hotspots avant validation. Il recoit seulement :

- les cartes publiques pour l'accueil ;
- une `PublicQuestion` pendant le jeu ;
- les hotspots corriges apres validation ;
- `scenarioDetails` a la fin du dossier pour afficher le debrief.

Le backend reste responsable de :

- verifier les selections ;
- calculer le score ;
- avancer dans la tentative ;
- refuser l'ecrasement du premier score d'un dossier deja termine.

## Limites connues

- Les tentatives de jeu sont stockees en memoire dans `gameAttempt.repository.ts`. Elles sont perdues au redemarrage du backend.
- Le timer serveur demarre actuellement apres l'appel frontend d'affichage de l'image. Un utilisateur technique peut encore contourner une partie de cette logique en appelant directement l'API.
- Le stockage JSON peut avoir des problemes de concurrence si plusieurs ecritures arrivent exactement en meme temps.
- Les types TypeScript documentent la structure attendue, mais ne valident pas les JSON au runtime.
- La connexion par pseudo reste volontairement simple pour le prototype.
- `API_URL` est encore code en dur dans `apiClient.ts`.
- `scoreServices.ts` et `userServices.ts` existent encore comme services historiques frontend et pourront etre retires plus tard si tout passe definitivement par le backend.
- Le bundle frontend peut etre lourd a cause de Phaser.

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

- Les pieces sont jouees dans l'ordre defini par leur dossier.
- Phaser ne connait pas les dossiers : il ne recoit qu'une question publique a la fois.
- Le resize du canvas Phaser ne doit pas recreer toute la scene pour ne pas perdre les marqueurs.
- React appelle une API ; le backend decide et stocke.
- Le repository backend doit rester la seule couche responsable de la lecture/ecriture JSON.
- Les calculs de score doivent rester cote backend.
- Les hotspots ne doivent pas etre envoyes avant validation.
- Le README et `agent.md` doivent etre mis a jour quand le flux de jeu, la structure des donnees ou le backend change.
