export const translations = {
  fr: {
    errorMessageUser: {
      userNotFound: "L'utilisateur n'a pas été trouvé",
      userId: "Un nom d'utilisateur est requis",
      password: "Un mot de passe est requis",
      userIdError: "Il y a une erreur avec le nom d'utilisateur",
      passwordError: "Il y a une erreur avec le mot de passe",
      userIdTooLong: "Le nom d'utilisateur doit faire au maximum 15 caractères",
      passwordTooLong: "Le mot de passe doit faire au maximum 15 caractères",
      passwordTooShort: "Le mot de passe doit faire au minimum 6 caractères",
      userCreationFailed: "L'utilisateur n'a pas pu être créé",
    },
    errorMessageScore: {
      userIdAndScenarioIdRequired: "Un nom d'utilisateur et un identifiant de scénario sont requis",
      userId: "Un nom d'utilisateur est requis",
      scoreNotFound: "Le score n'a pas été trouvé",
      userNotFound: "L'utilisateur n'a pas été trouvé",
    },
    errorMessageLeaderboard: {
      userNotFound: "L'utilisateur n'a pas été trouvé",
    },
    errorMessageGame: {
      noScenarioFound: "Aucun scénario a été trouvé",
      userIdAndScenarioIdRequired: "User ID and Scenario ID are required",
      scenarioNotFound: "Le scénario n'a pas été trouvé",
      userNotFound: "L'utilisateur n'a pas été trouvé",
      attemptNotFound: "Attempt not found",
      questionNotFound: "Question not found",
      questionMismatch: "Question does not match the current attempt question",
      tutorial: "Tutorial must be completed before starting this scenario",
      noQuestion: "Scenario does not contain any question",
      unableStratScenario: "Unable to start scenario",
      unableStartTimer: "Unable to start timer",
      unableSubmitAnswers: "Unable to submit answers",
      userIdAndAttemptIdRequired: "Attempt ID and question ID are required",
      array: "Selections must be an array",
      invalidSelection: "Each selection must contain finite numeric x and y values"
    },
  },
  en: {
    errorMessageUser: {
      userNotFound: "User not found",
      userId: "User ID is required",
      password: "Password is required",
      userIdError: "Error with User ID",
      passwordError: "Error with Password",
      userIdTooLong: "User ID must be at most 15 characters long",
      passwordTooLong: "Password must be at most 15 characters long",
      passwordTooShort: "Password must be at least 6 characters long",
      userCreationFailed: "User could not be created",
    },
    errorMessageScore: {
      userIdAndScenarioIdRequired: "User ID and Scenario ID are required",
      userId: "User ID is required",
      scoreNotFound: "Score not found",
      userNotFound: "User not found",
    },
    errorMessageLeaderboard: {
      userNotFound: "User not found",
    },
    errorMessageGame: {
      noScenarioFound: "No scenario found",
      userIdAndScenarioIdRequired: "User ID and Scenario ID are required",
      scenarioNotFound: "Le scénario n'a pas été trouvé",
      userNotFound: "L'utilisateur n'a pas été trouvé",
      attemptNotFound: "Attempt not found",
      questionNotFound: "Question not found",
      questionMismatch: "Question does not match the current attempt question",
      tutorial: "Tutorial must be completed before starting this scenario",
      noQuestion: "Scenario does not contain any question",
      unableStratScenario: "Unable to start scenario",
      unableStartTimer: "Unable to start timer",
      unableSubmitAnswers: "Unable to submit answers",
      userIdAndAttemptIdRequired: "Attempt ID and question ID are required",
      array: "Selections must be an array",
      invalidSelection: "Each selection must contain finite numeric x and y values"
    },
  },
} as const;

export type Translation = typeof translations.fr;
